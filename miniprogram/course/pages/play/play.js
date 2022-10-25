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
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var QuestionClient_1 = require("../../../utils/QuestionClient");
var trackingClient_1 = require("../../../utils/trackingClient");
var stringHelper_1 = require("../../../utils/stringHelper");
var courseManager_1 = require("../../../utils/courseManager");
var aliPlayerClient_1 = require("../../../utils/aliPlayerClient");
var aliPlayerClient = new aliPlayerClient_1.AliPlayerClient();
var courseManger = new courseManager_1.VipLiveCourseManager();
var questionClient = new QuestionClient_1.QuestionClient();
var userClient = new UserClient_1.UserClient();
var courseClient = new courseClient_1.CourseClient();
Page({
    data: {
        page: 0,
        userInfo: userClient.getInfo(),
        course: null,
        url: "",
        tracker: null,
        usebg: true,
        barTabCur: 0,
        liveId: 0,
        playbackId: 0,
        liveshow: {},
        commentCount: 0,
        essentialCommentCount: 0,
        defultPageIndex: 0,
        commentList: [],
        questionTreeNodeList: [],
        questionTree: [],
        hasExpandList: "",
        essentialCommentList: [],
        pageIndex: 0,
        question: "",
        videoDuration: 0,
        startTime: "",
        equipmentIp: null,
        clickID: 0,
        focus: false,
        ellipsis: true,
        from: "",
        trainingCampId: null,
        options: null,
        ifOnShow: false,
        isLive: "",
        option: null,
        answer: {
            answerId: -1,
            hierarchy: 0,
        },
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited, playback, now, content, that;
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
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                        }
                        this.setData({
                            option: option,
                            userInfo: userClient.getInfo(),
                            isLive: option.isLive,
                            liveId: Number(option.liveid),
                            playbackId: Number(option.id),
                            clickID: Number(option.id)
                        });
                        return [4 /*yield*/, questionClient.GetCourseQuestionCount(this.data.liveId, this.data.playbackId).then(function (res) {
                                _this.setData({
                                    commentCount: res
                                });
                            })];
                    case 1:
                        _a.sent();
                        this.getCommentList();
                        return [4 /*yield*/, courseClient.getPlaybackAsync(Number(option.liveid), Number(option.id))];
                    case 2:
                        playback = _a.sent();
                        if (!this.data.userInfo) return [3 /*break*/, 5];
                        if (!(playback.trialVideoConfig == null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, courseClient.gethasItemAsync(2, Number(option.liveid), this.data.userInfo.id)];
                    case 3:
                        if (!(_a.sent())) {
                            wx.showModal({
                                title: "无法播放",
                                content: "您尚未购买此课程",
                                showCancel: false,
                                complete: function () {
                                    wx.navigateBack();
                                },
                            });
                            return [2 /*return*/];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
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
                        return [2 /*return*/];
                    case 6:
                        this.setData({
                            videoDuration: playback.duration,
                            startTime: playback.startTime,
                        });
                        wx.setNavigationBarTitle({
                            title: playback.title,
                        });
                        now = new Date();
                        content = "";
                        if (new Date(playback.startTime) > now) {
                            content = "该直播尚未开始";
                        }
                        if (content != "") {
                            wx.showModal({
                                title: "无法播放",
                                content: "该直播尚未开始",
                                showCancel: false,
                                complete: function () {
                                    wx.navigateBack();
                                },
                            });
                        }
                        else {
                            if (playback.trialVideoConfig != null) {
                                this.setData({
                                    url: playback.trialVideoConfig
                                });
                            }
                            else {
                                this.setData({
                                    url: playback.other
                                });
                            }
                        }
                        return [4 /*yield*/, courseManger.getDataAsync(Number(option.liveid)).then(function (res) {
                                if (res.playbacks.length > 0) {
                                    var now_1 = new Date();
                                    for (var _i = 0, _a = res.playbacks; _i < _a.length; _i++) {
                                        var item = _a[_i];
                                        if (now_1 < new Date(item.startTime)) {
                                            item.liveState = "直播尚未开始";
                                        }
                                        else if (now_1 > new Date(item.startTime) &&
                                            now_1 < new Date(item.endTime)) {
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
                    case 7:
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
                        this.data.course.playbacks.forEach(function (p) {
                            if (p.id == Number(option.id)) {
                                if (p.trialVideoConfig != null) {
                                    that.setData({
                                        url: p.trialVideoConfig
                                    });
                                }
                                else {
                                    that.setData({
                                        url: p.other
                                    });
                                }
                                wx.setNavigationBarTitle({
                                    title: p.title,
                                });
                            }
                        });
                        this.setData({
                            tracker: new trackingClient_1.LiveCourseTrackingClient(Number(option.liveid), Number(option.id))
                        });
                        this.trackerConfig();
                        return [2 /*return*/];
                }
            });
        });
    },
    returnDate: function (e) {
        if (e != null) {
            wx.showToast({
                icon: "none",
                title: "想在下面输入框填写您的疑问，我们会尽快回复的。",
            });
            this.setData({
                answer: e,
                focus: true
            });
        }
    },
    More: function () {
        this.data.pageIndex = +1;
        this.getCommentList();
    },
    textareaVar: function (e) {
        this.setData({
            question: e.detail.value
        });
    },
    bindFormSubmit: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var question, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) {
                            return [2 /*return*/];
                        }
                        question = {
                            question: this.data.question,
                            courseId: this.data.liveId,
                            courseType: 1,
                            itemId: this.data.playbackId,
                            answerId: this.data.answer.answerId,
                            hierarchy: this.data.answer.hierarchy,
                            imgUrlList: [],
                            uId: this.data.userInfo.id,
                        };
                        return [4 /*yield*/, questionClient.submit(question)];
                    case 1:
                        result = _a.sent();
                        if (result.isSuccess) {
                            this.setData({
                                question: ''
                            });
                            wx.showToast({
                                icon: "none",
                                title: "老师已经收到你的疑问了，请耐心等待，我们会尽快回复的。",
                            });
                            this.setData({
                                answer: {
                                    answerId: -1,
                                    hierarchy: 0,
                                }
                            });
                        }
                        else {
                            wx.showToast({
                                icon: "none",
                                title: result.errorMessage,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    clicked: function (event) {
        this.setData({
            clickID: event.currentTarget.dataset.id
        });
    },
    getCommentList: function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, questionClient
                            .getCommentList(this.data.pageIndex, 10, this.data.liveId, 1, this.data.playbackId)
                            .then(function (res) {
                            _this.setData({
                                commentList: _this.data.commentList.concat(res.data)
                            });
                        })];
                    case 1:
                        _a.sent();
                        data = questionClient.translate2TreeNode(this.data.commentList);
                        this.setData({
                            questionTreeNodeList: data
                        });
                        this.checkFirstAnswerChild();
                        this.setData({
                            questionTree: this.data.questionTreeNodeList
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    checkFirstAnswerChild: function (quesId) {
        var _this = this;
        if (this.data.questionTreeNodeList != null &&
            this.data.questionTreeNodeList.length > 0) {
            if (quesId == null || quesId == undefined || quesId < 0) {
                this.data.questionTreeNodeList.map(function (ele) {
                    if (ele.type == 0 &&
                        ele.hierarchy <= 0 &&
                        ele.firstAnswerChildCount > 0) {
                        if (ele.showChildState == 0) {
                            ele.showChildState = 3;
                        }
                    }
                });
            }
            else {
                this.data.questionTreeNodeList.map(function (ele) {
                    if (ele.type == 0 &&
                        ele.hierarchy <= 0 &&
                        ele.firstAnswerChildCount > 0) {
                        var contain1 = _this.data.hasExpandList.indexOf(ele.id);
                        if (contain1 > -1) {
                            ele.showChildState = 2;
                        }
                        else {
                            ele.showChildState = 3;
                        }
                    }
                });
            }
        }
    },
    onShow: function () {
        this.setData({
            userInfo: userClient.getInfo(),
        });
        if (this.data.ifOnShow == true) {
            app.reloadCurrent(this.data.options);
        }
        if (!this.data.userInfo) {
            userClient.checkLogin();
            return;
        }
        if (this.data.tracker != null) {
            this.data.tracker.connect();
        }
    },
    trackerConfig: function () {
        if (this.data.tracker != null) {
            this.data.tracker.connect();
        }
    },
    onHide: function () {
        if (!this.data.userInfo) {
            this.setData({
                ifOnShow: true
            });
        }
        if (this.data.tracker != null) {
            this.data.tracker.pagesConnect(true);
        }
    },
    onUnload: function () {
        if (this.data.tracker != null) {
            this.data.tracker.pagesConnect(true);
        }
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
    barSelect: function (event) {
        this.setData({
            barTabCur: event.currentTarget.dataset.index
        });
        if (event.currentTarget.dataset.index == 1) {
            this.setData({
                commentList: []
            });
            this.getCommentList();
        }
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
    /**
      * 用户点击右上角分享
      */
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/course/pages/play/play", this.data.playbackId, 2);
        var title, imageUrl;
        if (!this.data.course) {
            title = "赢在专升本";
        }
        else {
            title = this.data.course.title;
            imageUrl = this.data.course.img;
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
});
