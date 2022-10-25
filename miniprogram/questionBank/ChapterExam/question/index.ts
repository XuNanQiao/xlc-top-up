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
      additional: {
        id: 0 as any
      } as any,
      answerRecord: [] as any,
      order: 0
    } as any,
    questionsChecked: { additional: {} as any } as any,
    modalName: "",
    isFirstModal: false,
    onKcItem: wx.getStorageSync("onKcItem") as any,
    startTime: "" as any,
    endTime: "" as any,
    examPackage: {} as any,
    chapterId: 0,
    kcId: 0,
    subject: {} as any,
    complete: 0,
    subjectBox: {},
    examId: "",
    ifOnShow: false,
    option: null as any
  },
  onLoad: async function (option) {
    this.setData({
      option: option
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    if (!wx.getStorageSync("isFirst")) {
      wx.setStorageSync("isFirst", true)
      this.setData({
        isFirstModal: true
      })
    }
    this.setData({
      chapterId: Number(option.id),
      kcId: Number(option.kcId),
    })
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    this.getExamQusetionList()
  },

  /**
   * 获取试卷试题
   */
  getExamQusetionList() {
    wx.showLoading({
      title: "加载中..."
    });
    if (this.data.userInfo) {
      examPackageClient.GetChapterExam(this.data.chapterId, this.data.kcId).then((res) => {
        if (res.data) {
          this.data.subject = res.data;
          this.data.subjectBox = res.data.questionGroups;
          for (let i in res.data.questionGroups) {
            for (let j in res.data.questionGroups[i].questions) {
              res.data.questionGroups[i].questions[j].name = res.data.questionGroups[i].name;
              res.data.questionGroups[i].questions[j].additional["userAnswer"] = "";
              this.data.qusetionList = this.data.qusetionList.concat(res.data.questionGroups[i].questions[j])
            }
          }
          this.setData({
            qusetionList: this.data.qusetionList,
            subject: this.data.subject,
            subjectBox: this.data.subjectBox
          })
          wx.setNavigationBarTitle({
            title: this.data.subject.name,
          });
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
  async checkRadioboxAnswer(e: any) {
    var items: any = this.data.qusetionList[e.target.dataset.questionindex];
    items.additional.userAnswer = String.fromCharCode(e.target.dataset.index + 65);
    if (e.target.dataset.questionindex < this.data.qusetionList.length - 1) {
      this.next()
    }
    this.setData({
      qusetionList: this.data.qusetionList,
    })
    this.noAnswer();
  },
  //多选题
  checkCheckedAnswer(e: any) {

    var items: any = this.data.qusetionList[e.target.dataset.questionindex];
    let data = String.fromCharCode(e.target.dataset.index + 65);
    if (items.additional.userAnswer) {
      console.log(items.additional.userAnswer, "----------items.additional.userAnswer");

      let bottom = items.additional.userAnswer.indexOf(data);
      if (bottom != -1) {
        items.additional.userAnswer =
          items.additional.userAnswer.substring(0, bottom) +
          items.additional.userAnswer.substring(bottom + 2);
      } else {
        items.additional.userAnswer = items.additional.userAnswer + "," + data;
      }
    } else {
      items.additional.userAnswer = data;
    }
    this.setData({
      qusetionList: this.data.qusetionList,
    })
    this.noAnswer();
  },
  //解答题
  bindTextAreaBlur: function (e) {
    this.data.qusetionList[e.target.dataset.questionindex].additional.userAnswer = e.detail.value;
    this.setData({
      qusetionList: this.data.qusetionList
    })
    this.noAnswer();
  },
  //未答计算
  async noAnswer() {
    this.data.complete = 0;
    for (let i in this.data.qusetionList) {
      if (this.data.qusetionList[i].additional.userAnswer != "") {
        this.data.complete++;
      }
    }
    this.setData({
      complete: this.data.complete,
    })
  },

  //提交答案
  async PostPointId() {
    this.noAnswer();
    let that = this;
    if (this.data.userInfo != null) {
      if (this.data.qusetionList.length - this.data.complete > 0) {
        wx.showModal({
          title: "提交",
          content: "检测到您有未答的题目，确认是否提交？",
          success(res) {
            if (res.confirm) {
              that.submit();
            }
          }
        });
      } else {
        this.submit();
      }
    }

  },

  //提交
  async submit() {
    wx.showLoading({
      title: "加载中..."
    });
    if (this.data.userInfo != null && this.data.userInfo.id) {

      for (let i in this.data.qusetionList) {
        this.data.qusetionList[i].additional["user-answer"] = this.data.qusetionList[
          i
        ].additional.userAnswer;
        delete this.data.qusetionList[i].additional.userAnswer;
      }
      this.data.subject.testSeconds = 0;
      await webClient.sendAsync<any>({
        method: "POST",
        url: `/api/exam/Chapter/submit?uId=${this.data.userInfo.id}`,
        data: JSON.stringify(this.data.subject)
      }).then((res) => {
        wx.hideLoading();
        if (res.data) {
          wx.setStorage({
            key: "chapterSubmit",
            data: res
          });
          wx.navigateTo({
            url: `/questionBank/ChapterExam/question/Answerkey`
          })
        } else {
          wx.showToast({
            title: "服务器异常，请稍后再试！",
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
