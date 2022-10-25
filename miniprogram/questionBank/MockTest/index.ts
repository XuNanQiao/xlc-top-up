// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { ExamPackageClient } from "../../utils/ExamPackageClient";
import { UserClient } from "../../utils/UserClient";


let examPackageClient = new ExamPackageClient();
let webClient = new WebClient();
let userClient = new UserClient();
Page({
  data: {
    examList: [] as any,
    recordList: [] as any,
    userInfo: userClient.getInfo(),
    page: 0,
    isMine: false,
    maxPage: 0,
    thisTime: parseInt(new Date().getTime().toString()),
    onChack: 1,
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
    this.getExamroom()
  },
  async getExamroom() {
    wx.showLoading({ title: `加载中...` });
    this.data.examList = []

    if (this.data.userInfo) {
      await examPackageClient.getExamroom(this.data.page, this.data.isMine, this.data.userInfo.id).then((res) => {
        if (res) {
          this.data.examList = this.data.examList.concat(res.data);
          this.data.maxPage = res.maxPageIndex;
          for (let i in this.data.examList) {
            this.data.examList[i].startTime = parseInt(new Date(this.data.examList[i].startUTCTime).getTime().toString());
            this.data.examList[i].endTime = parseInt(new Date(this.data.examList[i].endUTCTime).getTime().toString());
          }
          this.setData({
            examList: this.data.examList,
            maxPage: this.data.maxPage
          })
          wx.hideLoading();
        }
      },
        (err) => {
          wx.hideLoading();
          wx.showToast({
            title: "服务器异常请稍后再试！",
            icon: "none"
          });
        })
    }
    wx.hideLoading();
  },
  async getExamRecordAsync() {
    wx.showLoading({ title: `加载中...` });

    this.data.recordList = []
    if (this.data.userInfo) {
      await examPackageClient.getExamRecordAsync(this.data.page, 9999, this.data.userInfo.id).then((res) => {
        if (res) {
          this.data.recordList = this.data.recordList.concat(res.data);
          this.data.maxPage = res.maxPageIndex;
          for (let i in this.data.recordList) {
            this.data.recordList[i].startTime = parseInt(new Date(this.data.recordList[i].startUTCTime).getTime().toString());
            this.data.recordList[i].endTime = parseInt(new Date(this.data.recordList[i].endUTCTime).getTime().toString());
          }
          this.setData({
            recordList: this.data.recordList,
            maxPage: this.data.maxPage
          })
          wx.hideLoading();
        }
      }, (err) => {
        wx.hideLoading();
        wx.showToast({
          title: "服务器异常请稍后再试！",
          icon: "none"
        });
      })
    }
    wx.hideLoading();
  },
  chackTab(e) {
    this.data.onChack = e.target.dataset.index;

    this.setData({
      onChack: this.data.onChack,
      page: 0,
      maxPage: 0
    })
    if (this.data.onChack == 1) {
      this.getExamroom()
    } else {
      this.getExamRecordAsync()
    }
  },
  async linkto(e: any) {
    wx.showLoading({ title: `加载中...` });
    console.log(e.target.dataset, "--------e.target.dataset");
    if (e.target.dataset.price > 0 && !e.target.dataset.isPurchased) {
      if (!this.data.userInfo) {
        userClient.checkLogin();
        return
      }
      let storageKey = `order${new Date().getTime().toString()}`;
      wx.setStorageSync(storageKey, [
        { itemId: Number(e.target.dataset.id), itemType: 11 }
      ]);
      wx.navigateTo({
        url: `/order/pages/index/index?storageKey=${storageKey}`,
        complete: () => {
          this.setData({
            subFlag: false
          })
        }
      });
    } else {
      if (this.data.userInfo) {
        await examPackageClient.getExamroomDesc(e.target.dataset.id, this.data.userInfo.id).then((res) => {
          wx.hideLoading();

          if (res.isAllowed) {
            wx.navigateTo({
              url: `/questionBank/MockTest/ExamList?roomId=${e.target.dataset.id}`
            })
          } else {
            wx.showToast({
              title: res.reason,
              icon: "none"
            });
          }
        }, (err) => {
          wx.hideLoading();

          wx.showToast({
            title: "服务器异常请稍后再试！",
            icon: "none"
          });
        })
      } else {
        userClient.checkLogin();
        return
      }
    }


    wx.hideLoading();

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
    if (this.data.page == this.data.maxPage) {
      return;
    }
    this.setData({
      page: this.data.page++
    })
    if (this.data.onChack == 1) {
      this.getExamroom();
    } else {
      this.getExamRecordAsync()
    }
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
