// index.ts
// 获取应用实例
const app = getApp()
import { CourseClient } from "../../../utils/courseClient";
import { UserClient } from "../../../utils/UserClient"
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
import { QuestionClient } from "../../../utils/QuestionClient";
import { LiveCourseTrackingClient } from "../../../utils/trackingClient";
import { ImgSizeLimit } from "../../../utils/stringHelper";
import { VipLiveCourseManager } from "../../../utils/courseManager";
import { AliPlayerClient } from "../../../utils/aliPlayerClient";

let aliPlayerClient = new AliPlayerClient();
let courseManger = new VipLiveCourseManager();
let questionClient = new QuestionClient()
let userClient = new UserClient();
let courseClient = new CourseClient()
Page({
  data: {
    page: 0,
    userInfo: userClient.getInfo(),
    course: null as LiveCourseDto | null,
    url: "",
    tracker: null as any,
    usebg: true,
    barTabCur: 0,
    liveId: 0,
    playbackId: 0,
    liveshow: {} as any,
    commentCount: 0 as any,
    essentialCommentCount: 0,
    defultPageIndex: 0,
    commentList: [] as any,
    questionTreeNodeList: [] as any,
    questionTree: [] as any,
    hasExpandList: "",
    essentialCommentList: [] as any,
    pageIndex: 0,
    question: "",
    videoDuration: 0,
    startTime: "" as any,
    equipmentIp: null as any,
    clickID: 0,
    focus: false,
    ellipsis: true,
    from: "",
    trainingCampId: null as any,
    options: null as any,
    ifOnShow: false,
    isLive: "",
    option: null as any,
    answer: {
      answerId: -1,
      hierarchy: 0,
    } as any,
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
    }
    this.setData({
      option: option,
      userInfo: userClient.getInfo(),
      isLive: option.isLive,
      liveId: Number(option.liveid),
      playbackId: Number(option.id),
      clickID: Number(option.id)
    })
    await questionClient.GetCourseQuestionCount(
      this.data.liveId,
      this.data.playbackId
    ).then(res => {
      this.setData({
        commentCount: res
      })
    });
    this.getCommentList();
    let playback = await courseClient.getPlaybackAsync(Number(option.liveid), Number(option.id));

    if (this.data.userInfo) {
      if (playback.trialVideoConfig == null) {
        if (!(await courseClient.gethasItemAsync(2, Number(option.liveid), this.data.userInfo.id))) {
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
      videoDuration: playback.duration,
      startTime: playback.startTime,
    })
    wx.setNavigationBarTitle({
      title: playback.title,
    });
    let now = new Date();
    let content = "";
    if (new Date(playback.startTime) > now) {
      content = "该直播尚未开始";
    }
    if (content != "") {
      wx.showModal({
        title: "无法播放",
        content: "该直播尚未开始",
        showCancel: false,
        complete: () => {
          wx.navigateBack();
        },
      });
    } else {
      if (playback.trialVideoConfig != null) {
        this.setData({
          url: playback.trialVideoConfig
        })
      } else {
        this.setData({
          url: playback.other
        })
      }
    }

    await courseManger.getDataAsync(Number(option.liveid)).then((res: any) => {
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

    this.data.course.playbacks.forEach((p) => {
      if (p.id == Number(option.id)) {
        if (p.trialVideoConfig != null) {
          that.setData({
            url: p.trialVideoConfig
          })
        } else {
          that.setData({
            url: p.other
          })
        }

        wx.setNavigationBarTitle({
          title: p.title,
        });
      }
    });



    this.setData({
      tracker: new LiveCourseTrackingClient(Number(option.liveid), Number(option.id))
    })
    this.trackerConfig();

  },

  returnDate(e: any) {
    if (e != null) {
      wx.showToast({
        icon: "none",
        title: "想在下面输入框填写您的疑问，我们会尽快回复的。",
      });
      this.setData({
        answer: e,
        focus: true
      })
    }
  },
  More() {
    this.data.pageIndex = +1;
    this.getCommentList();
  },
  textareaVar(e: any) {
    this.setData({
      question: e.detail.value
    })
  },
  async bindFormSubmit(e: any) {
    if (!this.data.userInfo) {
      return;
    }
    const question: CourseQuestion = {
      question: this.data.question,
      courseId: this.data.liveId,
      courseType: 1,
      itemId: this.data.playbackId,
      answerId: this.data.answer.answerId,
      hierarchy: this.data.answer.hierarchy,
      imgUrlList: [],
      uId: this.data.userInfo.id,
    };

    let result = await questionClient.submit(question);
    if (result.isSuccess) {
      this.setData({
        question: ''
      })
      wx.showToast({
        icon: "none",
        title: "老师已经收到你的疑问了，请耐心等待，我们会尽快回复的。",
      });
      this.setData({
        answer: {
          answerId: -1,
          hierarchy: 0,
        }
      })
    } else {
      wx.showToast({
        icon: "none",
        title: result.errorMessage,
      });
    }
  },
  clicked(event: any) {
    this.setData({
      clickID: event.currentTarget.dataset.id
    })
  },
  async getCommentList() {
    await questionClient
      .getCommentList(this.data.pageIndex, 10, this.data.liveId, 1, this.data.playbackId)
      .then((res) => {
        this.setData({
          commentList: this.data.commentList.concat(res.data)
        })
      });
    let data = questionClient.translate2TreeNode(this.data.commentList);
    this.setData({
      questionTreeNodeList: data
    })

    this.checkFirstAnswerChild();
    this.setData({
      questionTree: this.data.questionTreeNodeList
    })
  },

  checkFirstAnswerChild(quesId?: number) {
    if (
      this.data.questionTreeNodeList != null &&
      this.data.questionTreeNodeList.length > 0
    ) {
      if (quesId == null || quesId == undefined || quesId < 0) {
        this.data.questionTreeNodeList.map((ele: any) => {
          if (
            ele.type == 0 &&
            ele.hierarchy <= 0 &&
            ele.firstAnswerChildCount > 0
          ) {
            if (ele.showChildState == 0) {
              ele.showChildState = 3;
            }
          }
        });
      } else {
        this.data.questionTreeNodeList.map((ele: any) => {
          if (
            ele.type == 0 &&
            ele.hierarchy <= 0 &&
            ele.firstAnswerChildCount > 0
          ) {
            let contain1 = this.data.hasExpandList.indexOf(ele.id);
            if (contain1 > -1) {
              ele.showChildState = 2;
            } else {
              ele.showChildState = 3;
            }
          }
        });
      }
    }
  },

  onShow() {
    this.setData({
      userInfo: userClient.getInfo(),
    })
    if (this.data.ifOnShow == true) {
      app.reloadCurrent(this.data.options);
    }
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
  },

  trackerConfig() {
    if (this.data.tracker != null) {
      this.data.tracker.connect();
    }
  },

  onHide() {
    if (!this.data.userInfo) {
      this.setData({
        ifOnShow: true
      })
    }
    if (this.data.tracker != null) {
      this.data.tracker.pagesConnect(true);
    }
  },

  onUnload() {
    if (this.data.tracker != null) {
      this.data.tracker.pagesConnect(true);
    }

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

  barSelect(event: any) {
    this.setData({
      barTabCur: event.currentTarget.dataset.index
    })
    if (event.currentTarget.dataset.index == 1) {
      this.setData({
        commentList: []
      })
      this.getCommentList();
    }
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
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/course/pages/play/play", this.data.playbackId, 2);
    let title: any, imageUrl: any
    if (!this.data.course) {
      title = "赢在专升本"
    } else {
      title = this.data.course.title;
      imageUrl = this.data.course.img
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
})
