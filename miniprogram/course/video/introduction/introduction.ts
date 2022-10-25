// index.ts
// 获取应用实例
const app = getApp()
import { CourseClient } from "../../../utils/courseClient";
import { UserClient } from "../../../utils/UserClient"
import { VipVideoCourseManager } from "../../../utils/courseManager";
import { ExamPackageClient } from "../../../utils/ExamPackageClient";
import { ImgSizeLimit } from "../../../utils/stringHelper";
import { AliPlayerClient } from "../../../utils/aliPlayerClient";
let aliPlayerClient = new AliPlayerClient();
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
let courseManger = new VipVideoCourseManager();
let courseClient = new CourseClient()
let examClient = new ExamPackageClient()
let userClient = new UserClient();
Page({
  data: {
    page: 0,
    userInfo: userClient.getInfo(),
    periods: [] as CoursePeriod[],
    course: null as VideoCourseDto | null,
    nav: ["课程概述", "课程列表"],
    from: "",
    trainingCampId: null as any,
    TabCur: 1,
    scrollLeft: 0,
    periodCur: 0,
    mnContent: "",
    xfContent: "",
    uhide: 0,
    usebg: true,
    hasthis: false,
    ifOnShow: false,
    options: null as any,
    CouponsModal: "",
    option: null as any

  },
  onLoad: async function (option) {
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
      from: option.from,
      trainingCampId: option.trainingCampId,
    })
    if (!this.data.userInfo) {
      this.setData({
        hasthis: false,
      })
    } else {
      await courseClient.gethasItemAsync(1, Number(option.id), this.data.userInfo.id
      ).then(res => {
        this.setData({
          hasthis: res
        })
      });
    }
    let liveId = Number(option.id);
    await courseClient.getClassPeriodAsync(liveId).then(res => {
      this.setData({
        periods: res
      })
    });
    await courseManger.getDataAsync(liveId).then((res: any) => {
      if (res.content != null) {
        res.content = ImgSizeLimit(res.content);
      }
      this.setData({
        course: res
      })
    });
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
    //判断是否是赠送
    if (option.invitedByUserId) {
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id
      };
      wx.setStorageSync("inviter", invited);
    }
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
      app.reloadCurrent(this.data.options);
    }
    this.setData({
      userInfo: userClient.getInfo(),
    })
  },

  //tab选择
  tabSelect(event: any) {
    this.setData({
      TabCur: event.currentTarget.dataset.index
    })
  },
  periodsSelect(index: number) {
    this.setData({
      periodCur: index
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

  openChapter(event: any) {
    let id = event.currentTarget.dataset.id
    this.setData({
      uhide: this.data.uhide == id ? 0 : id

    })

    // this.uhide = this.uhide == id ? 0 : id;
  },

  async play(event: any) {
    if (this.data.course && this.data.course.price > 0 && this.data.hasthis == false) {
      wx.showToast({
        title: "尚未购买，请先去购买",
        icon: "none",
      });
      return;
    }
    let id = await event.currentTarget.dataset.id
    await aliPlayerClient.cheackIsSegment(id, "videoCourses").then((res: any) => {
      if (res.isSuccess == true) {
        if (this.data.course != null) {
          wx.navigateTo({
            url: `/course/video/playerCorldraw/playerCorldraw?id=${id}&video=${this.data.course.id}&from=${this.data.from}&trainingCampId=${this.data.trainingCampId}`
          })

        }
      } else {
        if (this.data.course != null) {
          wx.navigateTo({
            url: `/course/video/play/play?id=${id}&video=${this.data.course.id}&from=${this.data.from}&trainingCampId=${this.data.trainingCampId}`
          })

        }
      }
    });
  },
  //随堂联系
  async getHomeWork(event: any) {
    let examId = await event.currentTarget.dataset.examid
    if (!this.data.hasthis && this.data.course && this.data.course.price > 0) {
      wx.showToast({
        title: "尚未购买，请先去购买",
        icon: "none",
      });
      return;
    }

    examClient.getVideoHomwork(examId).then((res) => {
      if (res.data) {
        wx.navigateTo({
          url:
            "/examPackage/pages/exam/CourseHomework/indexnew?examId=" +
            examId +
            "&courseType=2",
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
  // 随堂资料下载
  async download(event: any) {
    let id = await event.currentTarget.dataset.id
    if (this.data.hasthis && this.data.course && this.data.course.price > 0) {
      courseClient.dataDownload(id, 1, 2);
    } else {
      wx.showToast({
        title: "尚未购买，无法下载随堂资料",
        icon: "none",
      });
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

  },
  getCouponsModal(e: any) {
    this.setData({
      CouponsModal: e
    })

  },
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  },
  /*** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
  },
  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/course/video/introduction/introduction", this.data.option.id, 1);
    let title: string,
      imageUrl: string
    if (this.data.course) {
      title = this.data.course.title;
      imageUrl = this.data.course.img;
    } else {
      title = "赢在专升本";
      imageUrl = ""
    }
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
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
