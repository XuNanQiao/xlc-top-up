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
// ??????????????????
var app = getApp();
var WebClient_1 = require("../../utils/WebClient");
var InviteCodeManager_1 = require("../../utils/InviteCodeManager");
var ExamPackageClient_1 = require("../../utils/ExamPackageClient");
var UserClient_1 = require("../../utils/UserClient");
var webClient = new WebClient_1.WebClient();
var userClient = new UserClient_1.UserClient();
var examClient = new ExamPackageClient_1.ExamPackageClient();
Page({
    data: {
        onKcItem: wx.getStorageSync("onKcItem"),
        userInfo: userClient.getInfo(),
        kcId: 0,
        kcList: {},
        page: 1,
        examPackageList: {},
        MaxPage: 0,
        kcIsShow: false, ifOnShow: false,
        chapterList: [],
        option: null
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setData({
                            option: option
                        });
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                            return [2 /*return*/];
                        }
                        if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
                            InviteCodeManager_1.inviteCodeManager.TryStorageInviteCode(option.regCode);
                        }
                        return [4 /*yield*/, this.getKcList()];
                    case 1:
                        res = _a.sent();
                        this.setData({
                            kcList: res.data,
                        });
                        if (!this.data.onKcItem) {
                            this.setData({
                                onKcItem: this.data.kcList[0],
                                kcId: this.data.kcList[0].id
                            });
                            wx.setStorageSync("onKcItem", this.data.onKcItem);
                        }
                        else {
                            this.setData({
                                kcId: this.data.onKcItem.id
                            });
                        }
                        this.getChapterSection();
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
      * ??????????????????
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
      * ??????????????????
      */
    showKcList: function (e) {
        this.setData({
            kcIsShow: e.target.dataset.kcisshow
        });
    },
    /**
    * ????????????
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
                this.getChapterSection();
                wx.setStorageSync("onKcItem", e.target.dataset.kcitem);
                return [2 /*return*/];
            });
        });
    },
    /**
  * ????????????????????????????????????
  */
    getChapterSection: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log(this.data.kcId, "_---------this.data.kcId");
                examClient.getChapterSection(this.data.kcId).then(function (res) {
                    _this.setData({
                        chapterList: res.data
                    });
                });
                return [2 /*return*/];
            });
        });
    },
    onShow: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // ifOnShow:false,
                        this.setData({
                            userInfo: userClient.getInfo(),
                            onKcItem: wx.getStorageSync("onKcItem")
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
     * ??????????????????--??????????????????
     */
    onHide: function () {
        if (!this.data.userInfo) {
            this.setData({
                ifOnShow: true
            });
        }
    },
    /**
     * ??????????????????--??????????????????
     */
    onUnload: function () {
    },
    /**
     * ???????????????????????????????????????
     */
    onReachBottom: function () {
    },
    /**
     * ???????????????????????????
     */
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/pages/learning/index", null);
        return {
            title: "??????",
            path: path,
            success: function (res) {
                console.log("????????????");
                //?????????
                wx.showShareMenu({
                    // ???????????????????????????????????????              
                    withShareTicket: true
                });
                if (res.shareTickets) {
                    // ????????????????????????
                    wx.getShareInfo({
                        shareTicket: res.shareTickets[0],
                        success: function (res) {
                            res.errMsg; // ????????????
                            res.encryptedData; // ?????????????????? JSON ?????????openGId  ?????????????????????????????? ID???
                            res.iv; // ???????????????????????????
                        },
                        fail: function () { },
                        complete: function () { }
                    });
                }
            },
            fail: function (res) {
                // wx.showModal({ title: "????????????", content: "????????????????????????" });
                console.log("????????????");
            }
        };
    },
});
