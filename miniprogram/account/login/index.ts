// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { UserClient } from "../../utils/UserClient"
let userClient = new UserClient();
let webClient = new WebClient();
Page({
  data: {
    userInfo: {} as User,
    wxUserInfo: {} as WxUser,
    hasBind: true,
    bindPhone: false,
    phone: "",
    openId: "",
  },
  onLoad: async function (option) {
    //判断是否是赠送
    if (option.invitedByUserId != undefined) {
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id
      };
      wx.setStorageSync("inviter", invited);
    }
  },
  getPhoneNumber(e: any) {
    console.log(e.detail.encryptedData)
  },
  getWxInfo(e: any) {
    let that = this;
    this.setData({
      wxUserInfo: e.detail.userInfo
    });
    wx.showLoading({
      title: "加载中...",
    });
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.login({
                success: async function (loginRes: any) {
                  console.log(loginRes, "-=都是对的多");
                  let res: any = await userClient.ifBinding(
                    loginRes.code,
                    e.detail.userInfo
                  );
                  if (res == true) {
                    wx.hideLoading();
                    that.reloadUp();
                    wx.navigateBack({
                      delta: 1
                    });
                  } else {
                    wx.hideLoading();
                    that.setData({
                      hasBind: false,
                    })

                  }
                },
                fail: async function (loginRes: any) {
                  console.log("di");

                }
              });
            }, fail(res) {
              wx.hideLoading();

            }
          })
        } else {
          wx.login({
            success: async function (loginRes: any) {
              console.log(loginRes, "-=都是对的多");
              let res: any = await userClient.ifBinding(
                loginRes.code,
                e.detail.userInfo
              );
              if (res == true) {
                wx.hideLoading();
                that.reloadUp();
                wx.navigateBack({
                  delta: 1
                });
              } else {
                wx.hideLoading();
                that.setData({
                  hasBind: false,
                })

              }
            },
            fail: async function (loginRes: any) {
              console.log("di");

            }
          });
        }
      }
    })
    /* */
  },
  deny(e: any) {
    this.setData({
      hasBind: e.target.dataset.state
    })
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  permit(e: any) {
    this.setData({
      hasBind: e.target.dataset.state,
      bindPhone: e.target.dataset.permitstate
    })
  },
  denyBindPhone(e: any) {
    this.setData({
      bindPhone: e.target.dataset.bindphone
    })
  },
  permitBindPhone(e: any) {
    let that = this;
    if (this.data.phone == "") {
      wx.showToast({
        title: "请输入手机号",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (!/^[1]([3-9])[0-9]{9}$/.test(this.data.phone)) {
      wx.showToast({
        title: "手机号格式不正确",
        icon: "none"
      });
      return;
    }
    this.setData({
      bindPhone: false
    })
    let wxUserInfo = this.data.wxUserInfo
    if (wxUserInfo.gender == 1) {
      wxUserInfo.gender = "男"
    } else if (wxUserInfo.gender == 2) {
      wxUserInfo.gender = "女"
    }
    let invited = wx.getStorageSync("inviter");
    let user: any = {
      tel: this.data.phone,
      openId: wx.getStorageSync("openId"),
      nickName: wxUserInfo.nickName,
      headImgUrl: wxUserInfo.avatarUrl,
      sex: wxUserInfo.gender,
      province: "",
      city: wxUserInfo.city,
      InviterId: invited.invitedByUserId,
      InvitationScope: 1,
      UserSource: "专升本小程序"
    };
    wx.showLoading({
      title: "加载中..."
    });
    userClient.login(this.data.phone, user).then(
      (res: any) => {
        if (res.data.isSuccess) {
          wx.hideLoading();
          wx.showToast({
            title: "绑定手机号成功！",
            icon: "none"
          });
          setTimeout(() => {
            that.reloadUp();
            wx.navigateBack({
              delta: 1
            });
            // wx.switchTab({
            //   url: "/pages/index/index"
            // });
          }, 1000);
        } else {
          wx.hideLoading();
          wx.showToast({
            title: res.data.error,
            icon: "none"
          });
        }
      },
      err => {
        wx.hideLoading();
        wx.showToast({
          title: err,
          icon: "none"
        });
      }
    );
    // this.setData({
    //   bindPhone: e.target.dataset.bindPhone,
    // })
  },
  //数据绑定
  changePhone(e: any) {
    this.setData({
      phone: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
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
  reloadUp() {
    var pages: any = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    let OldOptions = null;
    if (prevPage.option) {
      OldOptions = prevPage.option;
    } else if (prevPage.option) {
      OldOptions = prevPage.option;
    } else {
      OldOptions = null

    }
    if (OldOptions) {
      currPage.onUnload();
    } else {
      currPage.onLoad();
    }

  }
})
