import { WebClient } from "./WebClient";
import { setting } from "../setting";

export class ImgClient extends WebClient {

  constructor() {
    super(setting.apiEndPoint)
  }

  //图片下载
  downloadImg(url: string) {
    wx.downloadFile({
      url: url, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: "保存成功"
              })

            },
            fail() {
              wx.showToast({
                title: "图片保存失败，请稍后重试",
                icon: "none"
              })

            }
          })

        }
      },
      fail() {
        wx.showToast({
          title: "图片保存失败，请稍后重试",
          icon: "none"
        })

      }
    })
  }
  saveImg(imgUrl: any) {
    let _self = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting["scope.writePhotosAlbum"]) {
          wx.authorize({
            scope: "scope.writePhotosAlbum",
            success() {
              //这里是用户同意授权后的回调
              _self.saveImgToLocal(imgUrl);
            },
            fail() {
            },
          });
        } else {
          //用户已经授权过了
          _self.saveImgToLocal(imgUrl);
        }
      },
    });
  }
  saveImgToLocal(imgUrl: any) {
    let that = this;
    var aa = wx.getFileSystemManager();
    aa.writeFile({
      filePath: wx.env.USER_DATA_PATH + "/test.png",
      data: imgUrl.slice(22),
      encoding: "base64",
      success: (res) => {
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + "/test.png",
          success: function (res) {
            wx.showToast({
              title: "保存成功",
            });
          },
          fail: function (err) {
            console.log(err);
          },
        });
      },
      fail: (err) => {
        console.log("writeFile" + err);
      },
    });
  }

  //图片预览
  previewImg(url: string) {
    wx.previewImage({
      urls: [url]
    })
  }

}