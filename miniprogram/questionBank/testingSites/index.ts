// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { UserClient } from "../../utils/UserClient";
let userClient = new UserClient();
let webClient = new WebClient();
Page({
  data: {
    kcId: 0,
    userInfo: userClient.getInfo(),
    kcIsShow: false,
    onKcItem: wx.getStorageSync("onKcItem") as any,
    kcList: {} as any,
    examKeyPointList: [] as any,
    ifOnShow:false,
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
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '考点练习',
    });

    let res = await this.getKcList();
    this.setData({
      kcList: res.data,
    })
    if (!this.data.onKcItem) {
      this.setData({
        onKcItem: this.data.kcList[0]
      })
      wx.setStorageSync("onKcItem", this.data.onKcItem);
    }
    this.getChapterList()
  },
  //获取课程章节列表
  getChapterList() {
    wx.showLoading({
      title: "加载中..."
    });
    webClient.sendAsync<any>({
      url: `/api/exam/Chapter/sections?kId=${this.data.onKcItem.id}`
    }).then(async (res) => {
      let chapterList = res.data;
      let examKeyPointList;
      for (let item of chapterList) {
        let respo = await this.getExamKeyPointList(item.kId, item.id);
        this.data.examKeyPointList = this.data.examKeyPointList.concat(respo.data)
      }
      this.setData({
        examKeyPointList: this.data.examKeyPointList
      })
      console.log(this.data.examKeyPointList);
      wx.hideLoading();
    })
  },
  //获取章节下考点
  getExamKeyPointList(kcId: number, chapterId: number) {
    return webClient.sendAsync<any>({
      url: `/api/ExamKeyPoint/list?kcId=${kcId}&chapterId=${chapterId}&uId=${this.data.userInfo?.id}`
    })
  },

  /**
    * 获取课程列表
    */
  async getKcList() {
    return webClient.sendAsync<any>({
      url: `/api/course/basic/Kechengs?kind=3`,
    })
  },
  /**
    * 展示课程列表
    */
  showKcList(e: any) {
    this.setData({
      kcIsShow: e.target.dataset.kcisshow
    })
  },
  /**
  * 切换课程
  */
  async chackKc(e: any) {
    this.setData({
      onKcItem: e.target.dataset.kcitem,
      kcIsShow: false,
      kcId: e.target.dataset.kcitem.id,
      examKeyPointList: []
    })
    wx.setStorageSync("onKcItem", e.target.dataset.kcitem);

    this.getChapterList()
  },
  noQuestionCount() {
    wx.showToast({
      title: "暂无试题！",
      icon: "none",
    });
  },
  onShow: async function () {
    // ifOnShow:false,
    this.setData({
      userInfo: userClient.getInfo(),
      onKcItem: wx.getStorageSync("onKcItem")
    })
    let res = await this.getKcList();
    this.setData({
      kcList: res.data,
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    let path = inviteCodeManager.CreatePath("/pages/learning/index", null);

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
