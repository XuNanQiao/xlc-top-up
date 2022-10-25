// index.ts
// 获取应用实例
const app = getApp()
import { setting } from "../../setting";
import { WebClient } from "../../utils/WebClient";
import { CourseClient } from "../../utils/courseClient";
import { UserClient } from "../../utils/UserClient"
import { inviteCodeManager } from "../../utils/InviteCodeManager";

let userClient = new UserClient();
let courseClient = new CourseClient()
let webClient = new WebClient();
Page({
  data: {
    page: 0,
    userInfo: userClient.getInfo(),
    option: null as any,
    ifOnShow: false,
  },
  onLoad: async function (option) {
    this.setData({
      option: option
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
    }
  },
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  },
  /*** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
  },
  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/pages/index/index", null);
    return {
      title: "学习",
      path: path,
      imageUrl: '',
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
