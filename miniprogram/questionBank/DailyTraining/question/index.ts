// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../../utils/WebClient";
import { UserClient } from "../../../utils/UserClient";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
import { ExamPackageClient } from "../../../utils/ExamPackageClient";
let examPackageClient = new ExamPackageClient();
let webClient = new WebClient();
let userClient = new UserClient();
Page({
  data: {
    id: "",
    qusetionList: [] as any,
    autoplay: false,
    indicatorDots: false,
    vertical: false,
    duration: 500,
    current: 0,
    interval: 100,
    userAnswer: [] as any,
    userInfo: userClient.getInfo(),
    userQuestions: [] as any,
    questions: {
      shiTiId: null,
      answerRecord: [] as any,
      order: 0
    },
    modalName: "",
    isFirstModal: false,
    onKcItem: wx.getStorageSync("onKcItem") as any,
    startTime: "" as any,
    endTime: "" as any,
    isSubmited: false,
    complete: 0,
    ifOnShow:false,
    option: null as any
  },
  onLoad: async function (option) {
    this.setData({
      option: option,
      onKcItem: wx.getStorageSync("onKcItem"),
      userInfo:userClient.getInfo()
    })
    if (!wx.getStorageSync("isFirst")) {
      wx.setStorageSync("isFirst", true)
      this.setData({
        isFirstModal: true
      })
    }

    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '每日一练',
    });
    this.getDailyTrainingQusetionList();

    this.data.startTime = new Date();
    this.setData({
      startTime: this.data.startTime
    })
  },
  /**
   * 获取考点试题
   */
  getDailyTrainingQusetionList() {
    wx.showLoading({
      title: "加载中..."
    });
    if (this.data.userInfo) {
      examPackageClient.getDailyTrainingQusetion(this.data.userInfo?.id, this.data.onKcItem.id).then((res) => {
        if (res) {
          for (let i in res.items) {
            res.items[i].userAnswer = []
          }
          this.setData({
            qusetionList: res.items,
            isSubmited: res.isSubmited
          })
          wx.hideLoading();
        }
      }, (err) => {
        wx.hideLoading();
        wx.showToast({
          title: "服务器异常，请稍后再试！",
          icon: "none",
        });
      })
    } else {
      wx.hideLoading();
      userClient.checkLogin();
      return
    }
  },
  //上一页
  prev: function () {
    if (this.data.current == 0) {
      return;
    }
    let count = this.data.current
    count = count > 0 ? count - 1 : this.data.qusetionList.length - 1
    this.setData({
      current: count
    })
  },
  //下一页
  next: function () {
    console.log(this.data.current,"----------this.data.current");
    
    if (this.data.current == (this.data.qusetionList.length - 1)) {
      return;
    }
    this.setData({
      current: this.data.current+1
    })
  },
  //当前页current改变时触发的change事件
  demo: function (e: any) {
    if (e.detail.source == 'autoplay') {
      this.setData({
        autoplay: false
      })
    }
    this.setData({
      current: e.detail.current//记录下当前的滑块位置
    })
  },
  //单选题
  checkRadioboxAnswer(e: any) {
    this.data.qusetionList[e.target.dataset.questionindex].userAnswer[0] = e.target.dataset.index;
    if (e.target.dataset.questionindex < this.data.qusetionList.length - 1) {
      this.next();
    }
    this.setData({
      qusetionList: this.data.qusetionList
    })
  },
  //多选题
  checkCheckedAnswer(e: any) {
    let items: any = this.data.qusetionList[e.target.dataset.questionindex];
    if (items.userAnswer.indexOf(e.target.dataset.index) != -1) {
      for (let i = 0, lenI = items.userAnswer.length; i < lenI; ++i) {
        if (items.userAnswer[i] == e.target.dataset.index) {
          items.userAnswer.splice(i, 1);
        }
      }
    } else {
      items.userAnswer.push(e.target.dataset.index);
    }
    this.setData({
      qusetionList: this.data.qusetionList
    })
  },
  //解答题
  bindTextAreaBlur: function (e) {
    this.data.qusetionList[e.target.dataset.questionindex].userAnswer[0] = e.detail.value;
    this.setData({
      qusetionList: this.data.qusetionList
    })
  },

  //提交答案
  async PostPointId() {
    let userAnswers: any = [];
    for (let i in this.data.qusetionList) {
      let userAnswer = this.data.qusetionList[i].userAnswer;
      let Answer = [] as any;
      for (let j in userAnswer) {
        await Answer.push(String.fromCharCode(userAnswer[j] + 65));
      }

      userAnswers.push({
        shiTiId: this.data.qusetionList[i].shiTiId,
        answerRecord: Answer,
        order: 0
      });
    }
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return
    }
    //每日一练提交数据
    this.data.endTime = new Date();
    let seconds = this.data.endTime.getTime() - this.data.startTime.getTime()
    let everyData: any = {
      uId: this.data.userInfo.id,
      zyId: 263,
      kcId: this.data.onKcItem.id,
      items: userAnswers,
      seconds: parseInt((seconds / 1000).toString())
    };
    let complete = 0;
    for (let i in everyData.items) {
      let item = everyData.items[i];
      if (item.answerRecord.length > 0) {
        complete++;
      }
    }
    this.data.complete = complete;
    console.log(this.data.qusetionList.length - this.data.complete, '-----------', this.data.qusetionList.length, '---------', this.data.complete);

    if (this.data.qusetionList.length - this.data.complete > 0) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "您还有未答的题目，确认提交吗？",
        success: function (res) {
          if (res.confirm) {
            that.submit(everyData)
            return
          } else {
            that.hideModal(null);
            return
          }
        }
      })
      return
    } else {
      this.submit(everyData)
    }

  },

  //提交
  async submit(PointIdData: any) {
    wx.showLoading({
      title: "加载中..."
    });
    if (this.data.userInfo != null && this.data.userInfo.id) {

      await webClient.sendAsync<any>({
        method: "POST",
        url: `/api/DailyPractice`,
        data: JSON.stringify(PointIdData)
      }).then((res) => {
        wx.hideLoading();
        if (res.data.isSuccess) {
          wx.navigateTo({
            url: `/questionBank/DailyTraining/question/Answerkey?pointId=${this.data.id}`
          })
        } else {
          wx.showToast({
            title: res.data.error,
            icon: "none",
          });
        }

      }, (err) => {
        wx.hideLoading();
        wx.showToast({
          title: "服务器异常，请稍后再试！",
          icon: "none",
        });
      });
    }
  },

  showModal(e) {
    let complete = 0;
    for (let i in this.data.qusetionList) {
      let item = this.data.qusetionList[i];
      if (item.userAnswer.length > 0) {
        complete++;
      }
    }
    this.data.complete = complete
    this.setData({
      modalName: "bottomModal",
      complete: this.data.complete
    })
  },
  hideModal(e) {
    let complete = 0;
    for (let i in this.data.qusetionList) {
      let item = this.data.qusetionList[i];
      if (item.userAnswer.length > 0) {
        complete++;
      }
    }
    this.data.complete = complete
    this.setData({
      modalName: "",
      complete: this.data.complete
    })
  },
  hideModalFirst(e) {
    this.setData({
      isFirstModal: false
    })
  },
  toCurrent(e: any) {
    this.data.current = e.target.dataset.index;
    this.setData({
      current: this.data.current,
      modalName: ""
    })
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

})
