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
    onAnalysisItem: {} as any,
    onKcItem: wx.getStorageSync("onKcItem") as any,
    option: null as any,
    ifOnShow:false,
  },
  onLoad: async function (option) {
    this.setData({
      option: option
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
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
      let responseAnalysis = await examPackageClient.getDailyTrainingQusetion(this.data.userInfo?.id, this.data.onKcItem.id);
      for (let i in responseAnalysis.items) {
        responseAnalysis.items[i].answer = ImgSizeLimit(responseAnalysis.items[i].answer)
      }
      this.data.analysisList = responseAnalysis.items;

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
    this.data.onAnalysisItem = e.target.dataset.item;
    this.data.onAnalysisItem.order = e.target.dataset.index;
    this.setData({
      onAnalysisItem: this.data.onAnalysisItem
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
