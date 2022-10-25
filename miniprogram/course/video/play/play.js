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
var UserClient_1 = require("../../../utils/UserClient");
var courseManager_1 = require("../../../utils/courseManager");
var ExamPackageClient_1 = require("../../../utils/ExamPackageClient");
var stringHelper_1 = require("../../../utils/stringHelper");
var aliPlayerClient_1 = require("../../../utils/aliPlayerClient");
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var aliPlayerClient = new aliPlayerClient_1.AliPlayerClient();
var trackingClient_1 = require("../../../utils/trackingClient");
var courseManger = new courseManager_1.VipVideoCourseManager();
var courseClient = new courseClient_1.CourseClient();
var examClient = new ExamPackageClient_1.ExamPackageClient();
var userClient = new UserClient_1.UserClient();
Page({
    data: {
        page: 0,
        userInfo: userClient.getInfo(),
        periods: [],
        course: null,
        url: "",
        uhide: 0,
        videoDuration: 0,
        usebg: true,
        equipmentIp: null,
        from: "",
        trainingCampId: null,
        tracker: null,
        periodCur: 0,
        mnContent: "",
        xfContent: "",
        ifOnShow: false,
        option: null,
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited, videoId, that;
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
                            from: option.from,
                            trainingCampId: option.trainingCampId,
                        });
                        videoId = Number(option.video);
                        return [4 /*yield*/, courseManger.getDataAsync(videoId).then(function (res) {
                                if (res.content != null) {
                                    res.content = stringHelper_1.ImgSizeLimit(res.content);
                                }
                                if (_this.data.userInfo) {
                                    if (!(courseClient.gethasItemAsync(_this.data.userInfo.id, 1, videoId)) && res.price > 0) {
                                        wx.showModal({
                                            title: "无法播放",
                                            content: "您尚未购买此课程",
                                            showCancel: false,
                                            complete: function () {
                                                wx.navigateBack();
                                            },
                                        });
                                        return;
                                    }
                                }
                                else {
                                    wx.showModal({
                                        title: "无法播放",
                                        content: "暂未登录，请先登录",
                                        success: function (res) {
                                            if (res.confirm) {
                                                userClient.checkLogin();
                                                return;
                                            }
                                            else if (res.cancel) {
                                                wx.navigateBack();
                                            }
                                        },
                                    });
                                    return;
                                }
                                _this.setData({
                                    course: res
                                });
                            })];
                    case 1:
                        _a.sent();
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
                        that = this;
                        this.data.course.videoGroups.forEach(function (g) {
                            g.videos.forEach(function (c) {
                                if (c.id == Number(option.id)) {
                                    that.setData({
                                        url: c.videoConfig,
                                        videoDuration: c.videoDuration,
                                        uhide: g.id
                                    });
                                }
                            });
                        });
                        wx.setNavigationBarTitle({
                            title: this.data.course.title,
                        });
                        this.data.tracker = new trackingClient_1.VideoCourseTrackingClient(videoId, Number(option.id));
                        this.setData({
                            tracker: this.data.tracker
                        });
                        this.trackerConfig();
                        return [2 /*return*/];
                }
            });
        });
    },
    onHide: function () {
        if (this.data.tracker != null) {
            this.data.tracker.connect();
        }
        if (!this.data.userInfo) {
            this.setData({
                ifOnShow: true
            });
        }
    },
    onShow: function () {
        if (this.data.tracker != null) {
            this.data.tracker.connect();
        }
        this.setData({
            userInfo: userClient.getInfo(),
        });
        if (this.data.ifOnShow == true) {
            app.reloadCurrent(this.data.option);
        }
    },
    onUnload: function () {
        if (this.data.tracker != null) {
            this.data.tracker.pagesConnect(true);
        }
    },
    trackerConfig: function () {
        if (this.data.tracker != null) {
            this.data.tracker.connect();
        }
    },
    //tab选择
    tabSelect: function (event) {
        this.setData({
            TabCur: event.currentTarget.dataset.index
        });
    },
    periodsSelect: function (index) {
        this.setData({
            periodCur: index
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
    openChapter: function (event) {
        var id = event.currentTarget.dataset.id;
        this.setData({
            uhide: this.data.uhide == id ? 0 : id
        });
        // this.uhide = this.uhide == id ? 0 : id;
    },
    play: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event.currentTarget.dataset.id];
                    case 1:
                        id = _a.sent();
                        return [4 /*yield*/, aliPlayerClient.cheackIsSegment(id, "videoCourses").then(function (res) {
                                if (res.isSuccess == true) {
                                    if (_this.data.course != null) {
                                        wx.navigateTo({
                                            url: "/course/video/playerCorldraw/playerCorldraw?id=" + id + "&video=" + _this.data.course.id + "&from=" + _this.data.from + "&trainingCampId=" + _this.data.trainingCampId
                                        });
                                    }
                                }
                                else {
                                    if (_this.data.course != null) {
                                        wx.navigateTo({
                                            url: "/course/video/play/play?id=" + id + "&video=" + _this.data.course.id + "&from=" + _this.data.from + "&trainingCampId=" + _this.data.trainingCampId
                                        });
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    //随堂联系
    getHomeWork: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var examId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event.currentTarget.dataset.examid];
                    case 1:
                        examId = _a.sent();
                        examClient.getVideoHomwork(examId).then(function (res) {
                            if (res.data) {
                                wx.navigateTo({
                                    url: "/examPackage/pages/exam/CourseHomework/indexnew?examId=" +
                                        examId +
                                        "&courseType=2",
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
                        return [2 /*return*/];
                }
            });
        });
    },
    // 随堂资料下载
    download: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event.currentTarget.dataset.id];
                    case 1:
                        id = _a.sent();
                        courseClient.dataDownload(id, 1, 2);
                        return [2 /*return*/];
                }
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
            CouponsModal: e
        });
    },
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
    /*** 页面上拉触底事件的处理函数*/
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        });
    },
    /*** 用户点击右上角分享*/
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/course/video/play/play", this.data.option.id, 1);
        var title, imageUrl;
        if (this.data.course) {
            title = this.data.course.title;
            imageUrl = this.data.course.img;
        }
        else {
            title = "赢在专升本";
            imageUrl = "";
        }
        return {
            title: title,
            path: path,
            imageUrl: imageUrl,
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
