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
var stringHelper_1 = require("../../../utils/stringHelper");
var trackingClient_1 = require("../../../utils/trackingClient");
var courseClient = new courseClient_1.CourseClient();
var courseManager_1 = require("../../../utils/courseManager");
var freeLiveCourseManager = new courseManager_1.FreeLiveCourseManager();
var UserClient_1 = require("../../../utils/UserClient");
var userClient = new UserClient_1.UserClient();
var WebClient_1 = require("../../../utils/WebClient");
var webClient = new WebClient_1.WebClient();
var md5 = require("../../../utils/md5.js");
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
Page({
    data: {
        userInfo: userClient.getInfo(),
        live: null,
        client: new courseManager_1.FreeLiveCourseManager(),
        tracker: null,
        focus: null,
        sharelistval: null,
        usebg: true,
        showimg: false,
        ifOnShow: false,
        navval: 0,
        startdata: 0,
        starthour: 0,
        startminute: 0,
        startsecond: 0,
        startyes: false,
        ifLiveShow: false,
        phoneno: "",
        code: "",
        code_s: "",
        code_msn: "",
        second: 0,
        ip: "",
        modalName: null,
        suppressLogin: false,
        hasthis: false,
        isPlay: false,
        setInter: null,
        equipmentIp: null,
        option: null,
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var that, time, invited, val;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setData({
                            option: option,
                            userInfo: userClient.getInfo(),
                        });
                        if (!(this.data.userInfo == null)) return [3 /*break*/, 1];
                        this.setData({
                            hasthis: false
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, courseClient.gethasItemAsync(6, option.id, this.data.userInfo.id).then(function (res) {
                            _this.setData({
                                hasthis: res
                            });
                        })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        that = this;
                        return [4 /*yield*/, freeLiveCourseManager.getDataAsync(option.id).then(function (live) {
                                if (!live) {
                                    return;
                                }
                                live.content = stringHelper_1.ImgSizeLimit(live.content);
                                _this.setData({
                                    live: live
                                });
                                if (live.liveConfig) {
                                    courseClient.getLiveType(live.liveConfig).then(function (res) {
                                        if (res.data.msg == "success") {
                                            _this.setData({
                                                ifLive: Number(res.data.data)
                                            });
                                        }
                                    });
                                }
                                else {
                                    if (new Date(live.updateTime) > new Date()) {
                                        _this.setData({
                                            ifLive: 2
                                        });
                                    }
                                    else {
                                        if (live.isLive) {
                                            _this.setData({
                                                ifLive: 1
                                            });
                                        }
                                        else {
                                            _this.setData({
                                                ifLive: 5
                                            });
                                        }
                                    }
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, app.countDown(this.data.live.updateTime)];
                    case 5:
                        time = _a.sent();
                        this.setData({
                            startdata: time.days,
                            starthour: time.hours,
                            startminute: time.minutes,
                            startsecond: time.seconds,
                        });
                        if (time.Dvalue > 0) {
                            this.setData({
                                startyes: true
                            });
                        }
                        else {
                            this.setData({
                                startyes: false
                            });
                        }
                        if (option.invitedByUserId != undefined) {
                            this.setData({
                                donorId: option.invitedByUserId,
                                donorType: option.invitedByType,
                            });
                            invited = {
                                invitedByUserId: option.invitedByUserId,
                                invitedByType: option.invitedByType,
                                kcid: option.id,
                            };
                            wx.setStorageSync("inviter", invited);
                        }
                        // this.sureToGive(option.id);
                        if (that.data.live == null) {
                            return [2 /*return*/];
                        }
                        if (!!that.data.userInfo) return [3 /*break*/, 6];
                        val = false;
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, courseClient.hasAppoint(that.data.live.id, that.data.userInfo.id)];
                    case 7:
                        val = _a.sent();
                        _a.label = 8;
                    case 8:
                        that.setData({
                            hasAppoint: val
                        });
                        wx.setNavigationBarTitle({ title: that.data.live.title });
                        if (that.data.live.price == null) {
                            that.data.live.price = 0;
                        }
                        if (this.data.userInfo == null) {
                            if (that.data.live.suppressLogin) {
                                this.setData({
                                    suppressLogin: true,
                                    isPlay: false,
                                    modalName: "Modal",
                                });
                            }
                            else {
                                this.setData({
                                    suppressLogin: false
                                });
                            }
                        }
                        else {
                            this.setData({
                                suppressLogin: true,
                                isPlay: true,
                            });
                        }
                        that.data.tracker = new trackingClient_1.FreeLiveCourseTrackingClient(option.id);
                        that.setData({
                            tracker: that.data.tracker
                        });
                        that.trackerConfig();
                        return [2 /*return*/];
                }
            });
        });
    },
    onShow: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.data.tracker != null) {
                    this.data.tracker.connect();
                }
                this.setData({
                    userInfo: userClient.getInfo(),
                });
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                    return [2 /*return*/];
                }
                if (this.data.ifOnShow == true) {
                    app.reloadCurrent(this.data.option);
                }
                return [2 /*return*/];
            });
        });
    },
    onHide: function () {
        if (this.data.tracker != null) {
            this.data.tracker.pagesConnect(true);
        }
        if (this.data.tracker != null) {
            this.data.tracker.disConnect();
        }
        this.setData({
            ifOnShow: true
        });
        clearInterval(this.data.setInter);
    },
    onUnload: function () {
        if (this.data.tracker != null) {
            this.data.tracker.pagesConnect(true);
        }
        if (this.data.tracker != null) {
            this.data.tracker.disConnect();
        }
        var timestamp = new Date().getTime().toString();
        var index = this.data.live.liveConfig.lastIndexOf("/");
        var id = this.data.live.liveConfig.substring(index + 1);
        var type = 0;
        if (this.data.live.isLive == false) {
            type = 2;
        }
        else if (this.data.live.isLive == true) {
            type = 1;
        }
        wx.hideLoading();
    },
    //播放记录
    trackerConfig: function () {
        if (this.data.tracker != null) {
            this.data.tracker.connect();
        }
    },
    //直播显示排行榜
    liveInvitation: function () {
        this.setData({
            ifLiveShow: !this.data.ifLiveShow
        });
    },
    //跳转邀请卡
    invite: function (type, kcid) {
        wx.navigateTo({
            url: "/mine/invite/index?type=" + type + "&kcId=" + kcid,
        });
    },
    //视频链接拼接
    getUrl: function (liveConfig) {
        var isComma = liveConfig.indexOf("?") > 0;
        var result = "";
        if (this.data.userInfo) {
            if (isComma) {
                result =
                    liveConfig +
                        "&embed=video&email=" +
                        this.data.userInfo.id +
                        "@xlcwx.com&name=" +
                        this.data.userInfo.nickName;
            }
            else {
                result =
                    liveConfig +
                        "?embed=video&email=" +
                        this.data.userInfo.id +
                        "@xlcwx.com&name=" +
                        this.data.userInfo.nickName;
            }
        }
        return result;
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
    //关注点击事件
    focusClick: function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, courseClient.getFreeVideocourseFocus(3, that.data.option.id).then(function (res) {
                                that.setData({
                                    focus: res
                                });
                            })];
                    case 1:
                        _a.sent();
                        if (!that.data.focus) {
                            wx.showToast({
                                title: "暂无二维码",
                                duration: 2000,
                                icon: "none",
                            });
                        }
                        else {
                            that.setData({
                                showimg: true
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    //关注点击事件
    focusClose: function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                that = this;
                that.setData({
                    showimg: false
                });
                return [2 /*return*/];
            });
        });
    },
    //点击切换选择项卡
    navchange: function (val) {
        this.setData({
            navval: val.currentTarget.dataset.val
        });
    },
    //倒计时结束
    endtime: function () {
        this.setData({
            startyes: false
        });
    },
    hideModal: function (e) {
        this.setData({
            modalName: null
        });
    },
    Code: function (e) {
        this.setData({
            code: e
        });
    },
    ValidCode: function (e) {
        this.setData({
            code_s: e.detail.value
        });
    },
    getcode: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.data.second > 0) {
                            return [2 /*return*/];
                        }
                        if (!/^[1]([3-9])[0-9]{9}$/.test(this.data.phoneno)) {
                            wx.showToast({
                                title: "手机号格式不正确",
                                icon: "none",
                            });
                            return [2 /*return*/];
                        }
                        if (this.data.code_s == "") {
                            wx.showToast({
                                title: "请输入图形验证码",
                                icon: "none",
                            });
                            return [2 /*return*/];
                        }
                        else if (this.data.code_s != this.data.code) {
                            wx.showToast({
                                title: "图形验证码不正确",
                                icon: "none",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, webClient.postFormAsync({
                                url: "/api/Sms/SendSmsCode",
                                header: {
                                    "No-Code": true,
                                },
                                data: {
                                    tel: this.data.phoneno,
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        if (result.data.isSuccess) {
                            this.data.second = 60;
                            this.timer();
                        }
                        else {
                            this.data.second = 0;
                            wx.showToast({
                                title: result.data.errorMessage,
                                duration: 2500,
                                icon: "none",
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    timer: function () {
        var _this = this;
        var tt = setInterval(function () {
            if (_this.data.second > 0) {
                _this.setData({
                    second: _this.data.second - 1
                });
            }
            else {
                clearInterval(tt);
            }
        }, 1000);
    },
    check: function () {
        if (!/^[1]([3-9])[0-9]{9}$/.test(this.data.phoneno)) {
            wx.showToast({
                title: "手机号格式不正确",
                icon: "none",
            });
            return false;
        }
        if (this.data.code_s == "") {
            wx.showToast({
                title: "请输入图形验证码",
                icon: "none",
            });
            return false;
        }
        if (this.data.code_msn == "") {
            wx.showToast({
                title: "请输入短信验证码",
                icon: "none",
            });
            return false;
        }
        return true;
    },
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/freeLive/pages/studio/studio", this.data.option.id, 6);
        return {
            title: this.data.live.title,
            path: path,
            imageUrl: this.data.live.img,
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
