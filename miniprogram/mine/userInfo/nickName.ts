// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { UserClient } from "../../utils/UserClient";
import { PutUserInfo } from "../../utils/putUserInfo";
let webClient = new WebClient();
let userClient = new UserClient();
let putUserInfo = new PutUserInfo();
Page({
  data: {
    newNickName: "",
    userInfo: userClient.getInfo()
  },
  onLoad: async function (option) {
    wx.setNavigationBarTitle({
      title: '修改昵称',
    });
  },
  //数据绑定
  changeModel(e: any) {
    this.setData({
      newNickName: e.detail.value
    });

  },
  async Determine() {
    let that = this;
    let user = that.data.userInfo;
    if (user && that.data.userInfo) {
      user.nickName = this.data.newNickName;
      that.setData({
        userInfo: user
      })
      await putUserInfo.putUser(that.data.userInfo).then(res => {
        this.setData({
          newNickName: ""
        });
        wx.switchTab({
          url:"/pages/mine/index"
        })
      });
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

})
