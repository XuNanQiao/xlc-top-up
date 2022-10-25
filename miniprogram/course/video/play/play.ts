// index.ts
// 获取应用实例
const app = getApp()
import { CourseClient } from "../../../utils/courseClient";
import { UserClient } from "../../../utils/UserClient"
import { VipVideoCourseManager } from "../../../utils/courseManager";
import { ExamPackageClient } from "../../../utils/ExamPackageClient";
import { ImgSizeLimit } from "../../../utils/stringHelper";
import { AliPlayerClient } from "../../../utils/aliPlayerClient";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
let aliPlayerClient = new AliPlayerClient();
import { VideoCourseTrackingClient } from "../../../utils/trackingClient";
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
    url: "" as any,
    uhide: 0,
    videoDuration: 0,
    usebg: true,
    equipmentIp: null as any,
    from: "",
    trainingCampId: null as any,
    tracker: null as VideoCourseTrackingClient | null,
    periodCur: 0,
    mnContent: "",
    xfContent: "",
    ifOnShow: false,
    option: null as any,

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



    let videoId = Number(option.video);
    await courseManger.getDataAsync(videoId).then((res: any) => {
      if (res.content != null) {
        res.content = ImgSizeLimit(res.content);
      }
      if (this.data.userInfo) {
        if (!(courseClient.gethasItemAsync(this.data.userInfo.id, 1, videoId)) && res.price > 0) {
          wx.showModal({
            title: "无法播放",
            content: "您尚未购买此课程",
            showCancel: false,
            complete: () => {
              wx.navigateBack();
            },
          });
          return;
        }
      } else {
        wx.showModal({
          title: "无法播放",
          content: "暂未登录，请先登录",
          success: (res) => {
            if (res.confirm) {
              userClient.checkLogin();
              return;
            } else if (res.cancel) {
              wx.navigateBack();
            }
          },
        });
        return;
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
    let that = this;
    this.data.course.videoGroups.forEach((g) => {
      g.videos.forEach((c) => {
        if (c.id == Number(option.id)) {
          that.setData({
            url: c.videoConfig,
            videoDuration: c.videoDuration,
            uhide: g.id
          })

        }
      });
    });
    wx.setNavigationBarTitle({
      title: this.data.course.title,
    });



    this.data.tracker = new VideoCourseTrackingClient(videoId, Number(option.id));
    this.setData({
      tracker:this.data.tracker
    })
    this.trackerConfig();

  },
  onHide() {
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
    if (!this.data.userInfo) {
      this.setData({
        ifOnShow: true
      })
    }
  },
  onShow() {
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
    this.setData({
      userInfo: userClient.getInfo(),
    })
    if (this.data.ifOnShow == true) {
      app.reloadCurrent(this.data.option);
    } 
  },
  onUnload() {
    if (this.data.tracker != null) {
      this.data.tracker.pagesConnect(true);
    }
  },
  trackerConfig() {
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
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
    courseClient.dataDownload(id, 1, 2);
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
    let path = inviteCodeManager.CreatePath("/course/video/play/play", this.data.option.id, 1);
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
