// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { UserClient } from "../../utils/UserClient";
import { ExamPackageClient } from "../../utils/ExamPackageClient";
let examPackageClient = new ExamPackageClient();
let userClient = new UserClient();
let webClient = new WebClient();
Page({
  data: {
    kcId: 0,
    userInfo: userClient.getInfo(),
    kcIsShow: false,
    onKcItem: wx.getStorageSync("onKcItem") as any,
    kcList: {} as any,
    myDailyPractice: {} as any,
    dailyPracticeList: [] as any,
    pageIndex: 0,
    MaxPage: 0,
    desc: true,
    ifOnShow: false,
    option: null as any
  },
  onLoad: async function (option) {
    console.log("---------ghjghj");

    this.setData({
      option: option,
      onKcItem: wx.getStorageSync("onKcItem"),
      userInfo: userClient.getInfo()
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '每日一练',
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
    this.getDailyPracticeMineRecord();
    this.getDailyPracticeMembers();
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
      examKeyPointList: [],
      pageIndex: 0,
      dailyPracticeList: []
    })
    wx.setStorageSync("onKcItem", e.target.dataset.kcitem);
    this.getDailyPracticeMineRecord();
    this.getDailyPracticeMembers();
  },

  //获取我的每日一练记录
  async getDailyPracticeMineRecord() {
    if (this.data.userInfo) {
      await examPackageClient.getDailyPracticeMineRecord(this.data.userInfo.id, this.data.onKcItem.id).then((res) => {
        if (res.isSuccess) {
          this.data.myDailyPractice = res.data;
          this.data.myDailyPractice.seconds = `${parseInt((res.data.seconds / 60).toString())}分${parseInt((res.data.seconds % 60).toString())}秒`;
          this.data.myDailyPractice.rightRate = parseInt((this.data.myDailyPractice.rightRate * 100).toString())
          this.setData({
            myDailyPractice: this.data.myDailyPractice
          })
        }

      })
    }
  },
  //获取每日一练测试成员
  async getDailyPracticeMembers() {
    if (this.data.userInfo) {
      await examPackageClient.getDailyPracticeMembers(this.data.pageIndex, 12, this.data.userInfo?.id, this.data.desc, this.data.onKcItem.id).then((res) => {
        if (this.data.pageIndex == 0) {
          if (res.data.length > 0) {
            this.data.dailyPracticeList = res.data;
            for (let i in this.data.dailyPracticeList) {
              this.data.dailyPracticeList[i].seconds = `${parseInt((this.data.dailyPracticeList[i].seconds / 60).toString())}分${parseInt((this.data.dailyPracticeList[i].seconds % 60).toString())}秒`;
            }
          }
        } else {
          this.data.dailyPracticeList.push(...res.data);
        }
        this.setData({
          dailyPracticeList: this.data.dailyPracticeList,
          MaxPage: res.maxPageNumber
        })
      })
    }
  },
  //切换排序
  chackDesc: function (e) {
    this.data.desc = e.currentTarget.dataset.desc
    this.setData({
      desc: this.data.desc,
      pageIndex: 0
    })
    this.getDailyPracticeMembers()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    // ifOnShow:false,
    this.setData({
      userInfo: userClient.getInfo(),
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
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    if (this.data.pageIndex <= this.data.MaxPage) {
      this.getDailyPracticeMembers();
    }
    wx.stopPullDownRefresh()
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
