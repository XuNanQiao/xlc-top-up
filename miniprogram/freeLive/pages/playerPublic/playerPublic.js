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
var courseClient = new courseClient_1.CourseClient();
var courseManager_1 = require("../../../utils/courseManager");
var freeLiveCourseManager = new courseManager_1.FreeLiveCourseManager();
var UserClient_1 = require("../../../utils/UserClient");
var userClient = new UserClient_1.UserClient();
var WebClient_1 = require("../../../utils/WebClient");
var webClient = new WebClient_1.WebClient();
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
Page({
    data: {
        live: null,
        userInfo: userClient.getInfo(),
        currentTab: 0,
        hasAppoint: false,
        is: new Date(),
        num: 0,
        tracker: null,
        hasthis: false,
        subFlag: false,
        usebg: true,
        suppressLogin: false,
        phoneno: "",
        code: "",
        code_s: "",
        code_msn: "",
        second: 0,
        needVerify: false,
        isPlay: false,
        modalName: "",
        modalNameImg: "",
        donorId: 0,
        donorType: null,
        sureToGiveVal: false,
        ifOnShow: false,
        ifLive: 0,
        option: null,
        CouponsModal: "",
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited, that, invited, val;
            var _this = this;
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
                        this.setData({
                            option: option
                        });
                        if (!!this.data.userInfo) return [3 /*break*/, 1];
                        this.setData({
                            hasthis: false
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, courseClient.gethasItemAsync(6, Number(option.id), this.data.userInfo.id).then(function (res) {
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
                        if (that.data.live == null) {
                            return [2 /*return*/];
                        }
                        if (!!that.data.userInfo) return [3 /*break*/, 5];
                        val = false;
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, courseClient.hasAppoint(that.data.live.id, that.data.userInfo.id)];
                    case 6:
                        // ??????????????????????????????
                        val = _a.sent();
                        _a.label = 7;
                    case 7:
                        that.setData({
                            hasAppoint: val
                        });
                        wx.setNavigationBarTitle({ title: that.data.live.title });
                        if (that.data.live.price == null) {
                            that.data.live.price = 0;
                        }
                        if (this.data.userInfo == null) {
                            if (that.data.live.suppressLogin) {
                                this.data.suppressLogin = true;
                                this.data.isPlay = false;
                                this.data.modalName = "Modal";
                            }
                            else {
                                this.data.suppressLogin = false;
                            }
                        }
                        else {
                            this.data.suppressLogin = true;
                            this.data.isPlay = true;
                        }
                        wx.hideLoading();
                        return [2 /*return*/];
                }
            });
        });
    },
    onShow: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setData({
                    userInfo: userClient.getInfo(),
                });
                return [2 /*return*/];
            });
        });
    },
    onHide: function () {
        this.setData({
            ifOnShow: true
        });
    },
    onUnload: function () {
    },
    //??????????????????
    appiont: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.data.subFlag) {
                            return [2 /*return*/];
                        }
                        this.setData({
                            subFlag: true
                        });
                        this.data.num++;
                        if (this.data.num > 1) {
                            return [2 /*return*/];
                        }
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                            return [2 /*return*/];
                        }
                        if (this.data.live == null) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, courseClient.tryAppointMsgAsync(this.data.live.id, this.data.userInfo.id)];
                    case 1:
                        if (_a.sent()) {
                            wx.showToast({
                                title: "\u9884\u7EA6\u6210\u529F",
                            });
                            this.setData({
                                subFlag: false,
                                hasAppoint: true
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    orderClick: function (event) {
        var itemType = 6, itemId = event.currentTarget.dataset.id;
        this.order(itemId, itemType);
    },
    order: function (itemId, itemType, from) {
        return __awaiter(this, void 0, void 0, function () {
            var storageKey;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                            return [2 /*return*/];
                        }
                        this.setData({
                            subFlag: true
                        });
                        if (!(itemType == 6)) return [3 /*break*/, 2];
                        return [4 /*yield*/, courseClient.tryAppointMsgAsync(itemId, this.data.userInfo.id)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        storageKey = "order" + new Date().getTime().toString();
                        if (this.data.donorType == 12) {
                            wx.setStorageSync(storageKey, [
                                {
                                    itemId: itemId,
                                    itemType: itemType,
                                    donorType: 1,
                                    donorId: this.data.donorId,
                                    from: "extension",
                                },
                            ]);
                        }
                        else {
                            wx.setStorageSync(storageKey, [
                                { itemId: itemId, itemType: itemType, from: from },
                            ]);
                        }
                        wx.navigateTo({
                            url: "/order/pages/index/index?storageKey=" + storageKey,
                            complete: function () {
                                _this.setData({
                                    subFlag: false
                                });
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    invite: function (type, kcid) {
        wx.navigateTo({
            url: "/components/invite/index?type=" + type + "&kcId=" + kcid,
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
    changeShowPannel: function (tabIndex) {
        this.setData({
            currentTab: tabIndex
        });
    },
    Code: function (e) {
        this.setData({ code: e, });
    },
    ValidCode: function (e) {
        this.setData({
            code_s: e.detail.value
        });
    },
    hideModalImg: function (e) {
        this.setData({
            modalNameImg: null
        });
    },
    hideModal: function (e) {
        this.setData({
            modalNameImg: null
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
                                title: "????????????????????????",
                                icon: "none",
                            });
                            return [2 /*return*/];
                        }
                        if (this.data.code_s == "") {
                            wx.showToast({
                                title: "????????????????????????",
                                icon: "none",
                            });
                            return [2 /*return*/];
                        }
                        else if (this.data.code_s != this.data.code) {
                            wx.showToast({
                                title: "????????????????????????",
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
    setverify: function () {
        this.data.needVerify = true;
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
    countdown: function () {
        if (this.data.second == 0) {
            return "???????????????";
        }
        else {
            if (this.data.second < 10) {
                return "????????????0" + this.data.second;
            }
            else {
                return "????????????" + this.data.second;
            }
        }
    },
    check: function () {
        if (!/^[1]([3-9])[0-9]{9}$/.test(this.data.phoneno)) {
            wx.showToast({
                title: "????????????????????????",
                icon: "none",
            });
            return false;
        }
        if (this.data.code_s == "") {
            wx.showToast({
                title: "????????????????????????",
                icon: "none",
            });
            return false;
        }
        if (this.data.code_msn == "") {
            wx.showToast({
                title: "????????????????????????",
                icon: "none",
            });
            return false;
        }
        return true;
    },
    bindLogin: function () {
        return __awaiter(this, void 0, void 0, function () {
            var User, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        User = {};
                        User.CourseId = this.data.live.id;
                        User.Tel = this.data.phoneno;
                        User.CourseTitle = this.data.live.title;
                        User.CourseUrl = this.data.live.liveConfig;
                        User.CourseType = this.data.live.courseType;
                        if (!this.check()) return [3 /*break*/, 2];
                        return [4 /*yield*/, webClient.postFormAsync({
                                url: "/api/Account/SavePotentialUser",
                                data: {
                                    Tel: this.data.phoneno,
                                    CourseId: this.data.live.id,
                                    CourseTitle: this.data.live.title,
                                    CourseUrl: this.data.live.liveConfig,
                                    CourseType: this.data.live.courseType,
                                    phoneCode: this.data.code_msn,
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        if (result.data.isSuccess) {
                            wx.showToast({
                                title: "???????????????????????????",
                            });
                            this.setData({
                                suppressLogin: true,
                                isPlay: true
                            });
                        }
                        else {
                            wx.showToast({
                                title: result.data.errorMessage,
                                duration: 2500,
                                icon: "none",
                            });
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
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
        // this.$forceUpdate();
    },
    getCouponsModal: function (e) {
        this.setData({
            CouponsModal: e
        });
    },
    //????????????
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/freeLive/pages/playerPublic/playerPublic", this.data.option.id, 6);
        return {
            title: this.data.live.title,
            path: path,
            imageUrl: this.data.live.img,
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
