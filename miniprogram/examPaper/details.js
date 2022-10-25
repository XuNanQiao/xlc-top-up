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
var WebClient_1 = require("../utils/WebClient");
var UserClient_1 = require("../utils/UserClient");
var InviteCodeManager_1 = require("../utils/InviteCodeManager");
var ExamPackageClient_1 = require("../utils/ExamPackageClient");
var stringHelper_1 = require("../utils/stringHelper");
var examPackageClient = new ExamPackageClient_1.ExamPackageClient();
var webClient = new WebClient_1.WebClient();
var userClient = new UserClient_1.UserClient();
Page({
    data: {
        userInfo: userClient.getInfo(),
        id: "",
        examPackage: {},
        content: "",
        isShow: 1,
        hasthis: true,
        ifOnShow: false,
        option: null,
        CouponsModal: ""
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setData({
                            option: option,
                            userInfo: userClient.getInfo(),
                        });
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                            return [2 /*return*/];
                        }
                        if (option.id) {
                            this.data.id = option.id;
                            this.setData({
                                id: this.data.id
                            });
                        }
                        if (!!this.data.userInfo) return [3 /*break*/, 1];
                        this.setData({
                            hasthis: false
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, examPackageClient.gethasItemAsync(3, Number(option.id), this.data.userInfo.id).then(function (res) {
                            _this.setData({
                                hasthis: res
                            });
                        })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ;
                        if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
                            InviteCodeManager_1.inviteCodeManager.TryStorageInviteCode(option.regCode);
                        }
                        wx.setNavigationBarTitle({
                            title: "试卷详情",
                        });
                        this.getDetails();
                        return [2 /*return*/];
                }
            });
        });
    },
    getDetails: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, richtext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) return [3 /*break*/, 2];
                        return [4 /*yield*/, examPackageClient.getAppExamPackage(parseInt(this.data.id), this.data.userInfo.id)];
                    case 1:
                        result = _a.sent();
                        this.data.examPackage = result.data;
                        richtext = result.data.detail;
                        this.data.content = stringHelper_1.ImgSizeLimit(richtext);
                        this.setData({
                            examPackage: this.data.examPackage,
                            content: this.data.content
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    tabClick: function (e) {
        this.data.isShow = e.currentTarget.dataset.index;
        this.setData({
            isShow: this.data.isShow
        });
    },
    //页面跳转
    startZd: function (e) {
        var id = e.currentTarget.dataset.packageid;
        var examId = e.currentTarget.dataset.examid;
        var price = e.currentTarget.dataset.price;
        console.log(e);
        if (!this.data.hasthis && price > 0) {
            wx.showToast({
                title: "尚未购买",
                icon: "none"
            });
            return;
        }
        if (this.data.hasthis == true || price <= 0) {
            wx.navigateTo({
                url: "/examPaper/question/index?packageId=" + id + "&examId=" + examId
            });
        }
    },
    checkAnswer: function (e) {
        var id = e.currentTarget.dataset.packageid;
        var examId = e.currentTarget.dataset.examid;
        var price = e.currentTarget.dataset.price;
        if (this.data.hasthis != true && price > 0) {
            wx.showToast({
                title: "尚未购买",
                icon: "none"
            });
        }
        if (this.data.hasthis == true || price <= 0) {
            wx.navigateTo({
                url: "/examPaper/question/Answerkey?examId=" + examId + "&packageId=" + id
            });
        }
    },
    //购买
    order: function () {
        return __awaiter(this, void 0, void 0, function () {
            var storageKey;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                    return [2 /*return*/];
                }
                storageKey = "order" + new Date().getTime().toString();
                wx.setStorageSync(storageKey, [
                    { itemId: Number(this.data.id), itemType: 3 }
                ]);
                wx.navigateTo({
                    url: "/order/pages/index/index?storageKey=" + storageKey,
                    complete: function () {
                        _this.setData({
                            subFlag: false
                        });
                    }
                });
                return [2 /*return*/];
            });
        });
    },
    CouponsModalClick: function () {
        if (!this.data.userInfo) {
            userClient.checkLogin();
            return;
        }
        this.setData({
            CouponsModal: "CouponsModal"
        });
    },
    getCouponsModal: function (e) {
        this.setData({
            CouponsModal: e.detail.val
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setData({
                            userInfo: userClient.getInfo(),
                        });
                        if (!(this.data.ifOnShow == true)) return [3 /*break*/, 3];
                        app.reloadCurrent(this.data.option);
                        if (!!this.data.userInfo) return [3 /*break*/, 1];
                        this.setData({
                            hasthis: false
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, examPackageClient.gethasItemAsync(3, Number(this.data.option.id), this.data.userInfo.id).then(function (res) {
                            _this.setData({
                                hasthis: res
                            });
                        })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
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
