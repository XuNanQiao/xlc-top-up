// index.ts
// 获取应用实例
const app = getApp()
import { UserClient } from "../../../utils/UserClient"
import { OrderClient } from "../../../utils/orderClient";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
import { olderType } from "../../../enum/older";

let orderClient = new OrderClient()
let userClient = new UserClient();
Page({
  data: {
    orderInfo: null as any,
    userInfo: userClient.getInfo(),ifOnShow:false,
    option: null as any
  },
  onLoad: async function (option: any) {
    this.setData({
      option: option
    })
    wx.showLoading({
      title: "加载中..."
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return
    }
    this.setData({
      olderTypeNum: olderType,
      option: option
    })
    await orderClient.getorderDetailAsync(this.data.userInfo.id, option.orderId).then(res => {
      this.setData({
        orderInfo: res
      })
    })
    wx.hideLoading()
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
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  },
  // 查看课程
  viewCourse() {
    //公开课
    if (this.data.orderInfo.orderItems[0].itemType == 6) {
      wx.navigateTo({
        url: `/freeLive/pages/playerPublic/playerPublic?id=${this.data.orderInfo.orderItems[0].itemId}`,
      });
    }
    // 直播
    else if (this.data.orderInfo.orderItems[0].itemType == 2) {
      wx.navigateTo({
        url: `/course/pages/introduction/introduction?id=${this.data.orderInfo.orderItems[0].itemId}`,
      });
    }
    // 点播
    else if (this.data.orderInfo.orderItems[0].itemType == 1) {
      wx.navigateTo({
        url: `/course/video/introduction/introduction?id=${this.data.orderInfo.orderItems[0].itemId}`,
      });
    } else {
      wx.showToast({
        title: "暂时无法查看哦~",
        icon: "none"
      })
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
