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
var courseClient_1 = require("../../../utils/courseClient");
var courseClient = new courseClient_1.CourseClient();
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
Page({
    data: {
        freecourse: [],
        pageIndex: 0,
        pageSize: 25,
        navVal: 0,
        dayVal: 0,
        days: [],
        weeks: ["???", "???", "???", "???", "???", "???", "???"]
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({
                            title: "?????????..."
                        });
                        //?????????????????????
                        if (option.invitedByUserId) {
                            invited = {
                                invitedByUserId: option.invitedByUserId,
                                invitedByType: option.invitedByType,
                                kcid: option.id
                            };
                            wx.setStorageSync("inviter", invited);
                        }
                        return [4 /*yield*/, this.getDates()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getFreeLive()];
                    case 2:
                        _a.sent();
                        wx.hideLoading();
                        return [2 /*return*/];
                }
            });
        });
    },
    //????????????????????????
    getDates: function () {
        return __awaiter(this, void 0, void 0, function () {
            var new_Date, timesStamp, currenDay, dates, i, thisDay, month;
            return __generator(this, function (_a) {
                new_Date = new Date();
                timesStamp = new_Date.getTime();
                currenDay = new_Date.getDay();
                dates = [];
                for (i = 0; i < 7; i++) {
                    thisDay = new Date(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i))
                        .toLocaleDateString()
                        .replace(/[??????]/g, "-")
                        .replace(/[????????????]/g, ""));
                    month = void 0;
                    if (thisDay.getMonth() < 9) {
                        month = "0" + (thisDay.getMonth() + 1);
                    }
                    else {
                        month = (thisDay.getMonth() + 1);
                    }
                    dates.push({
                        dayTime: thisDay.getFullYear() + '/' + month + '/' + thisDay.getDate(),
                        dayNum: thisDay.getDate(),
                        week: thisDay.getDay(),
                    });
                }
                this.setData({
                    days: dates
                });
                return [2 /*return*/];
            });
        });
    },
    /*** ???????????????????????????*/
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/freeLive/pages/liveShow/liveShow", null, 6);
        return {
            title: '???????????????',
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
    //???????????????
    navChoose: function (event) {
        this.setData({
            navVal: event.currentTarget.dataset.val
        });
    },
    //????????????
    dayChoose: function (event) {
        this.setData({
            dayVal: event.currentTarget.dataset.index
        });
    },
    //?????????????????????
    getFreeLive: function () {
        return __awaiter(this, void 0, void 0, function () {
            var that, freecourse, _loop_1, _a, _b, _i, i, days, d, i, j, item;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, courseClient.getLiveFreeDateGroupAsync(this.data.pageIndex, this.data.pageSize, undefined, undefined, undefined)];
                    case 1:
                        freecourse = _c.sent();
                        _loop_1 = function (i) {
                            var _loop_2, _a, _b, _i, j;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _loop_2 = function (j) {
                                            var item;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        item = freecourse[i].courses[j];
                                                        if (!item.liveConfig) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, courseClient.getLiveType(item.liveConfig).then(function (res) {
                                                                if (res.data.msg == "success") {
                                                                    item.isState = res.data.data;
                                                                    if (res.data.data == 1 || res.data.data == 2) {
                                                                        freecourse[i].hasLive = true;
                                                                    }
                                                                    else {
                                                                        if (freecourse[i].hasLive != true) {
                                                                            freecourse[i].hasLive = false;
                                                                        }
                                                                    }
                                                                }
                                                            })];
                                                    case 1:
                                                        _a.sent();
                                                        return [3 /*break*/, 3];
                                                    case 2:
                                                        if (new Date(item.updateTime) > new Date()) {
                                                            item.isState = 2;
                                                            freecourse[i].hasLive = true;
                                                        }
                                                        else {
                                                            if (item.isLive) {
                                                                item.isState = 1;
                                                                freecourse[i].hasLive = true;
                                                            }
                                                            else {
                                                                if (freecourse[i].hasLive != true) {
                                                                    freecourse[i].hasLive = false;
                                                                }
                                                                item.isState = 5;
                                                            }
                                                        }
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _a = [];
                                        for (_b in freecourse[i].courses)
                                            _a.push(_b);
                                        _i = 0;
                                        _c.label = 1;
                                    case 1:
                                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                                        j = _a[_i];
                                        return [5 /*yield**/, _loop_2(j)];
                                    case 2:
                                        _c.sent();
                                        _c.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        _a = [];
                        for (_b in freecourse)
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
                        days = this.data.days;
                        for (d in days) {
                            for (i in freecourse) {
                                if ((new Date(days[d].dayTime).toLocaleDateString()) == (new Date(freecourse[i].day).toLocaleDateString())) {
                                    for (j in freecourse[i].courses) {
                                        item = freecourse[i].courses[j];
                                        if (item.isState == 2 || item.isState == 1) {
                                            days[d].ifHas = true;
                                        }
                                        else {
                                            if (!days[d].ifHas) {
                                                days[d].ifHas = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (!days[d].ifHas) {
                                        days[d].ifHas = false;
                                    }
                                }
                            }
                        }
                        this.setData({
                            days: days
                        });
                        this.setData({
                            freecourse: that.data.freecourse.concat(freecourse)
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    /*** ???????????????????????????????????????*/
    onReachBottom: function () {
        wx.showLoading({
            title: "?????????..."
        });
        this.setData({
            pageIndex: this.data.pageIndex + 1
        });
        this.getFreeLive();
        wx.hideLoading();
    },
    //????????????
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
});
