// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { CourseClient } from "../../utils/courseClient";
import { UserClient } from "../../utils/UserClient";
let webClient = new WebClient();
let courseClient = new CourseClient();
let userClient = new UserClient();
Page({
  data: {
    userInfo: userClient.getInfo(),
    courseList: [] as CourseListDto[],
  },
  onLoad: async function (option) {
    wx.showLoading({
      title: "加载中..."
    })
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '我的课程',
    });
    this.getMyCourseList();
    wx.hideLoading()
  },
  getMyCourseList() {
    //我的购买
    courseClient.getSingleCourseListAsync(this.data.userInfo?.id).then(res => {
      this.setData({
        courseList: this.data.courseList.concat(res)
      })
    })
    // 我的直播公开课
    courseClient.getPublicLiveCourseListAsync(this.data.userInfo?.id).then(res => {
      for (let item of res) {
        item.tags[0] = '公开课'
      }

      this.setData({
        courseList: this.data.courseList.concat(res)
      })
    })
    // 我的兑换课
    courseClient.getExchangeCourseListAsync(this.data.userInfo?.id).then(res => {
      this.setData({
        courseList: this.data.courseList.concat(res)
      })
    })
  },
  //页面跳转
  goNext(event: any) {
    console.log("event.currentTarget.dataset.type:", event.currentTarget.dataset.type);

    if (event.currentTarget.dataset.tags == '直播') {
      wx.navigateTo({
        url: '/course/pages/introduction/introduction?id=' + event.currentTarget.dataset.id
      })
    } else if (event.currentTarget.dataset.tags == '点播') {
      wx.navigateTo({
        url: '/course/video/introduction/introduction?id=' + event.currentTarget.dataset.id
      })
    } else if (event.currentTarget.dataset.tags == "公开课") {
      wx.navigateTo({
        url: '/freeLive/pages/playerPublic/playerPublic?id=' + event.currentTarget.dataset.id
      })
    }

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
    let path = inviteCodeManager.CreatePath("/mine/MyCourse/MyCourse", null);
    return {
      title: "学习",
      path: path,
      success: function (res) {
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
