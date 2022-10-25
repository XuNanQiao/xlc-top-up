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
var UserClient_1 = require("../../../utils/UserClient");
var Video_1 = require("../../../utils/Video");
var courseClient_1 = require("../../../utils/courseClient");
var courseClient = new courseClient_1.CourseClient();
var courseManager_1 = require("../../../utils/courseManager");
var courseManger = new courseManager_1.VipVideoCourseManager();
var stringHelper_1 = require("../../../utils/stringHelper");
var aliPlayerClient_1 = require("../../../utils/aliPlayerClient");
var aliPlayerClient = new aliPlayerClient_1.AliPlayerClient();
var video = new Video_1.Video();
var userClient = new UserClient_1.UserClient();
var WebClient_1 = require("../../../utils/WebClient");
var webClient = new WebClient_1.WebClient();
var QuestionClient_1 = require("../../../utils/QuestionClient");
var trackingClient_1 = require("../../../utils/trackingClient");
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
Page({
    data: {
        userInfo: userClient.getInfo(),
        title: "Hello",
        barTabCur: 0,
        course: null,
        pageIndex: 0,
        pageSize: 999,
        questionClient: new QuestionClient_1.QuestionClient(),
        commentList: [],
        videoId: 0,
        playback: null,
        playAuth: "",
        videoSegmentList: [],
        player: {},
        vId: "",
        liveInde: 0,
        height: "calc(100vh - 44px - var(--status-bar-height) - 600rpx)",
        videoStartTime: 0,
        vHallcontextTime: 0,
        currentResourse: "",
        videoContext: "",
        showMain: false,
        ispaly: true,
        showPlayRate: false,
        vHallcontext: "",
        isscreenChange: true,
        playRateList: [0.5, 0.8, 1, 1.25, 1.5, 2],
        currentTime: "0",
        duration: "0",
        playRateVal: 1,
        ifonShow: false,
        tracker: null,
        playbackId: 0,
        chapters: {},
        from: "",
        option: null
    },
    onReady: function () {
        this.setData({
            videoContext: wx.createVideoContext("videoPlayer")
        });
    },
    onShow: function () {
        if (this.data.ifonShow) {
            // app.reloadCurrent(this.data.option);
        }
        if (this.data.tracker != null) {
            this.data.tracker.connect();
        }
        // this.trackerConfig();
    },
    onUnload: function () {
        if (this.data.tracker != null) {
            this.data.tracker.pagesConnect(true);
        }
        if (!this.data.userInfo) {
            return;
        }
        var time;
        this.data.ifonShow = true;
        time = this.data.vHallcontextTime;
        video.postViewingHistory(this.data.userInfo.id, this.data.videoId, this.data.playbackId, time);
    },
    onHide: function () {
        if (this.data.tracker != null) {
            this.data.tracker.pagesConnect(true);
        }
        if (!this.data.userInfo) {
            return;
        }
        var time;
        this.data.ifonShow = true;
        time = this.data.vHallcontextTime;
        video.postViewingHistory(this.data.userInfo.id, this.data.videoId, this.data.playbackId, time);
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
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                            return [2 /*return*/];
                        }
                        this.setData({
                            userInfo: userClient.getInfo(),
                            vHallcontext: wx.createVideoContext("videoPlayer", this),
                            videoId: Number(option.video),
                            playbackId: Number(option.id),
                            from: option.from,
                            option: option
                        });
                        videoId = Number(option.video);
                        return [4 /*yield*/, courseManger.getDataAsync(videoId).then(function (res) {
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
                        return [4 /*yield*/, courseClient.getVideocourseAsync(Number(option.video), true).then(function (playback) {
                                _this.setData({
                                    playback: playback,
                                    currentResourse: playback.trialVideoConfig
                                    // currentResourse: playback.aliVideoUrl
                                });
                                wx.setNavigationBarTitle({
                                    title: playback.title,
                                });
                            })];
                    case 2:
                        _a.sent();
                        that = this;
                        this.data.course.videoGroups.forEach(function (g) {
                            g.videos.forEach(function (c) {
                                if (c.id == option.id) {
                                    that.setData({
                                        url: c.videoConfig,
                                        uhide: g.id,
                                    });
                                }
                            });
                        });
                        if (option.id) {
                            this.tracker = new trackingClient_1.VideoCourseTrackingClient(videoId, parseInt(option.id));
                            this.trackerConfig();
                        }
                        wx.setNavigationBarTitle({
                            title: this.data.course.title,
                        });
                        if (this.data.course.content != null) {
                            this.data.course.content = stringHelper_1.ImgSizeLimit(this.data.course.content);
                        }
                        return [4 /*yield*/, this.getVideoSegment(this.data.playbackId)];
                    case 3:
                        _a.sent();
                        this.getVideoCourseVideo(option.id);
                        video
                            .getViewingHdistory(this.data.userInfo.id, this.data.videoId, this.data.playbackId)
                            .then(function (res) {
                            if (res.tracks) {
                                _this.setData({
                                    videoStartTime: res.tracks
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    trackerConfig: function () {
        if (this.data.tracker != null) {
            this.data.tracker.connect();
        }
    },
    //播放进度变化时触发
    playTimeUpdate: function (e) {
        var that = this;
        this.setData({
            vHallcontextTime: e.detail.currentTime
        });
        var currentTime = e.detail.currentTime;
        for (var i = 0; i < that.data.videoSegmentList.length; i++) {
            if (i == 0) {
                if (currentTime < that.data.videoSegmentList[1].progressMarkersObj.offset) {
                    that.setData({
                        liveInde: i
                    });
                    break;
                }
            }
            else if (i < that.data.videoSegmentList.length - 1) {
                if (currentTime > that.data.videoSegmentList[i].progressMarkersObj.offset &&
                    currentTime < that.data.videoSegmentList[i + 1].progressMarkersObj.offset) {
                    that.setData({
                        liveInde: i
                    });
                    break;
                }
            }
            else {
                if (currentTime > that.data.videoSegmentList[i].progressMarkersObj.offset) {
                    that.setData({
                        liveInde: i
                    });
                    break;
                }
            }
        }
        var startH, endH, startM, endM;
        var start = parseInt(e.detail.currentTime);
        var end = parseInt(e.detail.duration);
        if ((start / 60) < 10) {
            startH = "0" + parseInt(String(start / 60));
        }
        else {
            startH = parseInt(String(start / 60));
        }
        if (start % 60 < 10) {
            startM = "0" + parseInt(String(start % 60));
        }
        else {
            startM = parseInt(String(start % 60));
        }
        if ((end / 60) < 10) {
            endH = "0" + parseInt(String(end / 60));
        }
        else {
            endH = parseInt(String(end / 60));
        }
        if (end % 60 < 10) {
            endM = "0" + parseInt(String(end % 60));
        }
        else {
            endM = parseInt(String(end % 60));
        }
        /* 播放进度变化时触发, 直播时不会调用此函数 */
        this.setData({
            currentTime: startH + ":" + startM,
            duration: endH + ":" + endM
        });
    },
    //显示播放控件
    mainShow: function () {
        if (this.data.showPlayRate != true) {
            this.setData({
                showMain: !this.data.showMain
            });
        }
        else {
            this.setData({
                showPlayRate: false
            });
        }
    },
    //暂停
    bindPause: function () {
        this.setData({
            ispaly: false
        });
        this.data.vHallcontext.pause();
    },
    //播放
    bindPlay: function () {
        this.data.vHallcontext.play();
        this.setData({
            ispaly: true
        });
    },
    //显示倍速播放
    changePlayRate: function () {
        this.setData({
            showPlayRate: true,
            showMain: false,
        });
    },
    //倍速播放
    selectPlayRate: function (event) {
        this.data.vHallcontext.playbackRate(event.currentTarget.dataset.type);
        this.setData({
            showPlayRate: false,
            showMain: false,
            playRateVal: event.currentTarget.dataset.type
        });
    },
    //退出全屏
    bindExitFullScreen: function () {
        this.data.vHallcontext.exitFullScreen();
        this.setData({
            isscreenChange: true
        });
    },
    //全屏
    bindRequestFullScreen: function () {
        this.data.vHallcontext.requestFullScreen();
        this.setData({
            isscreenChange: false
        });
    },
    barSelect: function (event) {
        this.setData({
            barTabCur: event.currentTarget.dataset.index
        });
    },
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
    //获取视频列表
    getVideoSegment: function (itemId) {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, aliPlayerClient
                                .getVideoSegmentList(this.data.pageIndex, this.data.pageSize, itemId, "videoCourses")
                                .then(function (res) {
                                for (var i = 0; i < res.data.length; i++) {
                                    var progressMarkers = JSON.parse("" + res.data[i].progressMarkers);
                                    res.data[i]["progressMarkersObj"] = progressMarkers;
                                    if (res.data[i].progressMarkersObj.offset < 60) {
                                        res.data[i].progressMarkersObj["offsetTime"] = "0'" + res.data[i].progressMarkersObj.offset;
                                    }
                                    else {
                                        res.data[i].progressMarkersObj["offsetTime"] = Math.floor(res.data[i].progressMarkersObj.offset / 60) + "'" + res.data[i].progressMarkersObj.offset % 60;
                                    }
                                }
                                that.setData({
                                    videoSegmentList: that.data.videoSegmentList.concat(res.data),
                                });
                                that.setData({
                                    vId: that.data.videoSegmentList[0].vId
                                });
                                that.getVideoPlayAuth(that.data.videoSegmentList[0].vId);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    //获取播放凭证
    getVideoPlayAuth: function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, aliPlayerClient.getVideoPlayAuth(id).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (res.isSuccess == false) {
                                        wx.showToast({
                                            title: "视频不存在",
                                            icon: "none",
                                        });
                                    }
                                    else {
                                        this.setData({
                                            playAuth: res.error
                                        });
                                    }
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    //点击切换打点视频
    click: function (event) {
        var time = event.currentTarget.dataset.time, index = event.currentTarget.dataset.index;
        this.setData({
            liveInde: index
        });
        this.data.videoContext.seek(time);
    },
    //获取小节数据
    getVideoCourseVideo: function (id) {
        var _this = this;
        webClient
            .sendAsync({
            url: "/api/Course/videoCourseVideo/" + id,
        })
            .then(function (res) {
            _this.setData({
                chapters: res.data
            });
        });
    },
    /*** 用户点击右上角分享*/
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/pages/index/index", this.data.playbackId, 1);
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
});
