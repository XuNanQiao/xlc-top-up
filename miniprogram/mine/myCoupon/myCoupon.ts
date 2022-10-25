// index.ts
// 获取应用实例
const app = getApp()
import { UserClient } from "../../utils/UserClient"
import { MineClient } from "../../utils/mineClient";
let mineClient = new MineClient();

let userClient = new UserClient();
Page({
  data: {
    page: 0,
    userInfo: userClient.getInfo(),
    tabChoose: 1,
    haveVal: false,
    code: "",
    code_s: "",
    redeemcode: null as any,
    couponsList1: [] as any,
    couponsList2: [] as any,
    couponsList3: [] as any, ifOnShow: false,
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
    }
    this.GetCouponsList();
    wx.hideLoading()
  },

  //页面跳转
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  },
  //获取优惠券列表
  async GetCouponsList() {
    if (this.data.userInfo) {
      await mineClient
        .GetMarketCouponsMinelist(this.data.userInfo.id, 1)
        .then(res => {
          this.setData({
            couponsList1: res,
          })
        });
      await mineClient
        .GetMarketCouponsMinelist(this.data.userInfo.id, 2)
        .then(res => {
          this.setData({
            couponsList2: res,
          })
        });
      await mineClient
        .GetMarketCouponsMinelist(this.data.userInfo.id, 3)
        .then(res => {
          this.setData({
            couponsList3: res,
          })
        });
    }
  },

  // 获取验证码
  Code(e: any) {
    this.setData({
      code: e.detail
    })
  },
  //输入框赋值
  Redeemcode(e: any) {
    this.setData({
      redeemcode: e.detail.value
    })

  },
  // 输入框验证码赋值
  ValidCode(e: any) {
    this.setData({
      code_s: e.detail.value
    })
  },
  // 兑换
  async submit(e: any) {
    if (this.data.redeemcode == null) {
      wx.showToast({
        title: "请输入兑换码",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (this.data.code_s != this.data.code) {
      wx.showToast({
        title: "验证码有误，请重新输入验证码",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (this.data.userInfo) {
      await mineClient
        .PostMarketCode(this.data.userInfo.id, this.data.redeemcode)
        .then(res => {
          if (res.isSuccess) {
            wx.showToast({
              title: "兑换成功！",
              icon: "none",
              duration: 2000
            });
            setTimeout(() => {
              switch (res.data.itemType) {
                case 2:
                  wx.redirectTo({
                    url: `/course/pages/introduction/introduction?id=${res.data.itemId}`
                  });
                  break;
                case 1:
                  wx.redirectTo({
                    url: `/course/video/introduction/introduction?id=${res.data.itemId}`
                  });
                  break;
                case 3:
                  wx.redirectTo({
                    url: `/test/pages/simulation/details?id=${res.data.itemId}`
                  });
                  break;
                case 4:
                  if (this.data.userInfo) {
                    /*    courseClient.download(
                         res.data.itemPrice,
                         res.data.itemId,
                         this.data.userInfo.id
                       ); */
                  }
                  break;
                case 6:
                  wx.redirectTo({
                    url: `/freeLive/pages/playerPublic/playerPublic?id=${res.data.itemId}`
                  });
                  break;
                default:
                  break;
              }
            }, 2000);
          } else {
            wx.showToast({
              title: res.error,
              icon: "none",
              duration: 2000
            });
          }
        });
    }
  },
  /*   onShow() {
      this.data.userInfo = tokenManager.getInfo();
      if (!this.data.userInfo) {
        tokenManager.navigatorToLoginPage();
        return;
      }
    }, */
  // tab切换
  clickBtn(event: any) {
    this.setData({
      tabChoose: event.currentTarget.dataset.val
    })
  },
  PutMarketCode() {
    wx.showToast({
      title: "您已领取优惠券，快去购买吧~",
      icon: "none",
      duration: 2000
    });
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
  }
})
