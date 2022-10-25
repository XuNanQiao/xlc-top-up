// index.ts
// 获取应用实例
const app = getApp()
import { setting } from "../../setting";
import { UserClient } from "../../utils/UserClient"
import { OrderClient } from "../../utils/orderClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { olderType } from "../../enum/older";

let orderClient = new OrderClient()
let userClient = new UserClient();
Page({
  data: {
    orderInfo: null as any,
    userInfo: userClient.getInfo(),
    olderTypeNum: null as any,
    option: null as any, ifOnShow: false,
  },
  onLoad: async function (option: any) {
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
  //立即支付 
  payment() {
    wx.navigateTo({
      url: "/order/pages/paysucess/paysucess?orderId=" + this.data.orderInfo.orderId
    });
  },
  //重新下单
  payAgain() {
    let storageKey = `order${new Date().getTime().toString()}`;
    wx.setStorageSync(storageKey, [
      { itemId: Number(this.data.orderInfo.orderItems[0].itemId), itemType: Number(this.data.orderInfo.orderItems[0].itemType) }
    ]);
    wx.navigateTo({
      url: `/order/pages/index/index?storageKey=${storageKey}`,
    });
  },
  // 查看课程
  viewCourse() {
    // 点播
    if (this.data.orderInfo.orderItems[0].itemType == 1) {
      wx.navigateTo({
        url: `/course/video/introduction/introduction?id=${this.data.orderInfo.orderItems[0].itemId}`,
      });
    }
    // 直播
    else if (this.data.orderInfo.orderItems[0].itemType == 2) {
      wx.navigateTo({
        url: `/course/pages/introduction/introduction?id=${this.data.orderInfo.orderItems[0].itemId}`,
      });
    }
    // 试卷包
    else if (this.data.orderInfo.orderItems[0].itemType == 3) {
      wx.navigateTo({
        url: `/examPaper/details?id=${this.data.orderInfo.orderItems[0].itemId}`,
      });
    }
    //公开课
    else if (this.data.orderInfo.orderItems[0].itemType == 6) {
      wx.navigateTo({
        url: `/freeLive/pages/playerPublic/playerPublic?id=${this.data.orderInfo.orderItems[0].itemId}`,
      });
    }
    //活动
    /*  else if (this.data.orderInfo.orderItems[0].itemType == 15) {
       wx.navigateTo({
         url: `/active/pages/detail/detail?url=${this.data.orderInfo.orderItems[0].itemId}`,
       });
     } */
    //拼团
/*     else if (this.data.orderInfo.orderItems[0].itemType == 17) {
      wx.navigateToMiniProgram({
        appId: setting.navigateToAppID,
        path: '/market/groupBooking/index?id=' + this.data.orderInfo.orderItems[0].itemId,

        success(res) {
          // 打开成功
          console.log("scuseee");
        }
      })
    }
    //助力
    else if (this.data.orderInfo.orderItems[0].itemType == 18) {
      wx.navigateToMiniProgram({
        appId: setting.navigateToAppID,
        path: '/market/helpingHand/index?recordId=' + this.data.orderInfo.orderItems[0].itemId,
        success(res) {
          console.log("打开成功");
        }
      })
    } */
    else {
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
