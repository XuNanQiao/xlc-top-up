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
let md5 = require("../../../utils/md5.js");
import { inviteCodeManager } from "../../../utils/InviteCodeManager";

Page({
  data: {
    userInfo: userClient.getInfo(),
    live: null as FreeLiveCourseDto | any,
    client: new FreeLiveCourseManager(),
    tracker: null as any,
    focus: null as any,
    sharelistval: null,
    usebg: true,
    showimg: false,
    ifOnShow: false,
    navval: 0,
    startdata: 0,
    starthour: 0,
    startminute: 0,
    startsecond: 0,
    startyes: false,
    ifLiveShow: false,
    phoneno: "",
    code: "",
    code_s: "",
    code_msn: "",
    second: 0,
    ip: "",
    modalName: null as any,
    suppressLogin: false,
    hasthis: false,
    isPlay: false,
    setInter: null as any,
    equipmentIp: null,
    option: null as any,
  },
  async onLoad(option: any) {
    this.setData({
      option: option,
      userInfo: userClient.getInfo(),
    })
    //判断是否购买该课程
    if (this.data.userInfo == null) {
      this.setData({
        hasthis: false
      })
    } else {
      await courseClient.gethasItemAsync(
        6,
        option.id,
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
    //倒计时差计算
    let time = await app.countDown(this.data.live.updateTime);
    this.setData({
      startdata: time.days,
      starthour: time.hours,
      startminute: time.minutes,
      startsecond: time.seconds,
    })

    if (time.Dvalue > 0) {
      this.setData({
        startyes: true
      })
    } else {
      this.setData({
        startyes: false
      })
    }
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
    // this.sureToGive(option.id);
    if (that.data.live == null) {
      return;
    } let val;
    if (!that.data.userInfo) {
      val = false;
    } else {
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
        this.setData({
          suppressLogin: true,
          isPlay: false,
          modalName: "Modal",
        })
      } else {
        this.setData({
          suppressLogin: false
        })
      }
    } else {
      this.setData({
        suppressLogin: true,
        isPlay: true,
      })
    }
    that.data.tracker = new FreeLiveCourseTrackingClient(option.id);
    that.setData({
      tracker: that.data.tracker
    })
    that.trackerConfig();

  },



  async onShow() {
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
    this.setData({
      userInfo: userClient.getInfo(),
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    if (this.data.ifOnShow == true) {

      app.reloadCurrent(this.data.option);

    }
  },
  onHide() {
    if (this.data.tracker != null) {
      this.data.tracker.pagesConnect(true);
    }
    if (this.data.tracker != null) {
      this.data.tracker.disConnect();
    }
    this.setData({
      ifOnShow: true
    })
    clearInterval(this.data.setInter);
  },

  onUnload() {
    if (this.data.tracker != null) {
      this.data.tracker.pagesConnect(true);
    }
    if (this.data.tracker != null) {
      this.data.tracker.disConnect();
    }
    const timestamp = new Date().getTime().toString();
    let index = this.data.live.liveConfig.lastIndexOf("/");
    let id = this.data.live.liveConfig.substring(index + 1);
    let type = 0;
    if (this.data.live.isLive == false) {
      type = 2;
    } else if (this.data.live.isLive == true) {
      type = 1;
    }
    wx.hideLoading();
  },
  //播放记录
  trackerConfig() {
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
  },
  //直播显示排行榜
  liveInvitation() {
    this.setData({
      ifLiveShow: !this.data.ifLiveShow
    })
  },
  //跳转邀请卡
  invite(type: any, kcid: any) {
    wx.navigateTo({
      url: `/mine/invite/index?type=` + type + `&kcId=` + kcid,
    });
  },


  //视频链接拼接
  getUrl(liveConfig: string): string {
    let isComma = liveConfig.indexOf("?") > 0;
    let result = "";
    if (this.data.userInfo) {
      if (isComma) {
        result =
          liveConfig +
          "&embed=video&email=" +
          this.data.userInfo.id +
          "@xlcwx.com&name=" +
          this.data.userInfo.nickName;
      } else {
        result =
          liveConfig +
          "?embed=video&email=" +
          this.data.userInfo.id +
          "@xlcwx.com&name=" +
          this.data.userInfo.nickName;
      }
    }

    return result;
  },
  LiveGetUrl(liveConfig: string): string {
    let isComma = liveConfig.indexOf("?") > 0;
    let result = "";
    if (this.data.userInfo) {
      if (isComma) {
        result =
          liveConfig +
          "&email=" +
          this.data.userInfo.id +
          "@xlcwx.com&name=" +
          this.data.userInfo.nickName;
      } else {
        result =
          liveConfig +
          "?email=" +
          this.data.userInfo.id +
          "@xlcwx.com&name=" +
          this.data.userInfo.nickName;
      }
    }

    return result;
  },

  //关注点击事件
  async focusClick() {
    let that = this;
    await courseClient.getFreeVideocourseFocus(
      3,
      that.data.option.id
    ).then(res => {
      that.setData({
        focus: res
      })
    });
    if (!that.data.focus) {
      wx.showToast({
        title: "暂无二维码",
        duration: 2000,
        icon: "none",
      });
    } else {
      that.setData({
        showimg: true
      })
    }
  },
  //关注点击事件
  async focusClose() {
    let that = this;
    that.setData({
      showimg: false
    })
  },
  //点击切换选择项卡
  navchange(val: any) {
    this.setData({
      navval: val.currentTarget.dataset.val
    })
  },
  //倒计时结束
  endtime() {
    this.setData({
      startyes: false
    })
  },

  hideModal(e: any) {
    this.setData({
      modalName: null
    })
  },

  Code(e: any) {
    this.setData({
      code: e
    })
  },
  ValidCode(e: any) {
    this.setData({
      code_s: e.detail.value
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
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/freeLive/pages/studio/studio", this.data.option.id, 6);
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