// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { UserClient } from "../../utils/UserClient";
import { ExamPackageClient } from "../../utils/ExamPackageClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager"
let webClient = new WebClient();
let userClient = new UserClient();
let examPackageClient = new ExamPackageClient();

Page({
  data: {
    roomId: "",
    userInfo: userClient.getInfo(),
    room: {} as any,
    ifOnShow: false,
    option: null as any
  },
  onLoad: async function (option) {
    this.setData({
      option: option
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    if (option.roomId) {
      this.data.roomId = option.roomId
    }
    this.setData({
      roomId: this.data.roomId
    })
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    this.getExamroomDesc();
  },
  async getExamroomDesc() {
    wx.showLoading({
      title: '加载中...'
    })
    if (this.data.userInfo) {
      await examPackageClient.getExamroomDesc(parseInt(this.data.roomId), this.data.userInfo.id).then((res) => {
        wx.hideLoading();
        if (res.isAllowed) {
          this.data.room = res.room;
          this.setData({
            room: this.data.room
          })
        } else {
          wx.showToast({
            title: res.reason,
            icon: "none"
          });
        }
      }, (err) => {
        wx.hideLoading();

        wx.showToast({
          title: "服务器异常请稍后再试！",
          icon: "none"
        });
      })
    } else {
      userClient.checkLogin();
      return
    }
  },
  async linkTo(e) {
    wx.showLoading({
      title: '加载中...'
    })
    if (this.data.userInfo) {
      let res = await webClient.sendAsync<any>({ url: `/api/ExamApp/mineControl/resources/examRoom/${this.data.roomId}/exam?uId=${this.data.userInfo.id}` });
      let data = {} as any;
      for (let i in res.data) {
        if (res.data[i].examId == e.currentTarget.dataset.examid) {
          data = res.data[i]
        }
      }
      if (data.resultId) {
        wx.hideLoading();
        wx.showToast({
          title: "您已参加过考试！",
          icon: "none"
        });
      } else {
        wx.hideLoading();
        wx.navigateTo({
          url: `/questionBank/MockTest/question/index?roomId=${this.data.roomId}&roomExamId=${e.currentTarget.dataset.id}&examId=${e.currentTarget.dataset.examid}`
        })
      }
    } else {
      wx.hideLoading();
      userClient.checkLogin();
      return;
    }
    wx.hideLoading();

  },
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    let path = inviteCodeManager.CreatePath("/pages/learning/index", null);

    return {
      title: "学习",
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
