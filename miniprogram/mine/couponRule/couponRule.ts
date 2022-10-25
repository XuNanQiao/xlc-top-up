// index.ts
// 获取应用实例
const app = getApp()
import { UserClient } from "../../utils/UserClient"
import { MineClient } from "../../utils/mineClient";

import { CourseClient } from "../../utils/courseClient";
let courseClient = new CourseClient();
let mineClient = new MineClient();
let userClient = new UserClient();
Page({
  data: {
    userInfo: userClient.getInfo(),
    id: 0,
    coupons: null as any,
    subFlag: false,
    hasthis: false,
    ifOnShow: false,
    options: null as any,
  },
  onLoad: async function (option) {
    if (!this.data.userInfo) {
      userClient.checkLogin();
    }
    wx.showLoading({
      title: "加载中..."
    })
    this.setData({
      options: option,
      id: Number(option.id),
    })
    if (this.data.userInfo) {
      mineClient.getMarketData(this.data.id, this.data.userInfo.id).then((res) => {
        this.setData({
          coupons: res
        })
      });
    }
    wx.hideLoading()
  },
  PutMarketCodeToAll() {
    wx.showToast({
      title: "您已成功领取优惠券，快去购买课程吧~",
      icon: "none",
      duration: 2000,
    });
  },
  async PutMarketCode() {
    if (this.data.userInfo) {
      await courseClient.gethasItemAsync(
        this.data.coupons.marketingCoupons.productType,
        this.data.coupons.marketingCoupons.productId,
        this.data.userInfo.id
      ).then(res => {
        this.setData({
          hasthis: res
        })
      });
    }
    if (this.data.hasthis) {
      wx.showToast({
        title: "您已拥有该课程~",
        icon: "none",
        duration: 2000,
      });
      return;
    } else {
      this.order();
    }
  },
  async order() {
    if (this.data.subFlag) {
      return;
    }
    this.setData({
      subFlag: true
    })
    let storageKey = `order${new Date().getTime().toString()}`;
    wx.setStorageSync(storageKey, [
      {
        itemId: Number(this.data.coupons.marketingCoupons.productId),
        itemType: this.data.coupons.marketingCoupons.productType,
      },
    ]);
    wx.navigateTo({
      url: `/learn/order/index?storageKey=${storageKey}`,
    });
  },
  onHide() {
    this.setData({
      ifOnShow: true
    })
  },
  onShow() {
    if (this.data.ifOnShow == true) {

      // app.reloadCurrent(this.data.options);

    }
    this.setData({
      userInfo: userClient.getInfo(),
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
  },
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  },
})
