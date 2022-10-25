// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../utils/WebClient";
import { UserClient } from "../utils/UserClient";
import { inviteCodeManager } from "../utils/InviteCodeManager";
import { ExamPackageClient } from "../utils/ExamPackageClient";
import { ImgSizeLimit } from "../utils/stringHelper";

let examPackageClient = new ExamPackageClient();
let webClient = new WebClient();
let userClient = new UserClient();
Page({
  data: {
    userInfo: userClient.getInfo(),
    id: "",
    examPackage: {},
    content: "" as any,
    isShow: 1,
    hasthis: true,
    ifOnShow: false,
    option: null as any,
    CouponsModal:""
  },
  onLoad: async function (option) {
    this.setData({
      option: option,
      userInfo: userClient.getInfo(),
    })
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    if (option.id) {
      this.data.id = option.id;
      this.setData({
        id: this.data.id
      })
    }
    //判断用户是否购买
    if (!this.data.userInfo) {
      this.setData({
        hasthis: false
      })
    } else {
      await examPackageClient.gethasItemAsync(
        3,
        Number(option.id),
        this.data.userInfo.id
      ).then(res => {
        this.setData({
          hasthis: res
        })
      })
    }
    ;
    if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
      inviteCodeManager.TryStorageInviteCode(option.regCode);
    }
    wx.setNavigationBarTitle({
      title: "试卷详情",
    });
    this.getDetails();
  },
  async getDetails() {
    if (this.data.userInfo) {
      let result = await examPackageClient.getAppExamPackage(
        parseInt(this.data.id),
        this.data.userInfo.id
      );
      this.data.examPackage = result.data;
      let richtext = result.data.detail;
      this.data.content = ImgSizeLimit(richtext);
      this.setData({
        examPackage: this.data.examPackage,
        content: this.data.content
      })
    }

  },
  tabClick(e) {
    this.data.isShow = e.currentTarget.dataset.index;
    this.setData({
      isShow: this.data.isShow
    })
  },
  //页面跳转
  startZd(e:any) {
    let id = e.currentTarget.dataset.packageid;
    let examId = e.currentTarget.dataset.examid;
    let price = e.currentTarget.dataset.price;
    console.log(e)
    if (!this.data.hasthis && price > 0) {
      wx.showToast({
        title: "尚未购买",
        icon: "none"
      });
      return
    }
    if (this.data.hasthis == true || price <= 0) {
      wx.navigateTo({
        url: `/examPaper/question/index?packageId=${id}&examId=${examId}`
      });
    }
  },
  checkAnswer(e) {
    let id = e.currentTarget.dataset.packageid;
    let examId = e.currentTarget.dataset.examid;
    let price = e.currentTarget.dataset.price;
    if (this.data.hasthis != true && price > 0) {
      wx.showToast({
        title: "尚未购买",
        icon: "none"
      });
    }
    if (this.data.hasthis == true || price <= 0) {
      wx.navigateTo({
        url: `/examPaper/question/Answerkey?examId=${examId}&packageId=${id}`
      });
    }
  },
  //购买
  async order() {
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    let storageKey = `order${new Date().getTime().toString()}`;
    wx.setStorageSync(storageKey, [
      { itemId: Number(this.data.id), itemType: 3 }
    ]);
    wx.navigateTo({
      url: `/order/pages/index/index?storageKey=${storageKey}`,
      complete: () => {
        this.setData({
          subFlag: false
        })
      }
    });
  },

  CouponsModalClick() {
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return;
    }
    this.setData({
      CouponsModal: "CouponsModal"
    })

  },
  getCouponsModal(e: any) {
    this.setData({
      CouponsModal: e.detail.val
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    this.setData({
      userInfo: userClient.getInfo(),
    }) 
    if (this.data.ifOnShow == true) {
      app.reloadCurrent(this.data.option);
      if (!this.data.userInfo) {
        this.setData({
          hasthis: false
        })
      } else {
        await examPackageClient.gethasItemAsync(
          3,
          Number(this.data.option.id),
          this.data.userInfo.id
        ).then(res => {
          this.setData({
            hasthis: res
          })
        })
      }

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
