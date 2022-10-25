const app = getApp()
import { setting } from "../../../setting";
import { MakeUpGroup } from "../../../utils/MakeUpGroup";
let makeUpGroup = new MakeUpGroup()
import { inviteCodeManager } from "../../../utils/InviteCodeManager";
import { olderType } from "../../../enum/older";

Page({
  data: {
    tapChoose: 0,
    page: 1,
    PageSize: 10,
    pinTuanList: [] as MakeUpGroupDto[],
    helpingHandList: [] as PowerAssistDTO[],
    itemType: olderType
  },
  onLoad: async function (option: any) {
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
    this.GetMakeGroupList()
    this.GetMarketAssistList()
    wx.hideLoading()
  },
  tapClick(event: any) {
    this.setData({
      tapChoose: event.currentTarget.dataset.val
    })
    wx.hideLoading()
  },
  /**
 * 用户点击右上角分享
 */
  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/market/pages/index/index", null);
    return {
      title: "特惠购",
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
  //获取拼团列表
  async GetMakeGroupList() {
    let res = await makeUpGroup.GetMakeGroupList(this.data.page, this.data.PageSize);

    for (let i in res) {
      let item = res[i];
      let groupeEndTime = await this.timeDown(item);
      let time = await app.countDown(
        groupeEndTime,
        new Date()
      );
      let starthour = (await time.days) * 24 + time.hours;
      let startminute = await time.minutes;
      let startsecond = await time.seconds;

      setInterval((success: any) => {
        if (startsecond > 0) {
          startsecond--;
        } else if (startminute > 0) {
          startminute--;
          startsecond = 59;
        } else if (starthour > 0) {
          starthour--;
          startminute = 59;
          startsecond = 59;
        }
        item.endTimeDown = [starthour, startminute, startsecond]
        this.setData({
          pinTuanList: res
        })
      }, 1000);
      item.endTimeDown = [starthour, startminute, startsecond]

    }
    this.setData({
      pinTuanList: this.data.pinTuanList.concat(...res)
    })
  },
  // 拼团结束时间
  async timeDown(item: any) {
    let groupeEndTime;
    let times = await app.countDown(item.endTime, item.recordEndTime);
    if (item.recordEndTime == "0001-01-01T00:00:00+00:00") {
      groupeEndTime = item.endTime;
    } else {
      if (times.Dvalue > 0) {
        groupeEndTime = item.recordEndTime;
      } else {
        groupeEndTime = item.endTime;
      }
    }
    return groupeEndTime;
  },
  //获取助力列表
  async GetMarketAssistList() {
    let res = await makeUpGroup.GetPowerAssistDTO();
    this.setData({
      helpingHandList: res
    })

  },
  //跳转网校拼团
  goGroupBooking(event: any) {
    wx.navigateToMiniProgram({
      appId: setting.navigateToAppID,
      path: '/market/groupBooking/index?id='+event.currentTarget.dataset.id,
      success(res) {
        // 打开成功
        console.log("scuseee");

      }
    })
  },
  //跳转网校助力
  goHelpingHand(event: any) {
    wx.navigateToMiniProgram({
      appId: setting.navigateToAppID,
      path: '/market/helpingHand/index?recordId='+event.currentTarget.dataset.id,
      success(res) {
        console.log("打开成功");
      }
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    this.GetMakeGroupList()
  },
})