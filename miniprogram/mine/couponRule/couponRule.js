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
var courseClient_1 = require("../../utils/courseClient");
var courseClient = new courseClient_1.CourseClient();
var mineClient = new mineClient_1.MineClient();
var userClient = new UserClient_1.UserClient();
Page({
    data: {
        userInfo: userClient.getInfo(),
        id: 0,
        coupons: null,
        subFlag: false,
        hasthis: false,
        ifOnShow: false,
        options: null,
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                }
                wx.showLoading({
                    title: "加载中..."
                });
                this.setData({
                    options: option,
                    id: Number(option.id),
                });
                if (this.data.userInfo) {
                    mineClient.getMarketData(this.data.id, this.data.userInfo.id).then(function (res) {
                        _this.setData({
                            coupons: res
                        });
                    });
                }
                wx.hideLoading();
                return [2 /*return*/];
            });
        });
    },
    PutMarketCodeToAll: function () {
        wx.showToast({
            title: "您已成功领取优惠券，快去购买课程吧~",
            icon: "none",
            duration: 2000,
        });
    },
    PutMarketCode: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) return [3 /*break*/, 2];
                        return [4 /*yield*/, courseClient.gethasItemAsync(this.data.coupons.marketingCoupons.productType, this.data.coupons.marketingCoupons.productId, this.data.userInfo.id).then(function (res) {
                                _this.setData({
                                    hasthis: res
                                });
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.data.hasthis) {
                            wx.showToast({
                                title: "您已拥有该课程~",
                                icon: "none",
                                duration: 2000,
                            });
                            return [2 /*return*/];
                        }
                        else {
                            this.order();
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    order: function () {
        return __awaiter(this, void 0, void 0, function () {
            var storageKey;
            return __generator(this, function (_a) {
                if (this.data.subFlag) {
                    return [2 /*return*/];
                }
                this.setData({
                    subFlag: true
                });
                storageKey = "order" + new Date().getTime().toString();
                wx.setStorageSync(storageKey, [
                    {
                        itemId: Number(this.data.coupons.marketingCoupons.productId),
                        itemType: this.data.coupons.marketingCoupons.productType,
                    },
                ]);
                wx.navigateTo({
                    url: "/learn/order/index?storageKey=" + storageKey,
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
    onShow: function () {
        if (this.data.ifOnShow == true) {
            // app.reloadCurrent(this.data.options);
        }
        this.setData({
            userInfo: userClient.getInfo(),
        });
        if (!this.data.userInfo) {
            userClient.checkLogin();
            return;
        }
    },
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
});
