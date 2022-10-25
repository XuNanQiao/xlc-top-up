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
    pointId: "" as any,
    userInfo: userClient.getInfo(),
    analysisList: [] as any,
    onAnalysisItem: {}
  },
  onLoad: async function (option) {
    if (option.pointId) {
      this.setData({
        pointId: option.pointId
      })
    }
    console.log(this.data.pointId);

    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '答案解析',
    });
    this.getExamKeyPointAnalysis();
  },
  //获取考点解析
  async getExamKeyPointAnalysis() {
    wx.showLoading({
      title: "加载中..."
    });
    if (this.data.userInfo) {
      let responseAnalysis = await examPackageClient.getExamKeyPointAnalysis(this.data.userInfo?.id, this.data.pointId);
      for(let i in responseAnalysis){
        responseAnalysis[i].answer = ImgSizeLimit(responseAnalysis[i].answer)
      }

      this.data.analysisList = responseAnalysis;
      let responseRecord = await examPackageClient.getExamKeyPointRecord(this.data.userInfo?.id, this.data.pointId);
      for (let i in this.data.analysisList) {
        this.data.analysisList[i].isRight = responseRecord.questions[i].isRight
      }

      this.setData({
        onAnalysisItem: this.data.analysisList[0]
      })
      console.log(this.data.onAnalysisItem);
      this.setData({
        analysisList: this.data.analysisList
      })
      console.log(this.data.analysisList);
      wx.hideLoading();
    } else {
      userClient.checkLogin()
    }
    wx.hideLoading();

  },
  pitchOnAnalysisItem(e: any) {
    this.setData({
      onAnalysisItem: e.target.dataset.item
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
