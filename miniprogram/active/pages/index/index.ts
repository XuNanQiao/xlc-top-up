// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../../utils/WebClient";
import { CourseClient } from "../../../utils/courseClient";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
import { MakeUpGroup } from "../../../utils/MakeUpGroup";
let makeUpGroup = new MakeUpGroup()
let courseClient = new CourseClient()
let webClient = new WebClient();
Page({
  data: {
    activeList: [] as InteractActivityListDto[],
    pageIndex: 0,
    pageSize: 10,

  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad: async function (option) {
    //判断是否是赠送
    if (option.invitedByUserId) {
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id
      };
      wx.setStorageSync("inviter", invited);
    }
    this.getInteractActivity()
  },
  async getInteractActivity() {
    await makeUpGroup.getTopicListAsync(
      1,
      3
    ).then(res => {
      this.setData({
        activeList: res
      })
    })
  },
  //页面跳转
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/active/pages/index/index", null);
    return {
      title: '最新活动',
      path: ''
    }
  },
  /**
* 页面上拉触底事件的处理函数
*/
  onReachBottom: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.getInteractActivity()
  },
})
