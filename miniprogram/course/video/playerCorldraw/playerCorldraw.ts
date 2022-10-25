// index.ts
// 获取应用实例
const app = getApp()
import { UserClient } from "../../../utils/UserClient"
import { Video } from "../../../utils/Video";
import { CourseClient } from "../../../utils/courseClient";
let courseClient = new CourseClient()
import { VipVideoCourseManager } from "../../../utils/courseManager";
let courseManger = new VipVideoCourseManager();
import { ImgSizeLimit } from "../../../utils/stringHelper";
import { AliPlayerClient } from "../../../utils/aliPlayerClient";
let aliPlayerClient = new AliPlayerClient();
let video = new Video();
let userClient = new UserClient();
import { WebClient } from "../../../utils/WebClient";
let webClient = new WebClient();
import { QuestionClient } from "../../../utils/QuestionClient";
import { VideoCourseTrackingClient } from "../../../utils/trackingClient";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";

Page({
  data: {
    userInfo: userClient.getInfo(),
    title: "Hello",
    barTabCur: 0,
    course: null as any,
    pageIndex: 0,
    pageSize: 999,
    questionClient: new QuestionClient(),
    commentList: [],
    videoId: 0,
    playback: null as VideoCourseDto | null,
    playAuth: "",
    videoSegmentList: [] as any,
    player: {},
    vId: "",
    liveInde: 0,
    height: "calc(100vh - 44px - var(--status-bar-height) - 600rpx)",
    videoStartTime: 0,
    vHallcontextTime: 0,
    currentResourse: "",
    videoContext: "" as any,
    showMain: false,
    ispaly: true,
    showPlayRate: false,
    vHallcontext: "" as any,
    isscreenChange: true,
    playRateList: [0.5, 0.8, 1, 1.25, 1.5, 2] as Array<number>,
    currentTime: "0",
    duration: "0",
    playRateVal: 1,
    ifonShow: false,
    tracker: null as any,
    playbackId: 0,
    chapters: {} as any,
    from: "",
    option: null as any

  },
  onReady() {
    this.setData({
      videoContext: wx.createVideoContext("videoPlayer")
    })

  },
  onShow() {
    if (this.data.ifonShow) {
      // app.reloadCurrent(this.data.option);

    }
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
    // this.trackerConfig();
  },
  onUnload() {
    if (this.data.tracker != null) {
      this.data.tracker.pagesConnect(true);
    }
    if (!this.data.userInfo) { return }
    let time;
    this.data.ifonShow = true;
    time = this.data.vHallcontextTime;
    video.postViewingHistory(
      this.data.userInfo.id,
      this.data.videoId,
      this.data.playbackId,
      time
    );
  },
  onHide() {
    if (this.data.tracker != null) {
      this.data.tracker.pagesConnect(true);
    }
    if (!this.data.userInfo) { return }
    let time;
    this.data.ifonShow = true;
    time = this.data.vHallcontextTime;
    video.postViewingHistory(
      this.data.userInfo.id,
      this.data.videoId,
      this.data.playbackId,
      time
    );
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
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return
    }
    this.setData({
      userInfo: userClient.getInfo(),
      vHallcontext: wx.createVideoContext("videoPlayer", this),
      videoId: Number(option.video),
      playbackId: Number(option.id),
      from: option.from,
      option: option
    })
    let videoId = Number(option.video);

    await courseManger.getDataAsync(videoId).then((res: any) => {
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
    await courseClient.getVideocourseAsync(Number(option.video), true).then(playback => {
      this.setData({
        playback: playback,
        currentResourse: playback.trialVideoConfig
        // currentResourse: playback.aliVideoUrl

      })
      wx.setNavigationBarTitle({
        title: playback.title,
      });
    });
    let that = this;
    this.data.course.videoGroups.forEach((g) => {
      g.videos.forEach((c) => {
        if (c.id == option.id) {
          that.setData({
            url: c.videoConfig,
            uhide: g.id,
          })
        }
      });
    });
    if (option.id) {
      this.tracker = new VideoCourseTrackingClient(videoId, parseInt(option.id));
      this.trackerConfig();
    }


    wx.setNavigationBarTitle({
      title: this.data.course.title,
    });

    if (this.data.course.content != null) {
      this.data.course.content = ImgSizeLimit(this.data.course.content);
    }

    await this.getVideoSegment(this.data.playbackId);
    this.getVideoCourseVideo(option.id);
    video
      .getViewingHdistory(this.data.userInfo.id, this.data.videoId, this.data.playbackId)
      .then((res) => {
        if (res.tracks) {
          this.setData({
            videoStartTime: res.tracks
          })
        }
      });
  },
  trackerConfig() {
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
  },
  //播放进度变化时触发
  playTimeUpdate(e) {
    let that = this
    this.setData({
      vHallcontextTime: e.detail.currentTime
    })
    let currentTime = e.detail.currentTime;
    for (let i = 0; i < that.data.videoSegmentList.length; i++) {
      if (i == 0) {
        if (currentTime < that.data.videoSegmentList[1].progressMarkersObj.offset) {
          that.setData({
            liveInde: i
          })
          break
        }
      } else if (i < that.data.videoSegmentList.length - 1) {
        if (
          currentTime > that.data.videoSegmentList[i].progressMarkersObj.offset &&
          currentTime < that.data.videoSegmentList[i + 1].progressMarkersObj.offset
        ) {
          that.setData({
            liveInde: i
          })
          break
        }
      } else {
        if (currentTime > that.data.videoSegmentList[i].progressMarkersObj.offset) {
          that.setData({
            liveInde: i
          })
          break
        }
      }
    }
    let startH: any, endH: any, startM: any, endM: any;
    let start: any = parseInt(e.detail.currentTime);
    let end: any = parseInt(e.detail.duration);
    if ((start / 60) < 10) {
      startH = "0" + parseInt(String(start / 60));
    } else {
      startH = parseInt(String(start / 60));
    }
    if (start % 60 < 10) {
      startM = "0" + parseInt(String(start % 60));
    } else {
      startM = parseInt(String(start % 60));
    }
    if ((end / 60) < 10) {
      endH = "0" + parseInt(String(end / 60));
    } else {
      endH = parseInt(String(end / 60));
    }

    if (end % 60 < 10) {
      endM = "0" + parseInt(String(end % 60));
    } else {
      endM = parseInt(String(end % 60));
    }
    /* 播放进度变化时触发, 直播时不会调用此函数 */
    this.setData({
      currentTime: startH + ":" + startM,
      duration: endH + ":" + endM
    })
  },
  //显示播放控件
  mainShow() {
    if (this.data.showPlayRate != true) {
      this.setData({
        showMain: !this.data.showMain
      })
    } else {
      this.setData({
        showPlayRate: false
      })
    }
  },
  //暂停
  bindPause: function () {
    this.setData({
      ispaly: false
    })
    this.data.vHallcontext.pause();
  },
  //播放
  bindPlay: function () {
    this.data.vHallcontext.play();
    this.setData({
      ispaly: true
    })
  },
  //显示倍速播放
  changePlayRate() {
    this.setData({
      showPlayRate: true,
      showMain: false,
    })
  },
  //倍速播放
  selectPlayRate(event: any) {
    this.data.vHallcontext.playbackRate(event.currentTarget.dataset.type);
    this.setData({
      showPlayRate: false,
      showMain: false,
      playRateVal: event.currentTarget.dataset.type
    })
  },
  //退出全屏
  bindExitFullScreen: function () {
    this.data.vHallcontext.exitFullScreen();
    this.setData({
      isscreenChange: true
    })
  },
  //全屏
  bindRequestFullScreen: function () {
    this.data.vHallcontext.requestFullScreen();
    this.setData({
      isscreenChange: false
    })
  },
  barSelect(event: any) {
    this.setData({
      barTabCur: event.currentTarget.dataset.index
    })

  },
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  },
  //获取视频列表
  async getVideoSegment(itemId: any) {
    let that = this
    await aliPlayerClient
      .getVideoSegmentList(
        this.data.pageIndex,
        this.data.pageSize,
        itemId,
        "videoCourses"
      )
      .then((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          let progressMarkers = JSON.parse(`${res.data[i].progressMarkers}`);
          res.data[i]["progressMarkersObj"] = progressMarkers;
          if (res.data[i].progressMarkersObj.offset < 60) {
            res.data[i].progressMarkersObj[
              "offsetTime"
            ] = `0'${res.data[i].progressMarkersObj.offset}`;
          } else {
            res.data[i].progressMarkersObj["offsetTime"] = `${Math.floor(
              res.data[i].progressMarkersObj.offset / 60
            )}'${res.data[i].progressMarkersObj.offset % 60}`;
          }
        }

        that.setData({
          videoSegmentList: that.data.videoSegmentList.concat(res.data),
        })
        that.setData({
          vId: that.data.videoSegmentList[0].vId
        })
        that.getVideoPlayAuth(
          that.data.videoSegmentList[0].vId,
        );
      });
  },
  //获取播放凭证
  async getVideoPlayAuth(id: any) {
    let that = this;
    await aliPlayerClient.getVideoPlayAuth(id).then(async (res: any) => {
      if (res.isSuccess == false) {
        wx.showToast({
          title: "视频不存在",
          icon: "none",
        });
      } else {
        this.setData({
          playAuth: res.error
        })
      }
    });
  },
  //点击切换打点视频
  click(event: any) {
    let time = event.currentTarget.dataset.time,
      index = event.currentTarget.dataset.index
    this.setData({
      liveInde: index
    })
    this.data.videoContext.seek(time);

  },
  //获取小节数据
  getVideoCourseVideo(id) {
    webClient
      .sendAsync({
        url: `/api/Course/videoCourseVideo/${id}`,
      })
      .then((res) => {
        this.setData({
          chapters: res.data
        })
      });
  },

  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/pages/index/index", this.data.playbackId, 1);
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
})
