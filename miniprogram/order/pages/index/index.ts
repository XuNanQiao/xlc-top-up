// index.ts
// 获取应用实例
const app = getApp()
import { UserClient } from "../../../utils/UserClient"
import { OrderClient } from "../../../utils/orderClient";
import { CouponsClient } from "../../../utils/couponsClient";
let coupons = new CouponsClient();
let orderClient = new OrderClient();
let userClient = new UserClient();
import { olderType } from "../../../enum/older";

Page({
  data: {
    userInfo: userClient.getInfo(),
    olderTypeNum: null as any,
    order: {
      fullPrice: 0,
      totalPrice: 0,
      isNeedInvoice: false,
      invoiceType: 0,
      invoiceName: "",
      taxCode: "",
      invoiceTel: "",
      province: "",
      city: "",
      address: "",
      orderItems: null as any,
      IsAllowPresent: true,
    },
    ifOnShow: false,
    getItem: "",
    modalName: null,
    sumPrice: 0,
    sumPriceDiscount: "",
    subFlag: false,
    option: null as any,
    CouponsModal: "",
    coupons: null,
    Couponslist: 0,
    MarketCodeName: "",
    couponsList: [] as any,
    pitchOn: null as number | null,
  },
  onLoad: async function (option: any) {
    if (!this.data.userInfo) {
      userClient.checkLogin();
    }
    this.setData({
      olderTypeNum: olderType,
      option: option
    })
    let that = this;
    let itemOptions: {
      itemId: number;
      itemType: number;
    }[] = wx.getStorageSync(option.storageKey);
    that.setData({
      getItem: wx.getStorageSync(option.storageKey)
    })
    if (!this.data.userInfo) {
      return;
    }
    await orderClient.getOrderItems(
      itemOptions,
      this.data.userInfo.id
    ).then(res => {
      let orderItems = 'order.orderItems'
      that.setData({
        [orderItems]: res
      })
    });
    if (that.data.order.orderItems == null || that.data.order.orderItems.length < 1) {
      wx.showModal({
        title: "未发现要下单的项目",
        showCancel: false,
        success: (res) => {
          //删除失效的预订单
          wx.removeStorageSync(option.storageKey);
          wx.navigateBack();
        },
      });
    }
    that.data.order.orderItems.forEach((item: any, i: any) => {
      that.setData({
        sumPrice: that.data.sumPrice + item.itemPrice
      })

    });
    this.getMarketCouponsList()
  },
  async getMarketCouponsList() {
    if (!this.data.userInfo) {
      return
    }
    await coupons
      .getMarketUserList(this.data.order.orderItems[0].itemType, this.data.order.orderItems[0].itemId, this.data.userInfo.id, 1)
      .then(res => {
        this.setData({
          couponsList: res
        })
        if (this.data.couponsList.length > 0) {
          this.setData({
            pitchOn: this.data.couponsList[0].marketingCoupons.id
          })
        }
      });
  },
  clickPitchOn(event: any) {
    let data = this.data.couponsList[event.currentTarget.dataset.index]

    if (data.marketingCoupons.limitFullPrice > this.data.sumPrice) {
      wx.showToast({
        title: "不满足满减条件，请选择其他优惠券",
        icon: "none"
      })
      this.setData({
        pitchOn: null,
        sumPrice: 0
      })
      this.data.order.orderItems.forEach((item: any, i: any) => {
        this.setData({
          sumPrice: this.data.sumPrice + item.itemPrice
        })
      });

    } else {
      this.setData({
        pitchOn: event.currentTarget.dataset.id,
        sumPrice: Number((this.data.sumPrice - data.marketingCoupons.preferentialAmount).toFixed(2))
      })
    }
  },
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
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
