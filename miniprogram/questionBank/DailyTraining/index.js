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
var ExamPackageClient_1 = require("../../utils/ExamPackageClient");
var examPackageClient = new ExamPackageClient_1.ExamPackageClient();
var userClient = new UserClient_1.UserClient();
var webClient = new WebClient_1.WebClient();
Page({
    data: {
        kcId: 0,
        userInfo: userClient.getInfo(),
        kcIsShow: false,
        onKcItem: wx.getStorageSync("onKcItem"),
        kcList: {},
        myDailyPractice: {},
        dailyPracticeList: [],
        pageIndex: 0,
        MaxPage: 0,
        desc: true,
        ifOnShow: false,
        option: null
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("---------ghjghj");
                        this.setData({
                            option: option,
                            onKcItem: wx.getStorageSync("onKcItem"),
                            userInfo: userClient.getInfo()
                        });
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                            return [2 /*return*/];
                        }
                        if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
                            InviteCodeManager_1.inviteCodeManager.TryStorageInviteCode(option.regCode);
                        }
                        wx.setNavigationBarTitle({
                            title: '每日一练',
                        });
                        return [4 /*yield*/, this.getKcList()];
                    case 1:
                        res = _a.sent();
                        this.setData({
                            kcList: res.data,
                        });
                        if (!this.data.onKcItem) {
                            this.setData({
                                onKcItem: this.data.kcList[0]
                            });
                            wx.setStorageSync("onKcItem", this.data.onKcItem);
                        }
                        this.getDailyPracticeMineRecord();
                        this.getDailyPracticeMembers();
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
      * 获取课程列表
      */
    getKcList: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, webClient.sendAsync({
                        url: "/api/course/basic/Kechengs?kind=3",
                    })];
            });
        });
    },
    /**
      * 展示课程列表
      */
    showKcList: function (e) {
        this.setData({
            kcIsShow: e.target.dataset.kcisshow
        });
    },
    /**
    * 切换课程
    */
    chackKc: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setData({
                    onKcItem: e.target.dataset.kcitem,
                    kcIsShow: false,
                    kcId: e.target.dataset.kcitem.id,
                    examKeyPointList: [],
                    pageIndex: 0,
                    dailyPracticeList: []
                });
                wx.setStorageSync("onKcItem", e.target.dataset.kcitem);
                this.getDailyPracticeMineRecord();
                this.getDailyPracticeMembers();
                return [2 /*return*/];
            });
        });
    },
    //获取我的每日一练记录
    getDailyPracticeMineRecord: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) return [3 /*break*/, 2];
                        return [4 /*yield*/, examPackageClient.getDailyPracticeMineRecord(this.data.userInfo.id, this.data.onKcItem.id).then(function (res) {
                                if (res.isSuccess) {
                                    _this.data.myDailyPractice = res.data;
                                    _this.data.myDailyPractice.seconds = parseInt((res.data.seconds / 60).toString()) + "\u5206" + parseInt((res.data.seconds % 60).toString()) + "\u79D2";
                                    _this.data.myDailyPractice.rightRate = parseInt((_this.data.myDailyPractice.rightRate * 100).toString());
                                    _this.setData({
                                        myDailyPractice: _this.data.myDailyPractice
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    //获取每日一练测试成员
    getDailyPracticeMembers: function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.data.userInfo) return [3 /*break*/, 2];
                        return [4 /*yield*/, examPackageClient.getDailyPracticeMembers(this.data.pageIndex, 12, (_a = this.data.userInfo) === null || _a === void 0 ? void 0 : _a.id, this.data.desc, this.data.onKcItem.id).then(function (res) {
                                var _a;
                                if (_this.data.pageIndex == 0) {
                                    if (res.data.length > 0) {
                                        _this.data.dailyPracticeList = res.data;
                                        for (var i in _this.data.dailyPracticeList) {
                                            _this.data.dailyPracticeList[i].seconds = parseInt((_this.data.dailyPracticeList[i].seconds / 60).toString()) + "\u5206" + parseInt((_this.data.dailyPracticeList[i].seconds % 60).toString()) + "\u79D2";
                                        }
                                    }
                                }
                                else {
                                    (_a = _this.data.dailyPracticeList).push.apply(_a, res.data);
                                }
                                _this.setData({
                                    dailyPracticeList: _this.data.dailyPracticeList,
                                    MaxPage: res.maxPageNumber
                                });
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    //切换排序
    chackDesc: function (e) {
        this.data.desc = e.currentTarget.dataset.desc;
        this.setData({
            desc: this.data.desc,
            pageIndex: 0
        });
        this.getDailyPracticeMembers();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // ifOnShow:false,
                        this.setData({
                            userInfo: userClient.getInfo(),
                        });
                        return [4 /*yield*/, this.getKcList()];
                    case 1:
                        res = _a.sent();
                        this.setData({
                            kcList: res.data,
                        });
                        if (this.data.ifOnShow == true) {
                            app.reloadCurrent(this.data.option);
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        if (!this.data.userInfo) {
            this.setData({
                ifOnShow: true
            });
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
        this.setData({
            pageIndex: this.data.pageIndex + 1
        });
        if (this.data.pageIndex <= this.data.MaxPage) {
            this.getDailyPracticeMembers();
        }
        wx.stopPullDownRefresh();
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
