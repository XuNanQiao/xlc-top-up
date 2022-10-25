// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../utils/WebClient";
import { inviteCodeManager } from "../utils/InviteCodeManager";
import { ExamPackageClient } from "../utils/ExamPackageClient"
let webClient = new WebClient();
let examPackageClient = new ExamPackageClient();
Page({
  data: {
    classifyId: 0,
    kcId: 0,
    onKcItem: wx.getStorageSync("onKcItem") as any,
    kcList: {} as any,
    page: 1,
    examPackageList: {} as any,
    MaxPage: 0,
    kcIsShow: false,
  },
  onLoad: async function (option) {
    if (option.kcId) {
      this.setData({
        kcId: parseFloat(option.kcId)
      })
    }
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    if (option.classifyId == "38") {
      this.setData({
        classifyId: parseFloat(option.classifyId)
      })
      wx.setNavigationBarTitle({
        title: '历年真题',
      });
    }
    else if (option.classifyId == "62") {
      this.setData({
        classifyId: parseFloat(option.classifyId)
      })
      wx.setNavigationBarTitle({
        title: '考前押密',
      });
    }

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
    this.getExamList()
  },
  /**
    * 获取课程列表
    */
  async getKcList() {
    return webClient.sendAsync<any>({
      url: `/api/course/basic/Kechengs?kind=3`,
    })
  },
  //获取试卷列表
  async getExamList(isChackKc?: boolean) {
    let examPackageList = this.data.examPackageList;
    examPackageClient.getExamPackages(
      this.data.page,
      12,
      3,
      263,
      this.data.kcId,
      this.data.classifyId
    ).then(data => {
      if (!isChackKc) {
        if (this.data.page == 1) {
          examPackageList = data.data
        } else {
          examPackageList.push(...data.data);
        }
      } else {
        examPackageList = {}
        if (this.data.page == 1) {
          examPackageList = data.data
        } else {
          examPackageList.push(...data.data);
        }
      }

      this.setData({
        examPackageList: examPackageList,
        MaxPage: data.maxPageNumber
      })
      console.log(this.data.examPackageList);

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
      page: 1,
      kcId: e.target.dataset.kcitem.id
    })
    wx.setStorageSync("onKcItem", e.target.dataset.kcitem);
    this.getExamList(true);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    this.setData({
      onKcItem: wx.getStorageSync("onKcItem")
    })
    let res = await this.getKcList();
    this.setData({
      kcList: res.data,
    })
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
    this.setData({
      page: this.data.page + 1
    })
    if (this.data.page <= this.data.MaxPage) {
      this.getExamList();
    }
    wx.stopPullDownRefresh()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    let path = inviteCodeManager.CreatePath("/examPaper/examList", null);

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
