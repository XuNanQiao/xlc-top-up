// index.ts
// 获取应用实例
const app = getApp()
import { CourseClient } from "../../../utils/courseClient"
import { ImgSizeLimit } from "../../../utils/stringHelper";
import { UserClient } from "../../../utils/UserClient"
import { ExamPackageClient } from "../../../utils/ExamPackageClient";
import { AliPlayerClient } from "../../../utils/aliPlayerClient";
import { VipLiveCourseManager } from "../../../utils/courseManager";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
let courseManger = new VipLiveCourseManager();
let aliPlayerClient = new AliPlayerClient();
let userClient = new UserClient()
let courseClient = new CourseClient()
let examClient = new ExamPackageClient()
Page({
  data: {
    userInfo: userClient.getInfo(),
    nav: ["课程概述", "课程列表"],
    course: null as LiveCourseDto | any,
    TabCur: 1,
    scrollLeft: 0,
    usebg: true,
    clickID: 0,
    isSegment: false,
    hasthis: false,
    from: "",
    trainingCampId: null as any,
    ifOnShow: false,
    option: null as any,
    isLive: "",
    CouponsModal: "",
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  getHomeWork(event: any) {
    if (!this.data.hasthis && this.data.course && this.data.course.price > 0) {
      wx.showToast({
        title: "尚未购买，请先去购买",
        icon: "none",
      });
      return;
    }
    let examId = event.currentTarget.dataset.id
    examClient.getHomeWorkObj(examId).then((res) => {
      if (res.data) {
        wx.navigateTo({
          url:
            "/examPackage/pages/exam/CourseHomework/indexnew?examId=" +
            examId +
            "&courseType=1",
        });
        return;
      } else {
        wx.showToast({
          title: "暂无课堂练习",
          icon: "none",
          image: "",
          duration: 1500,
          mask: false,
        });
        return;
      }
    });
  },

  onHide() {
    if (!this.data.userInfo) {
      this.setData({
        ifOnShow: true
      })
    }
  },
  onShow() {
    if (this.data.ifOnShow == true) {
      this.setData({
        userInfo: userClient.getInfo(),
      })

      app.reloadCurrent(this.data.option);

    }

    if (!this.data.userInfo) {
      userClient.checkLogin();
      return
    }
  },
  clicked(event: any) {
    this.setData({
      clickID: event.currentTarget.dataset.id

    })
  },
  async onLoad(option: any) {
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
      userInfo: userClient.getInfo(),
      option: option,
      isLive: option.isLive,
      from: option.from,
      trainingCampId: option.trainingCampId,
      clickID: option.id
    })

    let liveId = option.id;
    await courseManger.getDataAsync(liveId).then((res: any) => {
      if (res.playbacks.length > 0) {
        let now = new Date();
        for (let item of res.playbacks) {
          if (now < new Date(item.startTime)) {
            item.liveState = "直播尚未开始";
          } else if (
            now > new Date(item.startTime) &&
            now < new Date(item.endTime)
          ) {
            item.liveState = "正在直播";
          } else {
            if (item.other == null) {
              item.liveState = "回放生成中";
            } else {
              item.liveState = "观看重播";
            }
          }
        }
      }
      if (res.content != null) {
        res.content = ImgSizeLimit(res.content);
      }
      this.setData({
        course: res
      })
    });
    if (!this.data.userInfo) {
      this.data.hasthis = false;
    } else {
      await courseClient.gethasItemAsync(2, option.id, this.data.userInfo.id).then(res => {
        this.setData({
          hasthis: res
        })
      });
    }
    if (this.data.course == null) {
      wx.showModal({
        title: `发生错误`,
        content: `找不到此课程`,
        showCancel: false,
        success: (res) => {
          wx.navigateBack();
        },
      });
      return;
    }
    wx.setNavigationBarTitle({
      title: this.data.course.title,
    });



    if (option.invitedByUserId != undefined) {
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id,
      };
      wx.setStorageSync("inviter", invited);
    }
  },
  //tab选择
  tabSelect(event: any) {
    this.setData({
      TabCur: event.currentTarget.dataset.index
    })
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
  goto(line: any) {
    wx.navigateTo({
      url: line,
    });
  },
  //观看回放
  async CheackIsSegment(event: any) {
    let itemId = await event.currentTarget.dataset.itemid
    let courseId = await event.currentTarget.dataset.courseid
    await aliPlayerClient.cheackIsSegment(itemId, "liveCourses").then((res: any) => {
      if (res.isSuccess == true) {
        wx.navigateTo({
          url: `/course/pages/playerCorldraw/playerCorldraw?id=${itemId}&liveid=${courseId}&from=${this.data.from}&trainingCampId=${this.data.trainingCampId}`
        })

      } else {
        wx.navigateTo({
          url: `/course/pages/play/play?id=${itemId}&liveid=${courseId}&from=${this.data.from}&trainingCampId=${this.data.trainingCampId}`
        })
      }
    });
  },

  async CheackIsAudition(event: any) {
    let itemId = await event.currentTarget.dataset.itemid
    let courseId = await event.currentTarget.dataset.courseid
    wx.navigateTo({
      url: `/course/pages/play/play?id=${itemId}&liveid=${courseId}&from=${this.data.from}&trainingCampId=${this.data.trainingCampId}`
    })
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
  CouponsModalClick() {
    this.setData({
      userInfo:userClient.getInfo()
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    this.setData({
      CouponsModal: "CouponsModal"
    })

  },
  getCouponsModal(e: any) {
    this.setData({
      CouponsModal: e.detail.val
    })
  },
  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/course/pages/introduction/introduction", this.data.option.id, 2);
    return {
      title: this.data.course.title,
      path: path,
      imageUrl: this.data.course.img,
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
  goNext(line: string) {
    wx.navigateTo({
      url: line
    })
  }
})
