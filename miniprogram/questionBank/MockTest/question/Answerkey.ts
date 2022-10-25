// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../../utils/WebClient";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
import { UserClient } from "../../../utils/UserClient";
import { ExamPackageClient } from "../../../utils/ExamPackageClient";
import { ImgSizeLimit } from "../../../utils/stringHelper";

let userClient = new UserClient();
let webClient = new WebClient();
let examPackageClient = new ExamPackageClient();
Page({
  data: {
    roomId: "" as any,
    examId: "" as any,
    userInfo: userClient.getInfo(),
    qusetionList: [] as any,
    onAnalysisItem: {} as any,
    onKcItem: wx.getStorageSync("onKcItem") as any,
  },
  onLoad: async function (option) {
    if (option.roomId && option.examId) {
      this.setData({
        roomId: option.roomId,
        examId: option.examId
      })
    }

    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '答案解析',
    });
    this.getExamKeyPointAnalysis();
  },
  //获取试卷解析
  async getExamKeyPointAnalysis() {
    wx.showLoading({
      title: "加载中..."
    });
    if (this.data.userInfo) {
      await webClient.sendAsync<any>({
        url: `/api/ExamApp/exam-packageControl/exam-result?uId=${this.data.userInfo.id}&examId=${this.data.examId}`
      }).then((res) => {
        let data = res.data.data
        if (data) {
          for (let i in data.questionGroups) {
            for (let j in data.questionGroups[i].questions) {
              data.questionGroups[i].questions[j].analysis = ImgSizeLimit(data.questionGroups[i].questions[j].analysis);
              data.questionGroups[i].questions[j].answer = ImgSizeLimit(data.questionGroups[i].questions[j].answer);
              this.data.qusetionList = this.data.qusetionList.concat(data.questionGroups[i].questions[j])
            }
          }
          this.setData({
            qusetionList: this.data.qusetionList,
            onAnalysisItem: this.data.qusetionList[0]
          })
        }
      })
      wx.hideLoading();
    } else {
      userClient.checkLogin()
    }
    wx.hideLoading();

  },
  pitchOnAnalysisItem(e: any) {
    this.data.onAnalysisItem = e.target.dataset.item;
    this.data.onAnalysisItem.order = e.target.dataset.index;
    this.setData({
      onAnalysisItem: this.data.onAnalysisItem
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    userClient.checkLogin()
    //this.getExamKeyPointAnalysis();
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
