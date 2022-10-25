// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../../utils/WebClient";
import { CourseClient } from "../../../utils/courseClient";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
let courseClient = new CourseClient()
let webClient = new WebClient();
Page({
  data: {
    VideosProfessionList: [],
    searchVal: '',
    courseKeChengsList: [] as KeChengDto[],
    kcId: null as null | number
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad: async function (option) {
    this.VideosProfession()
    await courseClient.getCourseKeChengsAsync().then(res => {
      this.setData({
        courseKeChengsList: res
      })
    })
    //判断是否是赠送
    if (option.invitedByUserId) {
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id
      };
      wx.setStorageSync("inviter", invited);
    }
  },
  //获取优选课列表
  async VideosProfession() {
    if (this.data.kcId) {
      await courseClient.getVideosProfessionListAsync(3, this.data.kcId, this.data.searchVal).then(res => {
        this.setData({
          VideosProfessionList: res
        })
      })
    } else {
      await courseClient.getVideosProfessionListAsync(3, undefined, this.data.searchVal).then(res => {
        this.setData({
          VideosProfessionList: res
        })
      })
    }

  },
  // 搜索
  sendMsgTap(e: any) {
    this.setData({
      kcId: null,
      VideosProfessionList: []
    })
    this.VideosProfession()
  },
  //搜索赋值
  setSearchVal(e: any) {
    this.setData({
      kcId: null,
      searchVal: e.detail.value
    })
  },
  //课程选择
  async kcChoose(event: any) {
    this.setData({
      kcId: event.currentTarget.dataset.id,
      searchVal: '',
      VideosProfessionList: []
    })
    this.VideosProfession()
  },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/course/pages/index/index", null);
    return {
      title: "优选课",
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
  //页面跳转
  goNext(event: any) {
    console.log("event.currentTarget.dataset.type:", event.currentTarget.dataset.type);

    if (event.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: '/course/pages/introduction/introduction?id=' + event.currentTarget.dataset.id
      })
    } else {
      wx.navigateTo({
        url: '/course/video/introduction/introduction?id=' + event.currentTarget.dataset.id
      })
    }

  }
})
