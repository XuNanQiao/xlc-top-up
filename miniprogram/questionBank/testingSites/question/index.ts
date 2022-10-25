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
    userInfo: userClient.getInfo(),
    userQuestions: [] as any,
    questions: {
      questionId: null,
      reply: [] as any
    },
    modalName: "",
    isFirstModal: false,
    userAnswers: [] as any,
    complete: 0
  },
  onLoad: async function (option) {
    if (!wx.getStorageSync("isFirst")) {
      wx.setStorageSync("isFirst", true)
      this.setData({
        isFirstModal: true
      })
    }

    if (option.id) {
      this.setData({
        id: option.id
      })
    }
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '考点练习',
    });
    this.getExamKeyPointQusetionList();
  },
  /**
   * 获取考点试题
   */
  getExamKeyPointQusetionList() {
    wx.showLoading({
      title: "加载中..."
    });
    examPackageClient.getExamKeyPointQusetion(this.data.id).then((res) => {
      if (res) {
        for (let i in res) {
          res[i].userAnswer = []
        }
        this.setData({
          qusetionList: res
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
    let answer = [] as any;
    answer.push(String.fromCharCode(e.target.dataset.index + 65));
    this.getanswer(answer, e.target.dataset.questionindex);
    if (e.target.dataset.questionindex < this.data.qusetionList.length - 1) {
      this.next();
    }
    this.setData({
      qusetionList: this.data.qusetionList
    })
  },
  //多选题
  checkCheckedAnswer(e: any) {

    var items: any = this.data.qusetionList[e.target.dataset.questionindex];
    let answer: any = [];
    if (items.userAnswer.indexOf(e.target.dataset.index) != -1) {
      for (var i = 0, lenI = items.userAnswer.length; i < lenI; ++i) {
        if (items.userAnswer[i] == e.target.dataset.index) {
          items.userAnswer.splice(i, 1);
        }
      }
    } else {
      items.userAnswer.push(e.target.dataset.index);
    }
    for (let i in items.userAnswer) {
      answer.push(String.fromCharCode(items.userAnswer[i] + 65));
    }
    this.getanswer(answer, e.target.dataset.questionindex);
    this.setData({
      qusetionList: this.data.qusetionList
    })
  },
  //解答题
  bindTextAreaBlur: function (e) {

    let answer = [] as any;
    answer.push(e.detail.value);
    this.data.qusetionList[e.target.dataset.questionindex].userAnswer[0] = e.detail.value;
    this.getanswer(answer, e.target.dataset.questionindex);
    this.setData({
      qusetionList: this.data.qusetionList
    })
  },
  //写入答案
  getanswer(answer: any, index: number) {
    let have = false;
    if (this.data.userAnswers[0] == undefined) {
      this.data.userAnswers.push({
        questionId: this.data.qusetionList[index].id,
        reply: answer
      });
    } else {
      for (let i in this.data.userAnswers) {
        if (
          this.data.userAnswers[i].questionId ==
          this.data.qusetionList[index].id
        ) {
          have = true;
        }
      }

      if (have) {
        for (let i in this.data.userAnswers) {
          if (
            this.data.userAnswers[i].questionId ==
            this.data.qusetionList[index].id
          ) {
            this.data.userAnswers[i].reply = answer;
          }
        }
      } else {
        this.data.userAnswers.push({
          questionId: this.data.qusetionList[index].id,
          reply: answer
        });
      }
    }
    let complete = 0;
    for (let i in this.data.userAnswers) {
      if (this.data.userAnswers[i].reply.length > 0 && this.data.userAnswers[i].reply != '') {
        complete++
      }
    }
    this.data.complete = complete;
    this.setData({
      complete: this.data.complete
    })
  },

  //提交答案
  async PostPointId() {
    if (this.data.qusetionList.length - this.data.complete > 0) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "您还有未答的题目，确认提交吗？",
        success: function (res) {
          if (res.confirm) {
            that.submit();
            return
          } else {
            that.hideModal(null);
            return
          }
        }
      })
      return
    } else {
      this.submit()
    }

  },
  async submit() {
    wx.showLoading({
      title: "加载中..."
    });
    if (this.data.userInfo != null && this.data.userInfo.id) {
      let PointIdData: SubmitReplyAsync = {
        uId: this.data.userInfo.id,
        pointId: parseInt(this.data.id),
        questions: this.data.userAnswers,
        seconds: 0
      };
      await webClient.sendAsync<ApiStateResult>({
        method: "POST",
        url: `/api/ExamKeyPoint/submit`,
        data: JSON.stringify(PointIdData)
      }).then((res) => {
        wx.hideLoading();
        wx.navigateTo({
          url: `/questionBank/testingSites/question/Answerkey?pointId=${this.data.id}`
        })
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
    this.setData({
      modalName: "bottomModal"
    })
  },
  hideModal(e) {
    this.setData({
      modalName: ""
    })
  },
  hideModalFirst(e) {
    this.setData({
      isFirstModal: false
    })
    console.log(this.data.isFirstModal)
  },
  toCurrent(e: any) {
    this.data.current = e.target.dataset.index;
    this.setData({
      current: this.data.current,
      modalName: ""
    })
    console.log(this.data.current)
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

})
