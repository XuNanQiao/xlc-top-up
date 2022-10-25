// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { UserClient } from "../../utils/UserClient";
let userClient = new UserClient()
let webClient = new WebClient();
Page({
  data: {
    slides: [],
    userInfo: userClient.getInfo(),
    KaoDianNum: {} as any,
    KaoDian: {} as any,
    everDay: {} as any,
    LiNian: {} as any,
    MiYa: {} as any,
    KaoQian: {} as any,
    CourseTraking: 0 as number
  },
  onLoad: async function (option) {
  
    this.setData({ userInfo: userClient.getInfo(), })
    wx.showLoading({
      title: "加载中..."
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
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    this.getMultiple();
    this.getKaoDian(263);
    this.getCourseTrakingTime();
    wx.hideLoading()
  },
  //获取幻灯片
  async getMultiple() {
    await webClient.sendAsync<any>({
      url: `/api/Slides/multiple/${'TopUp.index.MainSlide'}`,

    }).then(res => {
      this.setData({
        slides: res.data
      })
    });
  },
  //获取考点数量
  async getKaoDian(zyId: number) {

    if (this.data.userInfo) {
      let userInfo = this.data.userInfo;
      let requetion = await webClient.sendAsync<any>({
        url: "/api/ShiJuan/exam-statistics",
        data: {
          uId: this.data.userInfo.id,
          zyId: Number(zyId)
        }
      });
      let KaoDianNum = await requetion.data;
      KaoDianNum.completeDegree = (KaoDianNum.completeDegree * 100).toFixed(2);
      this.setData({
        KaoDianNum: KaoDianNum
      })
    }
  },
  async getCourseTrakingTime() {
    if (this.data.userInfo) {
      let res = await webClient.sendAsync<any>({ 
        url: `/api/LearnStatistics/courseTrackMinutes?kind=3&uId=${this.data.userInfo.id}`
      });
      this.setData({
        CourseTraking: res.data.toFixed(0)
      })
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.userInfo) {
      userClient.navigatorToLoginPage();
      return
    }
    this.getKaoDian(263);
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
