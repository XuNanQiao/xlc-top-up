// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../../utils/WebClient";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
import { ExamPackageClient } from "../../../utils/ExamPackageClient";
let examPackageClient = new ExamPackageClient();
let webClient = new WebClient();
Page({
  data: {
    id: "",
    keyPoint: {} as any,
    question: [] as any
  },
  onLoad: async function (option) {
    if (option.id) {
      this.setData({
        id: option.id
      })
    }
    console.log(this.data.id);

    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '图文解析',
    });

    this.getKeyPoint();

    let res = await examPackageClient.getExamKeyPointQusetion(this.data.id);
    this.data.question = res;
    this.setData({
      question: this.data.question
    })
  },
  getKeyPoint() {
    wx.showLoading({
      title: "加载中..."
    });
    webClient.sendAsync<any>({
      url: `/api/ExamKeyPoint/item/${this.data.id}`
    }).then(res => {
      if (res.data) {
        this.setData({
          keyPoint: res.data
        })
      }
      wx.hideLoading();
    })
  },
  noQuestionCount() {
    wx.showToast({
      title: "暂无试题！",
      icon: "none",
    });
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    let path = inviteCodeManager.CreatePath("/questionBank/analysis/textAnalysis", null);

    return {
      title: "学习",
      path: path,
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
