import { UserClient } from "../../utils/UserClient"
import { CouponsClient } from "../../utils/couponsClient";
let coupons = new CouponsClient();
let userClient = new UserClient();
Component({
  options: { styleIsolation: 'apply-shared' },
  properties: {
    modalName: {
      type: String,
      value: ''
    },
    proType: {
      type: Number,
      value: 0
    },
    productId: {
      type: Number,
      value: 0
    },
    scopeName: {
      type: String,
      value: ''
    }
  },
  data: {
    couponsList: [] as any,
    userInfo: userClient.getInfo(),
  },
  lifetimes: {
    ready() {
      if (!this.data.userInfo) {
        userClient.checkLogin();
      }
      this.getMarketCouponsList();
    },
  },


  methods: {
    async getMarketCouponsList() {
      if (this.data.userInfo) {
        await coupons
          .getMarketCouponsProList(this.data.proType, this.data.productId, this.data.userInfo.id)
          .then((res) => {
            this.setData({
              couponsList: res
            })
          });
      }
    },
    async PutMarketCode(event: any) {
      let id = event.currentTarget.dataset.id
      wx.showLoading({
        title: "加载中...",
      });
      if (this.data.userInfo) {
        await coupons.PutMarketCode(this.data.userInfo.id, id).then((res) => {
          if (res.isSuccess == true) {
            wx.showToast({
              title: "已领取，快去使用吧~",
              icon: "none",
              duration: 2000,
            });
            this.getMarketCouponsList();
          } else {
            wx.showToast({
              title: "系统开小差了，再试一次吧~",
              icon: "none",
              duration: 2000,
            });
            wx.hideLoading();
          }
        });
      }
      wx.hideLoading();
    },
    Purchased() {
      wx.showToast({
        title: "您已领取优惠券，快去购买吧~",
        icon: "none",
        duration: 2000,
      });
    },
    hideModal() {
      this.triggerEvent("getCouponsModal", { val: "" });
    },
    //页面跳转
    goNext(event: any) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      });
    },
  }
})