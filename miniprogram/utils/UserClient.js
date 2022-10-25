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
exports.UserClient = void 0;
var setting_1 = require("../setting");
var WebClient_1 = require("./WebClient");
var UserClient = /** @class */ (function () {
    function UserClient() {
        this._userInfoKey = "userInfo";
    }
    /**
   * 判断用户是否登陆
   */
    UserClient.prototype.checkLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wx.getStorageSync('userInfo')];
                    case 1:
                        userInfo = _a.sent();
                        if (!userInfo) {
                            wx.navigateTo({
                                url: "/account/login/index"
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
   * 获取用户信息
   */
    UserClient.prototype.getInfo = function () {
        var info = wx.getStorageSync(this._userInfoKey);
        if (info == null || info == "") {
            return null;
        }
        return info;
    };
    /**
   * 退出登陆
   */
    UserClient.prototype.clear = function () {
        wx.removeStorageSync(this._userInfoKey);
    };
    /**
   * 跳转登陆
   */
    UserClient.prototype.navigatorToLoginPage = function () {
        var info = wx.getStorageSync(this._userInfoKey);
        if (info == null || info == "") {
            wx.navigateTo({
                url: "/account/login/index"
            });
        }
    };
    /**
   * 微信绑定登陆注册（手机号+openid）
   */
    UserClient.prototype.login = function (phone, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.request({
                            url: setting_1.setting.apiEndPoint + "/api/Account/signByWechatOpenId",
                            data: data,
                            method: "POST",
                            header: { "Content-Type": "application/json" },
                            success: function (res) {
                                if (res.data.isSuccess) {
                                    console.log(res.data.data);
                                    wx.setStorageSync(_this._userInfoKey, res.data.data);
                                    resolve(res);
                                }
                                else {
                                    resolve(res);
                                }
                            },
                            fail: function (res) {
                                reject(res);
                            }
                        });
                    })];
            });
        });
    };
    /**
   * 微信登陆
   */
    UserClient.prototype.wxloginWrapAsync = function () {
        return new Promise(function (resove, reject) {
            wx.login({
                success: function (res) {
                    resove(res);
                },
                fail: function (res) {
                    reject(res);
                }
            });
        });
    };
    /**
   * 获取微信用户信息
   */
    UserClient.prototype.wxGetUserInfo = function () {
        return new Promise(function (resove, reject) {
            wx.getUserInfo({
                success: function (res) {
                    resove(res);
                },
                fail: function (res) {
                    reject(res);
                }
            });
        });
    };
    //获取微信绑定手机号
    UserClient.prototype.getUserPhoneNumberAsync = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var loginResponse, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wxloginWrapAsync()];
                    case 1:
                        loginResponse = _a.sent();
                        model.code = loginResponse.code;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, new WebClient_1.WebClient().postFormAsync({
                                url: "/api/Account/getPhoneNumber",
                                data: model
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4:
                        e_1 = _a.sent();
                        throw e_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * 绑定微信登陆用户
   * @param data 绑定用的数据（tel:电话，nickName:昵称，verifyCode:验证码，invitedByCode:用户使用的邀请码（被哪个邀请码邀请） ）
   */
    UserClient.prototype.bindWechatLoginProviderAsync = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var loginResponse, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wxloginWrapAsync()];
                    case 1:
                        loginResponse = _a.sent();
                        data["code"] = loginResponse.code;
                        data["userSource"] = "小程序";
                        return [4 /*yield*/, new WebClient_1.WebClient().postFormAsync({
                                url: "/api/Account/bindlogin-wechatminiapp",
                                data: data
                            })];
                    case 2:
                        response = _a.sent();
                        new WebClient_1.WebClient().EnsureStatusCode(response);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
   * 尝试 登陆
   */
    UserClient.prototype.tryLoginAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loginAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_2 = _a.sent();
                        console.warn(JSON.stringify(e_2));
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** * 登陆
     */
    UserClient.prototype.loginAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that, res, user, getOpenId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        return [4 /*yield*/, this.wxloginWrapAsync()];
                    case 1:
                        res = _a.sent();
                        user = wx.getStorageSync('userInfo');
                        if (user) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, that.getOpenId(res.code)];
                    case 2:
                        getOpenId = _a.sent();
                        if (!getOpenId) return [3 /*break*/, 4];
                        return [4 /*yield*/, new WebClient_1.WebClient().sendAsync({
                                url: "/api/Users/user-by-openid?openId=" + getOpenId.data
                            }).then(function (result) {
                                wx.getUserInfo({
                                    success: function (res) {
                                        result.data.data.nickName = res.userInfo.nickName;
                                        result.data.data.uPic = res.userInfo.avatarUrl;
                                        if (result.data.isSuccess == true) {
                                            new WebClient_1.WebClient().EnsureStatusCode(result);
                                            wx.setStorageSync("userInfo", result.data.data);
                                        }
                                    }
                                });
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //判断是否已绑定手机号
    UserClient.prototype.ifBinding = function (code, userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var that, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        data = null;
                        return [4 /*yield*/, that.getOpenId(code)];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        if (!res.data) {
                            return [2 /*return*/];
                        }
                        wx.setStorageSync("openId", res.data.data);
                        return [2 /*return*/, new Promise(function (resove, reject) {
                                new WebClient_1.WebClient().sendAsync({
                                    url: "/api/Users/user-by-openid?openId=" + res.data.data
                                }).then(function (result) {
                                    console.log(result);
                                    if (result.data.isSuccess == false) {
                                        data = false;
                                    }
                                    else if (result.data.isSuccess == true) {
                                        result.data.data.nickName = userInfo.nickName;
                                        result.data.data.uPic = userInfo.avatarUrl;
                                        new WebClient_1.WebClient().EnsureStatusCode(result);
                                        wx.setStorageSync("userInfo", result.data.data);
                                        data = true;
                                    }
                                    resove(data);
                                });
                            })];
                }
            });
        });
    };
    //openId
    UserClient.prototype.getOpenId = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resove, reject) {
                        var infoResponse = new WebClient_1.WebClient().sendAsync({
                            url: "/api/Account/GetOpenIdByIndex?index=2",
                            data: {
                                code: code
                            }
                        });
                        resove(infoResponse);
                    })];
            });
        });
    };
    /**
    * 提取用户信息
    */
    UserClient.prototype.fetchUserInfoAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var infoResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new WebClient_1.WebClient().sendAsync({
                            url: "/api/Mine/info"
                        })];
                    case 1:
                        infoResponse = _a.sent();
                        new WebClient_1.WebClient().EnsureStatusCode(infoResponse);
                        wx.setStorageSync("userInfo", infoResponse.data);
                        return [2 /*return*/, infoResponse.data];
                }
            });
        });
    };
    return UserClient;
}());
exports.UserClient = UserClient;
