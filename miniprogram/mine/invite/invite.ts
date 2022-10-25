// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../utils/WebClient";
import { UserClient } from "../../utils/UserClient"
import {
  FreeLiveCourseManager,
  VipLiveCourseManager,
  FreeVideoCourseManager,
} from "../../utils/courseManager";
let userClient = new UserClient();
Page({
  data: {
    userInfo: userClient.getInfo(),
    title: "",
    thumbnail: "",
    haveImg: "",
    have0Img: "",
    have2Img: "",
    have1Img: "",
    have4Img: "",
    client: new WebClient(),
    FreeData: new FreeLiveCourseManager(),
    poster: { width: 200, height: 100 },
    qrShow: false,
    canvasId: "default_PosterCanvasId",
    inviteList: {} as any,
    TabCur: 0,
    url: "",
    modalName: null as any,
    link: "",
    codeImg: "",
    modalNameImg: null as any,
    live: {} as any,
    num: "",
    time: {} as any,
    BgImgUrl: [] as any,
    filePath: null as any,
    type: null as any,
    ifOnShow: false,
    options: "" as any,

  },
  onLoad: async function (option) {
    if (!this.data.userInfo) {
      userClient.checkLogin();
    }
    this.setData({
      options: option,
      type: option.type
    })
    wx.showLoading({
      title: "邀请卡生成中...",
    });
    let BgImgUrl = [
      {
        imgUrl:
          "https://staticfile.xlcwx.com/userfiles/202003/20200313103307.jpg",
        cardImg:
          "https://staticfile.xlcwx.com/userfiles/202003/20200313103307.jpg",
        name: "公开课1",
        invitaionScope: 6,
      },
      {
        imgUrl:
          "https://staticfile.xlcwx.com/userfiles/202003/20200313172252.jpg",
        cardImg:
          "https://staticfile.xlcwx.com/userfiles/202003/20200313172252.jpg",
        name: "公开课2",
        invitaionScope: 6,
      },
      {
        imgUrl:
          "https://staticfile.xlcwx.com/userfiles/202003/20200313103353.jpg",
        cardImg:
          "https://staticfile.xlcwx.com/userfiles/202003/20200313103353.jpg",
        name: "公开课3",
        invitaionScope: 6,
      },
    ];
    this.setData({
      BgImgUrl: BgImgUrl
    })
    await this.getInvitationCard(this.data.TabCur);
    setTimeout(function () {
      wx.hideLoading();
    }, 2000);
  },
  //复制路径
  onCopy() {
    wx.setClipboardData({
      data: this.data.link,
      success: function () {
        wx.showToast({
          title: "复制链接成功",
          duration: 2000,
        });
      },
    });
  },
  //背景在选择
  async tabSelect(e, item) {
    wx.showLoading({
      title: "邀请卡生成中...",
    });
    this.setData({
      TabCur: e,
      haveImg: ""
    })
    let haveImg
    switch (e) {

      case 0:
        if (this.data.have0Img == "") {
          await this.getInvitationCard(0);
        }
        haveImg = this.data.have0Img;
        break;
      case 1:
        if (this.data.have1Img == "") {
          await this.getInvitationCard(1);
        }
        haveImg = this.data.have1Img;
        break;
      case 2:
        if (this.data.have2Img == "") {
          await this.getInvitationCard(2);
        }
        haveImg = this.data.have2Img;
        break;
    }
    this.setData({
      haveImg: haveImg
    })
    wx.hideLoading();
  },

  //获取分享邀请卡
  async getInvitationCard(val: any) {
    if (!this.data.userInfo) {
      userClient.checkLogin();
      return
    }
    let submit = {};
    switch (val) {
      case 0:
        submit = {
          bgImgUrl: this.data.BgImgUrl[0].cardImg,
          bgWidth: 492,
          bgHeight: 880,
          qrLink: this.data.link,
          qrIcon: "",
          qrWidth: 100,
          qrHeight: 100,
          qrXAlign: 1,
          qrXOffset: 0,
          qrYAlign: 0,
          qrYOffset: 680,
          images: [
            {
              imgUrl: this.data.userInfo.uPic,
              width: 100,
              height: 100,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 120,
              borderRadius: 50,
              opacity: 1,
            },
            {
              imgUrl: this.data.thumbnail,
              width: 326,
              height: 217,
              xAlign: 1,
              xOffset: 0,
              yAlign: 1,
              yOffset: 120,
              borderRadius: 1,
              opacity: 1,
            },
          ],
          texts: [
            {
              text: this.data.userInfo.nickName,
              fontSize: 17,
              colorHex: "#575048",
              opacity: 1,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 220,
              wrapWidth: 150,
              isBold: false,
              isItalic: false,
            },
            {
              text: this.data.title,
              fontSize: 29,
              colorHex: "#be2601",
              opacity: 1,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 270,
              wrapWidth: 320,
              isBold: true,
              isItalic: false,
            },
            {
              text:
                "直播时间：" + this.data.live.updateTime,
              fontSize: 17,
              colorHex: "#575048",
              opacity: 1,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 400,
              wrapWidth: 250,
              isBold: false,
              isItalic: false,
            },
            {
              text: "来自-新里程网校",
              fontSize: 17,
              colorHex: "#575048",
              opacity: 1,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 425,
              wrapWidth: 150,
              isBold: false,
              isItalic: false,
            },
          ],
        };
        break;
      case 1:
        submit = {
          bgImgUrl: this.data.BgImgUrl[1].cardImg,
          bgWidth: 492,
          bgHeight: 880,
          qrLink: this.data.link,
          qrIcon: "",
          qrWidth: 90,
          qrHeight: 90,
          qrXAlign: 0,
          qrXOffset: 40,
          qrYAlign: 1,
          qrYOffset: 120,
          images: [
            {
              imgUrl: this.data.userInfo.uPic,
              width: 100,
              height: 100,
              xAlign: 0,
              xOffset: 47,
              yAlign: 1,
              yOffset: 320,
              borderRadius: 50,
              opacity: 1,
            },
          ],
          texts: [
            {
              text: this.data.userInfo.nickName,
              fontSize: 17,
              // backgroundColor: "#091372",
              colorHex: "#091372",
              opacity: 1,
              xAlign: 2,
              xOffset: -70,
              yAlign: 1,
              yOffset: 280,
              wrapWidth: 150,
              isBold: false,
              isItalic: false,
            },
            {
              text: this.data.title,
              fontSize: 29,
              colorHex: "#101394",
              opacity: 1,
              xAlign: 0,
              xOffset: 50,
              yAlign: 0,
              yOffset: 157,
              wrapWidth: 336,
              isBold: true,
              isItalic: false,
            },
            {
              text:
                "直播时间：" + this.data.live.updateTime,
              fontSize: 17,
              colorHex: "#ce0b2d",
              opacity: 1,
              xAlign: 0,
              xOffset: 50,
              yAlign: 0,
              yOffset: 380,
              wrapWidth: 250,
              isBold: false,
              isItalic: false,
            },
            {
              text: "来自-新里程网校",
              fontSize: 17,
              colorHex: "#ce0b2d",
              opacity: 1,
              xAlign: 0,
              xOffset: 50,
              yAlign: 0,
              yOffset: 410,
              wrapWidth: 150,
              isBold: false,
              isItalic: false,
            },
          ],
        };
        break;
      case 2:
        submit = {
          bgImgUrl: this.data.BgImgUrl[2].cardImg,
          bgWidth: 492,
          bgHeight: 880,
          qrLink: this.data.link,
          qrIcon: "",
          qrWidth: 105,
          qrHeight: 105,
          qrXAlign: 0,
          qrXOffset: 140,
          qrYAlign: 1,
          qrYOffset: 290,
          images: [
            {
              imgUrl: this.data.userInfo.uPic,
              width: 100,
              height: 100,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 188,
              borderRadius: 50,
              opacity: 1,
            },
          ],
          texts: [
            {
              text: this.data.userInfo.nickName,
              fontSize: 17,
              // backgroundColor: "#091372",
              colorHex: "#575048",
              opacity: 1,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 320,
              wrapWidth: 150,
              isBold: false,
              isItalic: false,
            },
            {
              text: this.data.title,
              fontSize: 29,
              colorHex: "#101394",
              opacity: 1,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 387,
              wrapWidth: 336,
              isBold: true,
              isItalic: false,
            },
            {
              text:
                "直播时间：" + this.data.live.updateTime,
              fontSize: 17,
              colorHex: "#575048",
              opacity: 1,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 600,
              wrapWidth: 250,
              isBold: false,
              isItalic: false,
            },
            {
              text: "来自-新里程网校",
              fontSize: 17,
              colorHex: "#575048",
              opacity: 1,
              xAlign: 1,
              xOffset: 0,
              yAlign: 0,
              yOffset: 630,
              wrapWidth: 150,
              isBold: false,
              isItalic: false,
            },
          ],
        };
        break;
    }
  }, 

})
