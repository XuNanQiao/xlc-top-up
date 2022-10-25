const app = getApp()
import { CourseClient } from "../../../utils/courseClient";
import { ImgSizeLimit } from "../../../utils/stringHelper";
import { FreeLiveCourseTrackingClient } from "../../../utils/trackingClient";
let courseClient = new CourseClient()
import { FreeLiveCourseManager } from "../../../utils/courseManager";
let freeLiveCourseManager = new FreeLiveCourseManager();
import { UserClient } from "../../../utils/UserClient"
let userClient = new UserClient();
import { WebClient } from "../../../utils/WebClient";
let webClient = new WebClient();
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
Page({
  data: {
    live: null as FreeLiveCourseDto | any,
    userInfo: userClient.getInfo(),
    currentTab: 0,
    hasAppoint: false,
    is: new Date(),
    num: 0,
    tracker: null as any,
    hasthis: false,
    subFlag: false,
    usebg: true,
    suppressLogin: false,
    phoneno: "",
    code: "",
    code_s: "",
    code_msn: "",
    second: 0,
    needVerify: false,
    isPlay: false,
    modalName: "" as any,
    modalNameImg: "" as any,
    donorId: 0,//邀请
    donorType: null,//邀请
    sureToGiveVal: false,
    ifOnShow: false,
    ifLive: 0,
    option: null as any,
    CouponsModal: "",
  },
  async onLoad(option: any) {
    wx.showLoading({
      title: "加载中..."
    })
    //判断是否是赠送
    if (option.invitedByUserId) {
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id
      };
      wx.setStorageSync("inviter", invited);
    }
    this.setData({
      option: option
    })
    //判断是否购买该课程
    if (!this.data.userInfo) {
      this.setData({
        hasthis: false
      })
    } else {
      await courseClient.gethasItemAsync(
        6,
        Number(option.id),
        this.data.userInfo.id
      ).then(res => {
        this.setData({
          hasthis: res
        })
      });
    }
    let that = this;
    await freeLiveCourseManager.getDataAsync(option.id).then(live => {
      if (!live) {
        return
      }
      live.content = ImgSizeLimit(live.content);
      this.setData({
        live: live
      })

      if (live.liveConfig) {
        courseClient.getLiveType(live.liveConfig).then((res: any) => {
          if (res.data.msg == "success") {
            this.setData({
              ifLive: Number(res.data.data)
            })
          }
        });
      } else {
        if (new Date(live.updateTime) > new Date()) {
          this.setData({
            ifLive: 2
          })
        } else {
          if (live.isLive) {
            this.setData({
              ifLive: 1
            });
          } else {
            this.setData({
              ifLive: 5
            });
          }
        }
      }
    });
    if (option.invitedByUserId != undefined) {
      this.setData({
        donorId: option.invitedByUserId,
        donorType: option.invitedByType,
      })
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id,
      };
      wx.setStorageSync("inviter", invited);
    }
    if (that.data.live == null) {
      return;
    } let val;
    if (!that.data.userInfo) {
      val = false;
    } else {
      // 用户该课程是否已预约
      val = await courseClient.hasAppoint(that.data.live.id, that.data.userInfo.id);
    }
    that.setData({
      hasAppoint: val
    })
    wx.setNavigationBarTitle({ title: that.data.live.title });
    if (that.data.live.price == null) {
      that.data.live.price = 0;
    }
    if (this.data.userInfo == null) {
      if (that.data.live.suppressLogin) {
        this.data.suppressLogin = true;
        this.data.isPlay = false;
        this.data.modalName = "Modal";
      } else {
        this.data.suppressLogin = false;
      }
    } else {
      this.data.suppressLogin = true;
      this.data.isPlay = true;
    }
    wx.hideLoading()
  },

  async onShow() {
    this.setData({
      userInfo: userClient.getInfo(),
    })
  },



  onHide() {
    this.setData({
      ifOnShow: true
    })
  },

  onUnload() {
  },
  //预约点击事件
  async appiont() {
    if (this.data.subFlag) {
      return;
    }
    this.setData({
      subFlag: true
    })
    this.data.num++;
    if (this.data.num > 1) {
      return;
    }
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    if (this.data.live == null) {
      return;
    }
    if (
      await courseClient.tryAppointMsgAsync(this.data.live.id, this.data.userInfo.id)
    ) {
      wx.showToast({
        title: `预约成功`,
      });
      this.setData({
        subFlag: false,
        hasAppoint: true
      })
    }
  },
  orderClick(event: any) {
    let itemType = 6,
      itemId = event.currentTarget.dataset.id
    this.order(itemId, itemType)
  },
  async order(itemId: any, itemType: any, from?: string) {
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    this.setData({
      subFlag: true
    });
    if (itemType == 6) {
      await courseClient.tryAppointMsgAsync(itemId, this.data.userInfo.id);
    }
    let storageKey = `order${new Date().getTime().toString()}`;
    if (this.data.donorType == 12) {
      wx.setStorageSync(storageKey, [
        {
          itemId: itemId,
          itemType: itemType,
          donorType: 1,
          donorId: this.data.donorId,
          from: "extension",
        },
      ]);
    } else {
      wx.setStorageSync(storageKey, [
        { itemId: itemId, itemType: itemType, from: from },
      ]);
    }
    wx.navigateTo({
      url: `/order/pages/index/index?storageKey=${storageKey}`,
      complete: () => {
        this.setData({
          subFlag: false
        })
      },
    });
  },

  invite(type: any, kcid: any) {
    wx.navigateTo({
      url: `/components/invite/index?type=` + type + `&kcId=` + kcid,
    });
  },
  getUrl(liveConfig: string): string {
    let isComma = liveConfig.indexOf("?") > 0;
    let result = "";
    if (isComma) {
      result = liveConfig + "&embed=video";
    } else {
      result = liveConfig + "?embed=video";
    }
    if (this.data.userInfo != null) {
      result +=
        "&emial=" +
        this.data.userInfo.id +
        "@juxuewx.com&name=" +
        this.data.userInfo.nickName;
    }
    return result;
  },
  changeShowPannel(tabIndex: number) {
    this.setData({
      currentTab: tabIndex
    })
  },

  Code(e: any) {
    this.setData({ code: e, })
  },
  ValidCode(e: any) {
    this.setData({
      code_s: e.detail.value
    })
  },
  hideModalImg(e: any) {
    this.setData({
      modalNameImg: null
    })
  },
  hideModal(e: any) {
    this.setData({
      modalNameImg: null
    })
  },
  async getcode() {
    if (this.data.second > 0) {
      return;
    }
    if (!/^[1]([3-9])[0-9]{9}$/.test(this.data.phoneno)) {
      wx.showToast({
        title: "手机号格式不正确",
        icon: "none",
      });
      return;
    }
    if (this.data.code_s == "") {
      wx.showToast({
        title: "请输入图形验证码",
        icon: "none",
      });
      return;
    } else if (this.data.code_s != this.data.code) {
      wx.showToast({
        title: "图形验证码不正确",
        icon: "none",
      });
      return;
    }
    let result = await webClient.postFormAsync<ApiStateResult>({
      url: "/api/Sms/SendSmsCode",
      header: {
        "No-Code": true,
      },
      data: {
        tel: this.data.phoneno,
      },
    });
    if (result.data.isSuccess) {
      this.data.second = 60;
      this.timer();
    } else {
      this.data.second = 0;
      wx.showToast({
        title: result.data.errorMessage,
        duration: 2500,
        icon: "none",
      });
    }
  },
  setverify() {
    this.data.needVerify = true;
  },
  timer() {
    let tt = setInterval(() => {
      if (this.data.second > 0) {
        this.setData({
          second: this.data.second - 1
        })
      } else {
        clearInterval(tt);
      }
    }, 1000);
  },
  countdown(): string {
    if (this.data.second == 0) {
      return "获取验证码";
    } else {
      if (this.data.second < 10) {
        return "重新获取0" + this.data.second;
      } else {
        return "重新获取" + this.data.second;
      }
    }
  },

  check(): boolean {
    if (!/^[1]([3-9])[0-9]{9}$/.test(this.data.phoneno)) {
      wx.showToast({
        title: "手机号格式不正确",
        icon: "none",
      });
      return false;
    }
    if (this.data.code_s == "") {
      wx.showToast({
        title: "请输入图形验证码",
        icon: "none",
      });
      return false;
    }

    if (this.data.code_msn == "") {
      wx.showToast({
        title: "请输入短信验证码",
        icon: "none",
      });
      return false;
    }

    return true;
  },

  async bindLogin() {
    var User: PublicCoursePotentialUser | any = {};
    User.CourseId = this.data.live.id;
    User.Tel = this.data.phoneno;
    User.CourseTitle = this.data.live.title;
    User.CourseUrl = this.data.live.liveConfig;
    User.CourseType = this.data.live.courseType;
    if (this.check()) {
      let result = await webClient.postFormAsync<ApiStateResult>({
        url: "/api/Account/SavePotentialUser",
        data: {
          Tel: this.data.phoneno,
          CourseId: this.data.live.id,
          CourseTitle: this.data.live.title,
          CourseUrl: this.data.live.liveConfig,
          CourseType: this.data.live.courseType,
          phoneCode: this.data.code_msn,
        },
      });
      if (result.data.isSuccess) {
        wx.showToast({
          title: "已成功请观看视频！",
        });
        this.setData({
          suppressLogin: true,
          isPlay: true
        })
      } else {
        wx.showToast({
          title: result.data.errorMessage,
          duration: 2500,
          icon: "none",
        });
      }
    }
  },
  CouponsModalClick() {
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    this.setData({
      CouponsModal: "CouponsModal"
    })
    // this.$forceUpdate();
  },
  getCouponsModal(e: any) {
    this.setData({
      CouponsModal: e
    })
  },
  //页面跳转
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/freeLive/pages/playerPublic/playerPublic", this.data.option.id, 6);
    return {
      title: this.data.live.title,
      path: path,
      imageUrl: this.data.live.img,
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