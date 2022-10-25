// index.ts
// 获取应用实例
const app = getApp()
import { setting } from "../../setting";
import { WebClient } from "../../utils/WebClient";
import { OrderClient } from "../../utils/orderClient";
import { UserClient } from "../../utils/UserClient"
let orderClient = new OrderClient()
let userClient = new UserClient();
Page({
  data: {
    orderList: null as any,
    userInfo: userClient.getInfo(), ifOnShow: false,
    option: null as any
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
      await orderClient.getMyOrdersAsync(this.data.userInfo.id).then(res => {
        this.setData({
          orderList: res
        })

      });
    }
    wx.hideLoading()
  },
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  },  /**
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
  }
})
