// index.ts
// 获取应用实例
const app = getApp()
import { CourseClient } from "../../utils/courseClient";
import { UserClient } from "../../utils/UserClient"
import { inviteCodeManager } from "../../utils/InviteCodeManager";
let userClient = new UserClient();
let courseClient = new CourseClient()
Page({
  data: {
    userInfo: userClient.getInfo(),
    sevenDayList: [] as CourseLearnRecordDto[],
    beforeList: [] as CourseLearnRecordDto[],
    ifOnShow: false,
    option: null as any,
  },
  onLoad: async function (option) {
    this.setData({
      option: option
    })
    wx.showLoading({
      title: "加载中..."
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
    } else {
      await courseClient.courseLearnRecords(this.data.userInfo.id, 3, 7).then(res => {
        this.setData({
          sevenDayList: res
        })

      })
      await courseClient.courseLearnRecords(this.data.userInfo.id, 3).then(res => {
        this.setData({
          beforeList: res
        })

      })
      if (this.data.sevenDayList.length > 0) {
        this.diffren()
      }
    }
    wx.hideLoading()
  },
  //获取更早的记录
  async diffren() {
    let arr1 = this.data.sevenDayList,
      arr2 = this.data.beforeList
    let arr3 = arr2.filter(v => {
      var str = JSON.stringify(v);
      return arr1.every(v => JSON.stringify(v) != str);
    });
    this.setData({
      beforeList: arr3
    })
  },

  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/pages/index/index", null);
    return {
      title: "赢在专升本",
      path: path,
      success: function (res) {
        console.log("转发成功");
        //群转发
        wx.showShareMenu({
          // 要求小程序返回分享目标信息              
          withShareTicket: true
        });
        if (res.shareTickets) {
          // 获取转发详细信息
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success(res) {
              res.errMsg;// 错误信息
              res.encryptedData;// 解密后为一个 JSON 结构（openGId  群对当前小程序的唯一 ID）
              res.iv;// 加密算法的初始向量
            },
            fail() { },
            complete() { }
          });
        }
      },
      fail: function (res) {
        // wx.showModal({ title: "转发失败", content: "转法时发生了错误" });
        console.log("转发失败");
      }
    }
  },
  goNext(event: any) {
    let type = event.currentTarget.dataset.type
    let id = event.currentTarget.dataset.id
    console.log(type, id, "-------------id");
    // 点播
    if (type == 1) {
      wx.navigateTo({
        url: `/course/video/introduction/introduction?id=${id}`,
      });
    }
    // 直播
    else if (type == 0) {
      wx.navigateTo({
        url: `/course/pages/introduction/introduction?id=${id}`,
      });
    }
    //公开课
    else if (type == 2 || type == 3) {
      wx.navigateTo({
        url: `/freeLive/pages/playerPublic/playerPublic?id=${id}`,
      });
    }
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    // ifOnShow:false,
    this.setData({
      userInfo: userClient.getInfo(),
    })
    if (this.data.ifOnShow == true) {
      app.reloadCurrent(this.data.option);
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (!this.data.userInfo) {
      this.setData({
        ifOnShow: true
      })
    }
  },
})
