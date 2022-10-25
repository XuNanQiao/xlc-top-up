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
var UserClient_1 = require("../../utils/UserClient");
var mineClient_1 = require("../../utils/mineClient");
var mineClient = new mineClient_1.MineClient();
var userClient = new UserClient_1.UserClient();
Page({
    data: {
        page: 0,
        userInfo: userClient.getInfo(),
        tabChoose: 1,
        haveVal: false,
        code: "",
        code_s: "",
        redeemcode: null,
        couponsList1: [],
        couponsList2: [],
        couponsList3: [],
        ifOnShow: false,
        option: null
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setData({
                    option: option
                });
                wx.showLoading({
                    title: "加载中..."
                });
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                }
                this.GetCouponsList();
                wx.hideLoading();
                return [2 /*return*/];
            });
        });
    },
    //页面跳转
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
    //获取优惠券列表
    GetCouponsList: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) return [3 /*break*/, 4];
                        return [4 /*yield*/, mineClient
                                .GetMarketCouponsMinelist(this.data.userInfo.id, 1)
                                .then(function (res) {
                                _this.setData({
                                    couponsList1: res,
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, mineClient
                                .GetMarketCouponsMinelist(this.data.userInfo.id, 2)
                                .then(function (res) {
                                _this.setData({
                                    couponsList2: res,
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, mineClient
                                .GetMarketCouponsMinelist(this.data.userInfo.id, 3)
                                .then(function (res) {
                                _this.setData({
                                    couponsList3: res,
                                });
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    // 获取验证码
    Code: function (e) {
        this.setData({
            code: e.detail
        });
    },
    //输入框赋值
    Redeemcode: function (e) {
        this.setData({
            redeemcode: e.detail.value
        });
    },
    // 输入框验证码赋值
    ValidCode: function (e) {
        this.setData({
            code_s: e.detail.value
        });
    },
    // 兑换
    submit: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.data.redeemcode == null) {
                            wx.showToast({
                                title: "请输入兑换码",
                                icon: "none",
                                duration: 2000
                            });
                            return [2 /*return*/];
                        }
                        if (this.data.code_s != this.data.code) {
                            wx.showToast({
                                title: "验证码有误，请重新输入验证码",
                                icon: "none",
                                duration: 2000
                            });
                            return [2 /*return*/];
                        }
                        if (!this.data.userInfo) return [3 /*break*/, 2];
                        return [4 /*yield*/, mineClient
                                .PostMarketCode(this.data.userInfo.id, this.data.redeemcode)
                                .then(function (res) {
                                if (res.isSuccess) {
                                    wx.showToast({
                                        title: "兑换成功！",
                                        icon: "none",
                                        duration: 2000
                                    });
                                    setTimeout(function () {
                                        switch (res.data.itemType) {
                                            case 2:
                                                wx.redirectTo({
                                                    url: "/course/pages/introduction/introduction?id=" + res.data.itemId
                                                });
                                                break;
                                            case 1:
                                                wx.redirectTo({
                                                    url: "/course/video/introduction/introduction?id=" + res.data.itemId
                                                });
                                                break;
                                            case 3:
                                                wx.redirectTo({
                                                    url: "/test/pages/simulation/details?id=" + res.data.itemId
                                                });
                                                break;
                                            case 4:
                                                if (_this.data.userInfo) {
                                                    /*    courseClient.download(
                                                         res.data.itemPrice,
                                                         res.data.itemId,
                                                         this.data.userInfo.id
                                                       ); */
                                                }
                                                break;
                                            case 6:
                                                wx.redirectTo({
                                                    url: "/freeLive/pages/playerPublic/playerPublic?id=" + res.data.itemId
                                                });
                                                break;
                                            default:
                                                break;
                                        }
                                    }, 2000);
                                }
                                else {
                                    wx.showToast({
                                        title: res.error,
                                        icon: "none",
                                        duration: 2000
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
    /*   onShow() {
        this.data.userInfo = tokenManager.getInfo();
        if (!this.data.userInfo) {
          tokenManager.navigatorToLoginPage();
          return;
        }
      }, */
    // tab切换
    clickBtn: function (event) {
        this.setData({
            tabChoose: event.currentTarget.dataset.val
        });
    },
    PutMarketCode: function () {
        wx.showToast({
            title: "您已领取优惠券，快去购买吧~",
            icon: "none",
            duration: 2000
        });
    },
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function () {
        // ifOnShow:false,
        this.setData({
            userInfo: userClient.getInfo(),
        });
        if (this.data.ifOnShow == true) {
            app.reloadCurrent(this.data.option);
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        if (!this.data.userInfo) {
            this.setData({
                ifOnShow: true
            });
        }
    }
});
