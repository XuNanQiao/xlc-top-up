// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { CourseClient } from "../../utils/courseClient";
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { MakeUpGroup } from "../../utils/MakeUpGroup";
let makeUpGroup = new MakeUpGroup()
let courseClient = new CourseClient()
let webClient = new WebClient();
Page({
  data: {
    indexList: [{
      url: "/freeLive/pages/liveShow/liveShow",
      img: "https://staticfile.xlcwx.com/Top-up-MiniApp/home/indexList1.png",
      text: "公开课"
    }, {
      url: "/course/pages/index/index",
      img: "https://staticfile.xlcwx.com/Top-up-MiniApp/home/indexList2.png",
      text: "优选课"
    }, {
      url: "/market/pages/index/index",
      img: "https://staticfile.xlcwx.com/Top-up-MiniApp/home/indexList3.png",
      text: "特惠购"
    }],
    examList: [{
      url: "/questionBank/DailyTraining/index",
      title: " 每日一练",
      remarks: " 每日练习提高",
      icon: "https://staticfile.xlcwx.com/Top-up-MiniApp/home/examList1.png"
    }, {
      url: "/questionBank/testingSites/index",
      title: "考点练习",
      remarks: "直击考试考点",
      icon: "https://staticfile.xlcwx.com/Top-up-MiniApp/home/examList2.png"
    }, {
      url: "/questionBank/ChapterExam/index",
      title: "章节练习",
      remarks: "章节定时复习",
      icon: "https://staticfile.xlcwx.com/Top-up-MiniApp/home/examList3.png"
    }, {
      url: "/questionBank/MockTest/index",
      title: "模考估分",
      remarks: "模考提高考试成绩",
      icon: "https://staticfile.xlcwx.com/Top-up-MiniApp/home/examList4.png"
    }],
    slides: [],
    freecourse: [] as CourseListDto[],
    activeList: [] as InteractActivityListDto[],
    VideosProfessionList: []
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
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
    this.getMultiple()
    this.getFreeLive()
    this.activeListIsPrice()
    this.VideosProfession()
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
  //获取免费直播课
  async getFreeLive() {
    let freecourse = await courseClient.getFreeListAsync(
      0,
      8,
      undefined,
      undefined,
      undefined,
    );
    for (let i in freecourse.data) {
      let item = freecourse.data[i]
      if (item.liveConfig) {
        await courseClient.getLiveType(item.liveConfig).then((res: any) => {
          if (res.data.msg == "success") {
            item.isState = res.data.data
          }
        });
      } else {
        if (new Date(item.updateTime) > new Date()) {
          item.isState = 2;
        } else {
          if (item.isLive) {
            item.isState = 1;

          } else {
            item.isState = 5

          }
        }
      }
    }
    this.setData({
      freecourse: freecourse.data
    })

  },
  //获取活动列表
  async activeListIsPrice() {
    await makeUpGroup.getTopicListAsync(
      1,
      3
    ).then(res => {
      this.setData({
        activeList: res
      })
    });
  },
  async VideosProfession() {
    await courseClient.getVideosProfessionListAsync().then(res => {
      this.setData({
        VideosProfessionList: res
      })
    })
  },
  //页面跳转
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },
  /*** 用户点击右上角分享*/
  onShareAppMessage: function () {
    let path = inviteCodeManager.CreatePath("/pages/index/index", null);
    return {
      title: "赢在专升本",
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
