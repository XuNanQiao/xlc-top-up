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
var courseClient_1 = require("../../utils/courseClient");
var InviteCodeManager_1 = require("../../utils/InviteCodeManager");
var MakeUpGroup_1 = require("../../utils/MakeUpGroup");
var makeUpGroup = new MakeUpGroup_1.MakeUpGroup();
var courseClient = new courseClient_1.CourseClient();
var webClient = new WebClient_1.WebClient();
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
        freecourse: [],
        activeList: [],
        VideosProfessionList: []
    },
    // 事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited;
            return __generator(this, function (_a) {
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
                this.getMultiple();
                this.getFreeLive();
                this.activeListIsPrice();
                this.VideosProfession();
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
    //获取免费直播课
    getFreeLive: function () {
        return __awaiter(this, void 0, void 0, function () {
            var freecourse, _loop_1, _a, _b, _i, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, courseClient.getFreeListAsync(0, 8, undefined, undefined, undefined)];
                    case 1:
                        freecourse = _c.sent();
                        _loop_1 = function (i) {
                            var item;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        item = freecourse.data[i];
                                        if (!item.liveConfig) return [3 /*break*/, 2];
                                        return [4 /*yield*/, courseClient.getLiveType(item.liveConfig).then(function (res) {
                                                if (res.data.msg == "success") {
                                                    item.isState = res.data.data;
                                                }
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        if (new Date(item.updateTime) > new Date()) {
                                            item.isState = 2;
                                        }
                                        else {
                                            if (item.isLive) {
                                                item.isState = 1;
                                            }
                                            else {
                                                item.isState = 5;
                                            }
                                        }
                                        _a.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        };
                        _a = [];
                        for (_b in freecourse.data)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        i = _a[_i];
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.setData({
                            freecourse: freecourse.data
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    //获取活动列表
    activeListIsPrice: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeUpGroup.getTopicListAsync(1, 3).then(function (res) {
                            _this.setData({
                                activeList: res
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    VideosProfession: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, courseClient.getVideosProfessionListAsync().then(function (res) {
                            _this.setData({
                                VideosProfessionList: res
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    //页面跳转
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
    /*** 用户点击右上角分享*/
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/pages/index/index", null);
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
