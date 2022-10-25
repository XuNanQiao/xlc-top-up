"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
// 获取应用实例
var app = getApp();
var WebClient_1 = require("../../utils/WebClient");
var UserClient_1 = require("../../utils/UserClient");
var courseManager_1 = require("../../utils/courseManager");
var userClient = new UserClient_1.UserClient();
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
        client: new WebClient_1.WebClient(),
        FreeData: new courseManager_1.FreeLiveCourseManager(),
        poster: { width: 200, height: 100 },
        qrShow: false,
        canvasId: "default_PosterCanvasId",
        inviteList: {},
        TabCur: 0,
        url: "",
        modalName: null,
        link: "",
        codeImg: "",
        modalNameImg: null,
        live: {},
        num: "",
        time: {},
        BgImgUrl: [],
        filePath: null,
        type: null,
        ifOnShow: false,
        options: "",
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var BgImgUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                        }
                        this.setData({
                            options: option,
                            type: option.type
                        });
                        wx.showLoading({
                            title: "邀请卡生成中...",
                        });
                        BgImgUrl = [
                            {
                                imgUrl: "https://staticfile.xlcwx.com/userfiles/202003/20200313103307.jpg",
                                cardImg: "https://staticfile.xlcwx.com/userfiles/202003/20200313103307.jpg",
                                name: "公开课1",
                                invitaionScope: 6,
                            },
                            {
                                imgUrl: "https://staticfile.xlcwx.com/userfiles/202003/20200313172252.jpg",
                                cardImg: "https://staticfile.xlcwx.com/userfiles/202003/20200313172252.jpg",
                                name: "公开课2",
                                invitaionScope: 6,
                            },
                            {
                                imgUrl: "https://staticfile.xlcwx.com/userfiles/202003/20200313103353.jpg",
                                cardImg: "https://staticfile.xlcwx.com/userfiles/202003/20200313103353.jpg",
                                name: "公开课3",
                                invitaionScope: 6,
                            },
                        ];
                        this.setData({
                            BgImgUrl: BgImgUrl
                        });
                        return [4 /*yield*/, this.getInvitationCard(this.data.TabCur)];
                    case 1:
                        _a.sent();
                        setTimeout(function () {
                            wx.hideLoading();
                        }, 2000);
                        return [2 /*return*/];
                }
            });
        });
    },
    //复制路径
    onCopy: function () {
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
    tabSelect: function (e, item) {
        return __awaiter(this, void 0, void 0, function () {
            var haveImg, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        wx.showLoading({
                            title: "邀请卡生成中...",
                        });
                        this.setData({
                            TabCur: e,
                            haveImg: ""
                        });
                        _a = e;
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 1: return [3 /*break*/, 4];
                            case 2: return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 10];
                    case 1:
                        if (!(this.data.have0Img == "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getInvitationCard(0)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        haveImg = this.data.have0Img;
                        return [3 /*break*/, 10];
                    case 4:
                        if (!(this.data.have1Img == "")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getInvitationCard(1)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        haveImg = this.data.have1Img;
                        return [3 /*break*/, 10];
                    case 7:
                        if (!(this.data.have2Img == "")) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.getInvitationCard(2)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        haveImg = this.data.have2Img;
                        return [3 /*break*/, 10];
                    case 10:
                        this.setData({
                            haveImg: haveImg
                        });
                        wx.hideLoading();
                        return [2 /*return*/];
                }
            });
        });
    },
    //获取分享邀请卡
    getInvitationCard: function (val) {
        return __awaiter(this, void 0, void 0, function () {
            var submit;
            return __generator(this, function (_a) {
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                    return [2 /*return*/];
                }
                submit = {};
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
                                    text: "直播时间：" + this.data.live.updateTime,
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
                                    text: "直播时间：" + this.data.live.updateTime,
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
                                    text: "直播时间：" + this.data.live.updateTime,
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
                return [2 /*return*/];
            });
        });
    },
});
