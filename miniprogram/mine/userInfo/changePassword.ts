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
    codeTime: 60,
    codeVal: "",
    newPwd: "",
    newPwd_s: "",
    sendFlag: true
  },
  onLoad: async function (option) {
    wx.showLoading({
      title: "加载中..."
    })
    wx.setNavigationBarTitle({
      title: '修改密码',
    });
    wx.hideLoading()
  },
  //数据绑定
  changeTelCode(e: any) {
    this.setData({
      codeVal: e.detail.value
    });
  },
  changeNewPwd(e: any) {
    this.setData({
      newPwd: e.detail.value
    });
  },
  changeNewPwds(e: any) {
    this.setData({
      newPwd_s: e.detail.value
    });
  },
  async postCode() {
    let that = this;
    let user = this.data.userInfo;
    if (!that.data.sendFlag) {
      return;
    }

    that.setData({
      sendFlag: false
    })
    if (user && this.data.codeTime == 60) {
      wx.showLoading({
        title: "加载中...",
      });
      let result = await webClient.postFormAsync<ApiStateResult>({
        url: `/api/Sms/SendSmsCode?tel=${user.tel}&needVertifyCode=false`
      });
      wx.hideLoading();

      if (result.data.isSuccess == true) {
        that.setData({
          codeTime: 60
        })
        let _that = this;
        let currentTime = _that.data.codeTime
        var interval = setInterval(function () {
          _that.setData({
            codeTime: (currentTime - 1)
          })
          currentTime--
          if (currentTime <= 0) {
            clearInterval(interval);
            _that.setData({
              sendFlag: true,
              codeTime: 60
            })
          }
        }, 1000);
      }
      else {
        if (result.data.errorMessage != null) {
          this.data.sendFlag = true;
          wx.showToast({
            title: result.data.errorMessage,
            icon: "none"
          });
        }
      }
    }
  },
  async submit(e: any) {
    let user = this.data.userInfo;
    if (this.data.codeVal == "" || this.data.newPwd == "" || this.data.newPwd_s == "") {
      return;
    }
    if (this.data.newPwd.length < 6) {
      wx.showToast({
        title: "新密码需6~20位的任意字符组合",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (this.data.newPwd != this.data.newPwd_s) {
      wx.showToast({
        title: "两次输入密码不相同",
        icon: "none",
        duration: 2000
      });
      return;
    }
    if (user) {
      await webClient
        .postFormAsync<any>({
          url: "/api/ExamApp/mineControl/changepwd-by-smscode",
          data: {
            tel: user.tel,
            smsCode: this.data.codeVal,
            newPassword: this.data.newPwd
          }
        })
        .then(res => {
          if (res.data.isSuccess) {
            wx.showToast({
              title: "修改成功！",
              icon: "none"
            });
            userClient.clear();
            wx.switchTab({
              url: "/pages/index/index"
            });
          } else {
            wx.showToast({
              title: res.data.error,
              icon: "none"
            });
          }
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
