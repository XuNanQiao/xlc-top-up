// index.ts
// 获取应用实例
const app = getApp()
import { MineClient } from "../../utils/mineClient";
import { UserClient } from "../../utils/UserClient"
import { inviteCodeManager } from "../../utils/InviteCodeManager";
import { WebClient } from "../../utils/WebClient";
let mineClient = new MineClient();
let userClient = new UserClient();
let webClient = new WebClient();
Page({
  data: {
    page: 0,
    pageSize: 100,
    userInfo: userClient.getInfo(),
    TabCur: 0,
    ifOpen: true,
    examList: [
      {
        order: [
          {
            question: "报考条件是什么？",
            answer: "应届专科毕业生须通过毕业高校的综合素质测评获得学校推荐资格，或通过报考高校的专业综合能力测试获得考生自荐资格"
          },
          {
            question: "报考资格获得方式？",
            answer: "应届专科毕业生可通过高校推荐或考生自荐的方式获得报考资格，并选择与本人专科所学专业相同或相近的专业（限一个）报考。（一）高校推荐。符合下列条件之一的学生，可获得高校推荐资格，经生源高校公示无异议后可以报考。1.在校期间的综合素质测评成绩排名不低于同年级、同专业的前40%。同专业使用不同人才培养方案的，可按培养方案分类排序。2.参加省级以上职业院校技能大赛或省师范类高校学生从业技能大赛获三等奖以上的学生。由学生向生源高校提交申请和证明材料，生源高校负责审定。（二）考生自荐。未获得高校推荐资格的学生，可以向意向报考专升本招生高校进行自荐，通过招生高校的专业综合能力测试后可以获得报考该校的资格"
          }, {
            question: "可以报名考试几次？",
            answer: "专升本相当于第二次高考，可见其重要性。统招的专升本只能考一次，只有大三一次机会，以应届生身份报考"
          }
        ]
      },
    ],
    curriculumList: [
      {
        order: [
          {
            question: "“专升本”考试科目为何？",
            answer: "山东省专升本入学考试共4门，英语（政治）、计算机、大学语文、高等数学（I.II.III）"
          },
          {
            question: "统招专升本需要购买培训课程吗？",
            answer: "根据自己的学习情况选择，新里程网校开设精品专升本在线课程，帮助您提高通过率！"
          }
        ]
      },
    ],
    questionVal: 0,
    sendVal: '',
    mineFeedbackList: [] as FeedbackDto[],
    option: null as any,
    ifOnShow: false
  },
  onLoad: async function (option) {
    this.setData({
      option: option,
      userInfo: userClient.getInfo(),
    })
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
    if (!this.data.userInfo) {
      userClient.checkLogin();
    }
    this.getMineFeedback()

    wx.hideLoading()
  },
  openClick() {
    this.setData({
      ifOpen: !this.data.ifOpen
    })
  },
  //获取我的反馈
  async getMineFeedback() {
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return
    }
    webClient.sendAsync({
      method: 'GET',
      url: `/wangxiao/feedback/selectUserPageList?feedUserid=${this.data.userInfo.id}&type=2`
    }).then((res: any)=>{
        this.setData({
        mineFeedbackList: [...this.data.mineFeedbackList, ...res.data.data]
      })
      console.log(this.data.mineFeedbackList)
      if (res.length > 3) {
        this.setData({
          ifOpen: false
        })
      }
    })
    wx.pageScrollTo({
      selector: '#last',
      duration: 300,
      success: res => {
      },
      fail: res => {
      }
    })
    // await mineClient.mineFeedback(this.data.userInfo.id, this.data.page, this.data.pageSize).then(res => {
    //   this.setData({
    //     mineFeedbackList: [...this.data.mineFeedbackList, ...res]
    //   })
    //   if (res.length > 3) {
    //     this.setData({
    //       ifOpen: false
    //     })
    //   }
    // })
  },
  //选择切换
  tabSelect(event: any) {
    this.setData({
      TabCur: event.currentTarget.dataset.index,
      questionVal: 0
    })

  },
  //换一换点击事件
  switch() {
    if (this.data.TabCur == 0) {
      if (this.data.questionVal < this.data.examList.length - 1) {
        this.setData({
          questionVal: this.data.questionVal + 1
        })
      } else {
        this.setData({
          questionVal: 0
        })
      }
    }
    if (this.data.TabCur == 1) {
      if (this.data.questionVal < this.data.curriculumList.length - 1) {
        this.setData({
          questionVal: this.data.questionVal + 1
        })
      } else {
        this.setData({
          questionVal: 0
        })
      }
    }
  },
  //输入赋值
  setSearchVal(e: any) {
    this.setData({
      sendVal: e.detail.value
    });
  },
  //发送
  async sendMsgTap() {
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return
    }
    if (!this.data.sendVal) {
      return
    }
    webClient.sendAsync({
      method: 'POST',
      url: `/wangxiao/feedback/addFeedback?title=授课师资问题&content=${this.data.sendVal}&type=2&feedbackUser=${this.data.userInfo.nickName}&mobile=${this.data.userInfo.tel}&feedUserid=${this.data.userInfo.id}&forms=1&isZd=2`
    }).then((res: any)=>{
      if(res.data.code == 0){
        let data: any = {
          content: this.data.sendVal
        }
        this.setData({
          sendVal: '',
          mineFeedbackList: this.data.mineFeedbackList.concat(data)
        })

        this.getMineFeedback()

        wx.pageScrollTo({
          selector: '#last',
          duration: 300,
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none"
        })
      }
    })

    if (this.data.mineFeedbackList.length > 3) {
      this.setData({
        ifOpen: false
      })
    }
    // await mineClient.submitFeedback(this.data.userInfo.id, this.data.sendVal).then(res => {
    //   if (!res.isSuccess) {
    //     wx.showToast({
    //       title: res.errorMessage,
    //       icon: "none"
    //     })
    //   } else {
    //     let data: FeedbackDto[] = [{
    //       id: 1,
    //       typeId: 1,
    //       typeName: '',
    //       title: '',
    //       content: this.data.sendVal,
    //       addTime: new Date(),
    //       reply: null,
    //       replyName: '',
    //       replyTime: null,
    //       uid: null,
    //       userName: ''
    //     }]
    //     this.setData({
    //       sendVal: '',
    //       mineFeedbackList: this.data.mineFeedbackList.concat(data)
    //     })
    //     wx.pageScrollTo({
    //       selector: '#last',
    //       duration: 300,
    //     })
    //   }
    // })
    
  },
  //输入框聚焦
  bindfocus() {
    this.setData({
      ifOpen: false
    })
  },
  async thisQuestion(event: any) {
    let question, answer, index
    index = event.currentTarget.dataset.index
    if (this.data.TabCur == 0) {
      question = this.data.examList[this.data.questionVal].order[index].question,
        answer = this.data.examList[this.data.questionVal].order[index].answer
    }
    if (this.data.TabCur == 1) {
      question = this.data.curriculumList[this.data.questionVal].order[index].question,
        answer = this.data.curriculumList[this.data.questionVal].order[index].answer
    }

    let data: FeedbackDto[] = [{
      id: 1,
      typeId: 1,
      typeName: '',
      title: '',
      content: question,
      addTime: new Date(),
      reply: answer,
      replyName: '',
      replyTime: null,
      uid: null,
      userName: ''
    }]
    this.setData({
      mineFeedbackList: this.data.mineFeedbackList.concat(data)
    })
    wx.pageScrollTo({
      selector: '#last',
      duration: 300,
    })
    if (this.data.mineFeedbackList.length > 3) {
      this.setData({
        ifOpen: false
      })
    }
  },
  onHide() {
    if (!this.data.userInfo) {
      this.setData({
        ifOnShow: true
      })
    }
  },
  onShow() {
    this.setData({
      userInfo: userClient.getInfo(),
    })
    if (this.data.ifOnShow == true) {
      app.reloadCurrent(this.data.option);
    }
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
  //上拉事件
  onPullDownRefresh() {
    this.setData({
      page: this.data.page + 1
    })
    this.getMineFeedback()
  },
  goNext(event: any) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    });
  },
})
