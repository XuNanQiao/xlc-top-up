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
var courseClient_1 = require("../../../utils/courseClient");
var stringHelper_1 = require("../../../utils/stringHelper");
var UserClient_1 = require("../../../utils/UserClient");
var ExamPackageClient_1 = require("../../../utils/ExamPackageClient");
var aliPlayerClient_1 = require("../../../utils/aliPlayerClient");
var courseManager_1 = require("../../../utils/courseManager");
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var courseManger = new courseManager_1.VipLiveCourseManager();
var aliPlayerClient = new aliPlayerClient_1.AliPlayerClient();
var userClient = new UserClient_1.UserClient();
var courseClient = new courseClient_1.CourseClient();
var examClient = new ExamPackageClient_1.ExamPackageClient();
Page({
    data: {
        userInfo: userClient.getInfo(),
        nav: ["课程概述", "课程列表"],
        course: null,
        TabCur: 1,
        scrollLeft: 0,
        usebg: true,
        clickID: 0,
        isSegment: false,
        hasthis: false,
        from: "",
        trainingCampId: null,
        ifOnShow: false,
        option: null,
        isLive: "",
        CouponsModal: "",
    },
    // 事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    getHomeWork: function (event) {
        if (!this.data.hasthis && this.data.course && this.data.course.price > 0) {
            wx.showToast({
                title: "尚未购买，请先去购买",
                icon: "none",
            });
            return;
        }
        var examId = event.currentTarget.dataset.id;
        examClient.getHomeWorkObj(examId).then(function (res) {
            if (res.data) {
                wx.navigateTo({
                    url: "/examPackage/pages/exam/CourseHomework/indexnew?examId=" +
                        examId +
                        "&courseType=1",
                });
                return;
            }
            else {
                wx.showToast({
                    title: "暂无课堂练习",
                    icon: "none",
                    image: "",
                    duration: 1500,
                    mask: false,
                });
                return;
            }
        });
    },
    onHide: function () {
        if (!this.data.userInfo) {
            this.setData({
                ifOnShow: true
            });
        }
    },
    onShow: function () {
        if (this.data.ifOnShow == true) {
            this.setData({
                userInfo: userClient.getInfo(),
            });
            app.reloadCurrent(this.data.option);
        }
        if (!this.data.userInfo) {
            userClient.checkLogin();
            return;
        }
    },
    clicked: function (event) {
        this.setData({
            clickID: event.currentTarget.dataset.id
        });
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited, liveId, invited;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //判断是否是赠送
                        if (option.invitedByUserId) {
                            invited = {
                                invitedByUserId: option.invitedByUserId,
                                invitedByType: option.invitedByType,
                                kcid: option.id
                            };
                            wx.setStorageSync("inviter", invited);
                        }
                        this.setData({
                            userInfo: userClient.getInfo(),
                            option: option,
                            isLive: option.isLive,
                            from: option.from,
                            trainingCampId: option.trainingCampId,
                            clickID: option.id
                        });
                        liveId = option.id;
                        return [4 /*yield*/, courseManger.getDataAsync(liveId).then(function (res) {
                                if (res.playbacks.length > 0) {
                                    var now = new Date();
                                    for (var _i = 0, _a = res.playbacks; _i < _a.length; _i++) {
                                        var item = _a[_i];
                                        if (now < new Date(item.startTime)) {
                                            item.liveState = "直播尚未开始";
                                        }
                                        else if (now > new Date(item.startTime) &&
                                            now < new Date(item.endTime)) {
                                            item.liveState = "正在直播";
                                        }
                                        else {
                                            if (item.other == null) {
                                                item.liveState = "回放生成中";
                                            }
                                            else {
                                                item.liveState = "观看重播";
                                            }
                                        }
                                    }
                                }
                                if (res.content != null) {
                                    res.content = stringHelper_1.ImgSizeLimit(res.content);
                                }
                                _this.setData({
                                    course: res
                                });
                            })];
                    case 1:
                        _a.sent();
                        if (!!this.data.userInfo) return [3 /*break*/, 2];
                        this.data.hasthis = false;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, courseClient.gethasItemAsync(2, option.id, this.data.userInfo.id).then(function (res) {
                            _this.setData({
                                hasthis: res
                            });
                        })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (this.data.course == null) {
                            wx.showModal({
                                title: "\u53D1\u751F\u9519\u8BEF",
                                content: "\u627E\u4E0D\u5230\u6B64\u8BFE\u7A0B",
                                showCancel: false,
                                success: function (res) {
                                    wx.navigateBack();
                                },
                            });
                            return [2 /*return*/];
                        }
                        wx.setNavigationBarTitle({
                            title: this.data.course.title,
                        });
                        if (option.invitedByUserId != undefined) {
                            invited = {
                                invitedByUserId: option.invitedByUserId,
                                invitedByType: option.invitedByType,
                                kcid: option.id,
                            };
                            wx.setStorageSync("inviter", invited);
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    //tab选择
    tabSelect: function (event) {
        this.setData({
            TabCur: event.currentTarget.dataset.index
        });
    },
    getUrl: function (liveConfig) {
        var isComma = liveConfig.indexOf("?") > 0;
        var result = "";
        if (isComma) {
            result = liveConfig + "&embed=video";
        }
        else {
            result = liveConfig + "?embed=video";
        }
        if (this.data.userInfo != null) {
            result +=
                "&emial=" +
                    this.data.userInfo.id +
                    "@juxuewx.com&name=" +
                    this.data.userInfo.nickName;
        }
        return result;
    },
    goto: function (line) {
        wx.navigateTo({
            url: line,
        });
    },
    //观看回放
    CheackIsSegment: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, courseId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event.currentTarget.dataset.itemid];
                    case 1:
                        itemId = _a.sent();
                        return [4 /*yield*/, event.currentTarget.dataset.courseid];
                    case 2:
                        courseId = _a.sent();
                        return [4 /*yield*/, aliPlayerClient.cheackIsSegment(itemId, "liveCourses").then(function (res) {
                                if (res.isSuccess == true) {
                                    wx.navigateTo({
                                        url: "/course/pages/playerCorldraw/playerCorldraw?id=" + itemId + "&liveid=" + courseId + "&from=" + _this.data.from + "&trainingCampId=" + _this.data.trainingCampId
                                    });
                                }
                                else {
                                    wx.navigateTo({
                                        url: "/course/pages/play/play?id=" + itemId + "&liveid=" + courseId + "&from=" + _this.data.from + "&trainingCampId=" + _this.data.trainingCampId
                                    });
                                }
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    CheackIsAudition: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, courseId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event.currentTarget.dataset.itemid];
                    case 1:
                        itemId = _a.sent();
                        return [4 /*yield*/, event.currentTarget.dataset.courseid];
                    case 2:
                        courseId = _a.sent();
                        wx.navigateTo({
                            url: "/course/pages/play/play?id=" + itemId + "&liveid=" + courseId + "&from=" + this.data.from + "&trainingCampId=" + this.data.trainingCampId
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    LiveGetUrl: function (liveConfig) {
        var isComma = liveConfig.indexOf("?") > 0;
        var result = "";
        if (this.data.userInfo) {
            if (isComma) {
                result =
                    liveConfig +
                        "&email=" +
                        this.data.userInfo.id +
                        "@xlcwx.com&name=" +
                        this.data.userInfo.nickName;
            }
            else {
                result =
                    liveConfig +
                        "?email=" +
                        this.data.userInfo.id +
                        "@xlcwx.com&name=" +
                        this.data.userInfo.nickName;
            }
        }
        return result;
    },
    CouponsModalClick: function () {
        this.setData({
            userInfo: userClient.getInfo()
        });
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
    /*** 用户点击右上角分享*/
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/course/pages/introduction/introduction", this.data.option.id, 2);
        return {
            title: this.data.course.title,
            path: path,
            imageUrl: this.data.course.img,
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
    goNext: function (line) {
        wx.navigateTo({
            url: line
        });
    }
});
