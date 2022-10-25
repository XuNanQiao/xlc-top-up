// index.ts
// 获取应用实例
const app = getApp()
import { UserClient } from "../../utils/UserClient"
import { ImgClient } from "../../utils/imgClient"
import { MineClient } from "../../utils/mineClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";

let mineClient = new MineClient();
let imgClient = new ImgClient();
let userClient = new UserClient();
Page({
  data: {
    userInfo: userClient.getInfo(),
    ifShowInvitation: false,
    ifShowBottom: false,
    InvitImg: '', ifOnShow: false,
    option: null as any
  },
  async onLoad(option) {
    this.setData({
      option: option
    })
    wx.showLoading({
      title: "加载中..."
    })
    //判断是否是赠送
    if (option.invitedByUserId) {
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id
      };
      wx.setStorageSync("inviter", invited);
    }

    if (!this.data.userInfo) {
      userClient.checkLogin();
      mineClient.GetUnlimited().then(res => {
        this.setData({
          InvitImg: res.data
        })

      })
      wx.hideLoading()

      return
    }
    mineClient.GetUnlimited(this.data.userInfo.id).then(res => {
      this.setData({
        InvitImg: res.data
      })

    })
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: userClient.getInfo()
    })
    // ifOnShow:false,
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
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  //邀请显示
  myInvitation() {
    this.setData({
      ifShowInvitation: true
    })
  },
  // 、、弹窗关闭
  hideModal() {
    this.setData({
      ifShowInvitation: false,
      ifShowBottom: false
    })
  },
  // 显示保存图片弹窗
  longInvitation() {
    this.setData({
      ifShowInvitation: false,
      ifShowBottom: true
    })
  },
  //发送给朋友
  previewMediaImg() {
    if (this.data.InvitImg != '') {
      imgClient.previewImg(this.data.InvitImg)
    } else {
      wx.showToast({
        title: "获取邀请码失败，请稍后再试",
        icon: "none"
      })
    }
  },
  // 保存图片
  saveImg() {
    if (this.data.InvitImg != '') {
      imgClient.saveImg(this.data.InvitImg)
    } else {
      wx.showToast({
        title: "获取邀请码失败，请稍后再试",
        icon: "none"
      })
    }
  },

  /*** 用户点击右上角分享*/
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
})
