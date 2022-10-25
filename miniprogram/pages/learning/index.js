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
var InviteCodeManager_1 = require("../../utils/InviteCodeManager");
var UserClient_1 = require("../../utils/UserClient");
var userClient = new UserClient_1.UserClient();
var webClient = new WebClient_1.WebClient();
Page({
    data: {
        slides: [],
        userInfo: userClient.getInfo(),
        KaoDianNum: {},
        KaoDian: {},
        everDay: {},
        LiNian: {},
        MiYa: {},
        KaoQian: {},
        CourseTraking: 0
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited;
            return __generator(this, function (_a) {
                this.setData({ userInfo: userClient.getInfo(), });
                wx.showLoading({
                    title: "加载中..."
                });
                //判断是否是赠送
                if (option.invitedByUserId) {
                    invited = {
                        invitedByUserId: option.invitedByUserId,
                        invitedByType: option.invitedByType,
                        kcid: option.id
                    };
                    wx.setStorageSync("inviter", invited);
                }
                if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
                    InviteCodeManager_1.inviteCodeManager.TryStorageInviteCode(option.regCode);
                }
                this.getMultiple();
                this.getKaoDian(263);
                this.getCourseTrakingTime();
                wx.hideLoading();
                return [2 /*return*/];
            });
        });
    },
    //获取幻灯片
    getMultiple: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, webClient.sendAsync({
                            url: "/api/Slides/multiple/" + 'TopUp.index.MainSlide',
                        }).then(function (res) {
                            _this.setData({
                                slides: res.data
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    //获取考点数量
    getKaoDian: function (zyId) {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo, requetion, KaoDianNum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) return [3 /*break*/, 3];
                        userInfo = this.data.userInfo;
                        return [4 /*yield*/, webClient.sendAsync({
                                url: "/api/ShiJuan/exam-statistics",
                                data: {
                                    uId: this.data.userInfo.id,
                                    zyId: Number(zyId)
                                }
                            })];
                    case 1:
                        requetion = _a.sent();
                        return [4 /*yield*/, requetion.data];
                    case 2:
                        KaoDianNum = _a.sent();
                        KaoDianNum.completeDegree = (KaoDianNum.completeDegree * 100).toFixed(2);
                        this.setData({
                            KaoDianNum: KaoDianNum
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    getCourseTrakingTime: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) return [3 /*break*/, 2];
                        return [4 /*yield*/, webClient.sendAsync({
                                url: "/api/LearnStatistics/courseTrackMinutes?kind=3&uId=" + this.data.userInfo.id
                            })];
                    case 1:
                        res = _a.sent();
                        this.setData({
                            CourseTraking: res.data.toFixed(0)
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (!this.data.userInfo) {
            userClient.navigatorToLoginPage();
            return;
        }
        this.getKaoDian(263);
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
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/pages/learning/index", null);
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
                        success: function (res) {
                            res.errMsg; // 错误信息
                            res.encryptedData; // 解密后为一个 JSON 结构（openGId  群对当前小程序的唯一 ID）
                            res.iv; // 加密算法的初始向量
                        },
                        fail: function () { },
                        complete: function () { }
                    });
                }
            },
            fail: function (res) {
                // wx.showModal({ title: "转发失败", content: "转法时发生了错误" });
                console.log("转发失败");
            }
        };
    },
});
