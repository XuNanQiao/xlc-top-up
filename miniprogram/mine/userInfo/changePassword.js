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
var WebClient_1 = require("../../utils/WebClient");
var UserClient_1 = require("../../utils/UserClient");
var putUserInfo_1 = require("../../utils/putUserInfo");
var webClient = new WebClient_1.WebClient();
var userClient = new UserClient_1.UserClient();
var putUserInfo = new putUserInfo_1.PutUserInfo();
Page({
    data: {
        userInfo: userClient.getInfo(),
        codeTime: 60,
        codeVal: "",
        newPwd: "",
        newPwd_s: "",
        sendFlag: true
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                wx.showLoading({
                    title: "加载中..."
                });
                wx.setNavigationBarTitle({
                    title: '修改密码',
                });
                wx.hideLoading();
                return [2 /*return*/];
            });
        });
    },
    //数据绑定
    changeTelCode: function (e) {
        this.setData({
            codeVal: e.detail.value
        });
    },
    changeNewPwd: function (e) {
        this.setData({
            newPwd: e.detail.value
        });
    },
    changeNewPwds: function (e) {
        this.setData({
            newPwd_s: e.detail.value
        });
    },
    postCode: function () {
        return __awaiter(this, void 0, void 0, function () {
            var that, user, result, _that_1, currentTime_1, interval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        user = this.data.userInfo;
                        if (!that.data.sendFlag) {
                            return [2 /*return*/];
                        }
                        that.setData({
                            sendFlag: false
                        });
                        if (!(user && this.data.codeTime == 60)) return [3 /*break*/, 2];
                        wx.showLoading({
                            title: "加载中...",
                        });
                        return [4 /*yield*/, webClient.postFormAsync({
                                url: "/api/Sms/SendSmsCode?tel=" + user.tel + "&needVertifyCode=false"
                            })];
                    case 1:
                        result = _a.sent();
                        wx.hideLoading();
                        if (result.data.isSuccess == true) {
                            that.setData({
                                codeTime: 60
                            });
                            _that_1 = this;
                            currentTime_1 = _that_1.data.codeTime;
                            interval = setInterval(function () {
                                _that_1.setData({
                                    codeTime: (currentTime_1 - 1)
                                });
                                currentTime_1--;
                                if (currentTime_1 <= 0) {
                                    clearInterval(interval);
                                    _that_1.setData({
                                        sendFlag: true,
                                        codeTime: 60
                                    });
                                }
                            }, 1000);
                        }
                        else {
                            if (result.data.errorMessage != null) {
                                this.data.sendFlag = true;
                                wx.showToast({
                                    title: result.data.errorMessage,
                                    icon: "none"
                                });
                            }
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    submit: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = this.data.userInfo;
                        if (this.data.codeVal == "" || this.data.newPwd == "" || this.data.newPwd_s == "") {
                            return [2 /*return*/];
                        }
                        if (this.data.newPwd.length < 6) {
                            wx.showToast({
                                title: "新密码需6~20位的任意字符组合",
                                icon: "none",
                                duration: 2000
                            });
                            return [2 /*return*/];
                        }
                        if (this.data.newPwd != this.data.newPwd_s) {
                            wx.showToast({
                                title: "两次输入密码不相同",
                                icon: "none",
                                duration: 2000
                            });
                            return [2 /*return*/];
                        }
                        if (!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, webClient
                                .postFormAsync({
                                url: "/api/ExamApp/mineControl/changepwd-by-smscode",
                                data: {
                                    tel: user.tel,
                                    smsCode: this.data.codeVal,
                                    newPassword: this.data.newPwd
                                }
                            })
                                .then(function (res) {
                                if (res.data.isSuccess) {
                                    wx.showToast({
                                        title: "修改成功！",
                                        icon: "none"
                                    });
                                    userClient.clear();
                                    wx.switchTab({
                                        url: "/pages/index/index"
                                    });
                                }
                                else {
                                    wx.showToast({
                                        title: res.data.error,
                                        icon: "none"
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },
});
