// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { UserClient } from "../../utils/UserClient"
import { PutUserInfo } from "../../utils/putUserInfo";
let webClient = new WebClient();
let userClient = new UserClient();
let putUserInfo = new PutUserInfo();
Page({
  data: {
    userInfo: userClient.getInfo(),
  },
  onLoad: async function (option) {
    wx.setNavigationBarTitle({
      title: '个人资料',
    });
  },
  //选择性别
  sexChoose() {
    let that = this;
    wx.showActionSheet({
      itemList: ["男", "女"],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.Determine("男");
        } else {
          that.Determine("女");
        }
      },
      fail: function (res) { }
    });
  },
  //性别修改
  async Determine(sex: string) {
    wx.showLoading({
      title: "加载中...",
    });
    let that = this;
    if (that.data.userInfo) {
      let user = that.data.userInfo;
      user.sex = sex;
      await putUserInfo.putUser(user).then(res => {
        wx.hideLoading();
        that.setData({
          userInfo: userClient.getInfo()
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
