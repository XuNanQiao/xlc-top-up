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
var UserClient_1 = require("../../utils/UserClient");
var userClient = new UserClient_1.UserClient();
var webClient = new WebClient_1.WebClient();
Page({
    data: {
        userInfo: {},
        wxUserInfo: {},
        hasBind: true,
        bindPhone: false,
        phone: "",
        openId: "",
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited;
            return __generator(this, function (_a) {
                //?????????????????????
                if (option.invitedByUserId != undefined) {
                    invited = {
                        invitedByUserId: option.invitedByUserId,
                        invitedByType: option.invitedByType,
                        kcid: option.id
                    };
                    wx.setStorageSync("inviter", invited);
                }
                return [2 /*return*/];
            });
        });
    },
    getPhoneNumber: function (e) {
        console.log(e.detail.encryptedData);
    },
    getWxInfo: function (e) {
        var that = this;
        this.setData({
            wxUserInfo: e.detail.userInfo
        });
        wx.showLoading({
            title: "?????????...",
        });
        wx.getSetting({
            success: function (res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success: function () {
                            wx.login({
                                success: function (loginRes) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var res;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    console.log(loginRes, "-=???????????????");
                                                    return [4 /*yield*/, userClient.ifBinding(loginRes.code, e.detail.userInfo)];
                                                case 1:
                                                    res = _a.sent();
                                                    if (res == true) {
                                                        wx.hideLoading();
                                                        that.reloadUp();
                                                        wx.navigateBack({
                                                            delta: 1
                                                        });
                                                    }
                                                    else {
                                                        wx.hideLoading();
                                                        that.setData({
                                                            hasBind: false,
                                                        });
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                                fail: function (loginRes) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            console.log("di");
                                            return [2 /*return*/];
                                        });
                                    });
                                }
                            });
                        }, fail: function (res) {
                            wx.hideLoading();
                        }
                    });
                }
                else {
                    wx.login({
                        success: function (loginRes) {
                            return __awaiter(this, void 0, void 0, function () {
                                var res;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(loginRes, "-=???????????????");
                                            return [4 /*yield*/, userClient.ifBinding(loginRes.code, e.detail.userInfo)];
                                        case 1:
                                            res = _a.sent();
                                            if (res == true) {
                                                wx.hideLoading();
                                                that.reloadUp();
                                                wx.navigateBack({
                                                    delta: 1
                                                });
                                            }
                                            else {
                                                wx.hideLoading();
                                                that.setData({
                                                    hasBind: false,
                                                });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        },
                        fail: function (loginRes) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    console.log("di");
                                    return [2 /*return*/];
                                });
                            });
                        }
                    });
                }
            }
        });
        /* */
    },
    deny: function (e) {
        this.setData({
            hasBind: e.target.dataset.state
        });
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    permit: function (e) {
        this.setData({
            hasBind: e.target.dataset.state,
            bindPhone: e.target.dataset.permitstate
        });
    },
    denyBindPhone: function (e) {
        this.setData({
            bindPhone: e.target.dataset.bindphone
        });
    },
    permitBindPhone: function (e) {
        var that = this;
        if (this.data.phone == "") {
            wx.showToast({
                title: "??????????????????",
                icon: "none",
                duration: 2000
            });
            return;
        }
        if (!/^[1]([3-9])[0-9]{9}$/.test(this.data.phone)) {
            wx.showToast({
                title: "????????????????????????",
                icon: "none"
            });
            return;
        }
        this.setData({
            bindPhone: false
        });
        var wxUserInfo = this.data.wxUserInfo;
        if (wxUserInfo.gender == 1) {
            wxUserInfo.gender = "???";
        }
        else if (wxUserInfo.gender == 2) {
            wxUserInfo.gender = "???";
        }
        var invited = wx.getStorageSync("inviter");
        var user = {
            tel: this.data.phone,
            openId: wx.getStorageSync("openId"),
            nickName: wxUserInfo.nickName,
            headImgUrl: wxUserInfo.avatarUrl,
            sex: wxUserInfo.gender,
            province: "",
            city: wxUserInfo.city,
            InviterId: invited.invitedByUserId,
            InvitationScope: 1,
            UserSource: "??????????????????"
        };
        wx.showLoading({
            title: "?????????..."
        });
        userClient.login(this.data.phone, user).then(function (res) {
            if (res.data.isSuccess) {
                wx.hideLoading();
                wx.showToast({
                    title: "????????????????????????",
                    icon: "none"
                });
                setTimeout(function () {
                    that.reloadUp();
                    wx.navigateBack({
                        delta: 1
                    });
                    // wx.switchTab({
                    //   url: "/pages/index/index"
                    // });
                }, 1000);
            }
            else {
                wx.hideLoading();
                wx.showToast({
                    title: res.data.error,
                    icon: "none"
                });
            }
        }, function (err) {
            wx.hideLoading();
            wx.showToast({
                title: err,
                icon: "none"
            });
        });
        // this.setData({
        //   bindPhone: e.target.dataset.bindPhone,
        // })
    },
    //????????????
    changePhone: function (e) {
        this.setData({
            phone: e.detail.value
        });
    },
    /**
     * ??????????????????--??????????????????
     */
    onShow: function () {
    },
    /**
     * ??????????????????--??????????????????
     */
    onHide: function () {
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
    reloadUp: function () {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //????????????
        var prevPage = pages[pages.length - 2]; //???????????????
        var OldOptions = null;
        if (prevPage.option) {
            OldOptions = prevPage.option;
        }
        else if (prevPage.option) {
            OldOptions = prevPage.option;
        }
        else {
            OldOptions = null;
        }
        if (OldOptions) {
            currPage.onUnload();
        }
        else {
            currPage.onLoad();
        }
    }
});
