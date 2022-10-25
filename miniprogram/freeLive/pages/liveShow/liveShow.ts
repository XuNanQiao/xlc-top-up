const app = getApp()
import { setting } from "../../../setting";
import { CourseClient } from "../../../utils/courseClient";
let courseClient = new CourseClient()
import { olderType } from "../../../enum/older";
import { inviteCodeManager } from "../../../utils/InviteCodeManager";

Page({
  data: {
    freecourse: [] as liveFreeDateGroupDto[],
    pageIndex: 0,
    pageSize: 25,
    navVal: 0,
    dayVal: 0,
    days: [] as any,
    weeks: ["七", "一", "二", "三", "四", "五", "六"]
  },
  onLoad: async function (option) {
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
    await this.getDates()
    await this.getFreeLive()
    wx.hideLoading()
  },
  //获取七天日期方法
  async getDates() {
    var new_Date = new Date();
    var timesStamp = new_Date.getTime();
    var currenDay = new_Date.getDay();
    var dates = [] as any;
    for (var i = 0; i < 7; i++) {
      let thisDay = new Date(
        new Date(
          timesStamp + 24 * 60 * 60 * 1000 * (i)
        )
          .toLocaleDateString()
          .replace(/[年月]/g, "-")
          .replace(/[日上下午]/g, "")
      )
      let month
      if (thisDay.getMonth() < 9) {
        month = "0" + (thisDay.getMonth() + 1)
      } else {
        month = (thisDay.getMonth() + 1)
      }
      dates.push(
        {
          dayTime: thisDay.getFullYear() + '/' + month + '/' + thisDay.getDate(),
          dayNum: thisDay.getDate(),
          week: thisDay.getDay(),
        }
      );
    }
    this.setData({
      days: dates
    })
  },
  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/freeLive/pages/liveShow/liveShow", null, 6);
    return {
      title: '免费直播课',
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
  //导航栏选择
  navChoose(event: any) {
    this.setData({
      navVal: event.currentTarget.dataset.val
    })
  },
  //时间选择
  dayChoose(event: any) {
    this.setData({
      dayVal: event.currentTarget.dataset.index
    })
  },
  //获取免费直播课
  async getFreeLive() {
    let that = this
    let freecourse = await courseClient.getLiveFreeDateGroupAsync(
      this.data.pageIndex,
      this.data.pageSize,
      undefined,
      undefined,
      undefined,
    );



    for (let i in freecourse) {
      for (let j in freecourse[i].courses) {
        let item = freecourse[i].courses[j]
        if (item.liveConfig) {
          await courseClient.getLiveType(item.liveConfig).then((res: any) => {
            if (res.data.msg == "success") {
              item.isState = res.data.data
              if (res.data.data == 1 || res.data.data == 2) {
                freecourse[i].hasLive = true
              } else {
                if (freecourse[i].hasLive != true) {
                  freecourse[i].hasLive = false
                }
              }
            }
          });
        } else {
          if (new Date(item.updateTime) > new Date()) {
            item.isState = 2;
            freecourse[i].hasLive = true
          } else {
            if (item.isLive) {
              item.isState = 1;
              freecourse[i].hasLive = true

            } else {
              if (freecourse[i].hasLive != true) {
                freecourse[i].hasLive = false
              }
              item.isState = 5

            }
          }
        }
      }
    }
    let days = this.data.days
    for (let d in days) {
      for (let i in freecourse) {
        if ((new Date(days[d].dayTime).toLocaleDateString()) == (new Date(freecourse[i].day).toLocaleDateString())) {
          for (let j in freecourse[i].courses) {
            let item = freecourse[i].courses[j]
            if (item.isState == 2 || item.isState == 1) {
              days[d].ifHas = true
            } else {
              if (!days[d].ifHas) {
                days[d].ifHas = false
              }
            }
          }
        } else {
          if (!days[d].ifHas) {
            days[d].ifHas = false
          }
        }
      }
    }
    this.setData({
      days: days
    })
    this.setData({
      freecourse: that.data.freecourse.concat(freecourse)
    })


  },
  /*** 页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    wx.showLoading({
      title: "加载中..."
    })
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.getFreeLive()
    wx.hideLoading()
  },
  //页面跳转
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },

})