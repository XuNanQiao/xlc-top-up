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
var app = getApp();
var setting_1 = require("../../../setting");
var MakeUpGroup_1 = require("../../../utils/MakeUpGroup");
var makeUpGroup = new MakeUpGroup_1.MakeUpGroup();
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var older_1 = require("../../../enum/older");
Page({
    data: {
        tapChoose: 0,
        page: 1,
        PageSize: 10,
        pinTuanList: [],
        helpingHandList: [],
        itemType: older_1.olderType
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
                this.GetMakeGroupList();
                this.GetMarketAssistList();
                wx.hideLoading();
                return [2 /*return*/];
            });
        });
    },
    tapClick: function (event) {
        this.setData({
            tapChoose: event.currentTarget.dataset.val
        });
        wx.hideLoading();
    },
    /**
   * 用户点击右上角分享
   */
    /*** 用户点击右上角分享*/
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/market/pages/index/index", null);
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
    //获取拼团列表
    GetMakeGroupList: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _loop_1, this_1, _a, _b, _i, i;
            var _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, makeUpGroup.GetMakeGroupList(this.data.page, this.data.PageSize)];
                    case 1:
                        res = _d.sent();
                        _loop_1 = function (i) {
                            var item, groupeEndTime, time, starthour, startminute, startsecond;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        item = res[i];
                                        return [4 /*yield*/, this_1.timeDown(item)];
                                    case 1:
                                        groupeEndTime = _a.sent();
                                        return [4 /*yield*/, app.countDown(groupeEndTime, new Date())];
                                    case 2:
                                        time = _a.sent();
                                        return [4 /*yield*/, time.days];
                                    case 3:
                                        starthour = (_a.sent()) * 24 + time.hours;
                                        return [4 /*yield*/, time.minutes];
                                    case 4:
                                        startminute = _a.sent();
                                        return [4 /*yield*/, time.seconds];
                                    case 5:
                                        startsecond = _a.sent();
                                        setInterval(function (success) {
                                            if (startsecond > 0) {
                                                startsecond--;
                                            }
                                            else if (startminute > 0) {
                                                startminute--;
                                                startsecond = 59;
                                            }
                                            else if (starthour > 0) {
                                                starthour--;
                                                startminute = 59;
                                                startsecond = 59;
                                            }
                                            item.endTimeDown = [starthour, startminute, startsecond];
                                            _this.setData({
                                                pinTuanList: res
                                            });
                                        }, 1000);
                                        item.endTimeDown = [starthour, startminute, startsecond];
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = [];
                        for (_b in res)
                            _a.push(_b);
                        _i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        i = _a[_i];
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.setData({
                            pinTuanList: (_c = this.data.pinTuanList).concat.apply(_c, res)
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    // 拼团结束时间
    timeDown: function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var groupeEndTime, times;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app.countDown(item.endTime, item.recordEndTime)];
                    case 1:
                        times = _a.sent();
                        if (item.recordEndTime == "0001-01-01T00:00:00+00:00") {
                            groupeEndTime = item.endTime;
                        }
                        else {
                            if (times.Dvalue > 0) {
                                groupeEndTime = item.recordEndTime;
                            }
                            else {
                                groupeEndTime = item.endTime;
                            }
                        }
                        return [2 /*return*/, groupeEndTime];
                }
            });
        });
    },
    //获取助力列表
    GetMarketAssistList: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, makeUpGroup.GetPowerAssistDTO()];
                    case 1:
                        res = _a.sent();
                        this.setData({
                            helpingHandList: res
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    //跳转网校拼团
    goGroupBooking: function (event) {
        wx.navigateToMiniProgram({
            appId: setting_1.setting.navigateToAppID,
            path: '/market/groupBooking/index?id=' + event.currentTarget.dataset.id,
            success: function (res) {
                // 打开成功
                console.log("scuseee");
            }
        });
    },
    //跳转网校助力
    goHelpingHand: function (event) {
        wx.navigateToMiniProgram({
            appId: setting_1.setting.navigateToAppID,
            path: '/market/helpingHand/index?recordId=' + event.currentTarget.dataset.id,
            success: function (res) {
                console.log("打开成功");
            }
        });
    },
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        });
        this.GetMakeGroupList();
    },
});
