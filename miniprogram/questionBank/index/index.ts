// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { UserClient } from "../../utils/UserClient"
let webClient = new WebClient();
let userClient = new UserClient();
Page({
  data: {
    userInfo: userClient.getInfo(),
    kcIsShow: false,
    kcList: {},
    onKcItem: wx.getStorageSync("onKcItem") as any,
    KaoDianNum: {} as any,ifOnShow:false,
    option: null as any
  },
  onLoad: async function (option) {
    this.setData({
      option: option,
      userInfo:userClient.getInfo(),
      onKcItem: wx.getStorageSync("onKcItem"),
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: '我的题库',
    });
    let res = await this.getKcList();
    this.setData({
      kcList: res.data,
    })
    if (!this.data.onKcItem) {
      this.setData({
        onKcItem: res.data[0]
      })
      wx.setStorageSync("onKcItem", this.data.onKcItem);
    }

    let KaoDianNum = await this.getKaoDian();
    this.setData({
      KaoDianNum: KaoDianNum
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
      kcIsShow: false
    })
    let KaoDianNum = await this.getKaoDian();
    this.setData({
      KaoDianNum: KaoDianNum
    })
    wx.setStorageSync("onKcItem", e.target.dataset.kcitem);
  },
  /**
  * 获取课程列表
  */
  async getKcList() {
    return webClient.sendAsync<any>({
      url: `/api/course/basic/Kechengs?kind=3`,
    })
  },
  //获取做题数量
  async getKaoDian() {
    let onKcItem = this.data.onKcItem;
    if (this.data.userInfo) {
      let userInfo = this.data.userInfo;
      let requetion = await webClient.sendAsync<any>({
        url: "/api/ShiJuan/exam-statistics",
        data: {
          uId: this.data.userInfo.id,
          zyId: 263,
          kcId: onKcItem.id
        }
      });
      let KaoDianNum = await requetion.data;
      KaoDianNum.completeDegree = (KaoDianNum.completeDegree * 100).toFixed(2);
      return KaoDianNum
    }
  },
  onShow: function () {
    // ifOnShow:false,
    this.setData({
      userInfo: userClient.getInfo(),
      onKcItem: wx.getStorageSync("onKcItem"),
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
