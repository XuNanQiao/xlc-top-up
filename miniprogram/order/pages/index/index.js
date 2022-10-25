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
var orderClient_1 = require("../../../utils/orderClient");
var couponsClient_1 = require("../../../utils/couponsClient");
var coupons = new couponsClient_1.CouponsClient();
var orderClient = new orderClient_1.OrderClient();
var userClient = new UserClient_1.UserClient();
var older_1 = require("../../../enum/older");
Page({
    data: {
        userInfo: userClient.getInfo(),
        olderTypeNum: null,
        order: {
            fullPrice: 0,
            totalPrice: 0,
            isNeedInvoice: false,
            invoiceType: 0,
            invoiceName: "",
            taxCode: "",
            invoiceTel: "",
            province: "",
            city: "",
            address: "",
            orderItems: null,
            IsAllowPresent: true,
        },
        ifOnShow: false,
        getItem: "",
        modalName: null,
        sumPrice: 0,
        sumPriceDiscount: "",
        subFlag: false,
        option: null,
        CouponsModal: "",
        coupons: null,
        Couponslist: 0,
        MarketCodeName: "",
        couponsList: [],
        pitchOn: null,
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var that, itemOptions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                        }
                        this.setData({
                            olderTypeNum: older_1.olderType,
                            option: option
                        });
                        that = this;
                        itemOptions = wx.getStorageSync(option.storageKey);
                        that.setData({
                            getItem: wx.getStorageSync(option.storageKey)
                        });
                        if (!this.data.userInfo) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, orderClient.getOrderItems(itemOptions, this.data.userInfo.id).then(function (res) {
                                var _a;
                                var orderItems = 'order.orderItems';
                                that.setData((_a = {},
                                    _a[orderItems] = res,
                                    _a));
                            })];
                    case 1:
                        _a.sent();
                        if (that.data.order.orderItems == null || that.data.order.orderItems.length < 1) {
                            wx.showModal({
                                title: "未发现要下单的项目",
                                showCancel: false,
                                success: function (res) {
                                    //删除失效的预订单
                                    wx.removeStorageSync(option.storageKey);
                                    wx.navigateBack();
                                },
                            });
                        }
                        that.data.order.orderItems.forEach(function (item, i) {
                            that.setData({
                                sumPrice: that.data.sumPrice + item.itemPrice
                            });
                        });
                        this.getMarketCouponsList();
                        return [2 /*return*/];
                }
            });
        });
    },
    getMarketCouponsList: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.userInfo) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, coupons
                                .getMarketUserList(this.data.order.orderItems[0].itemType, this.data.order.orderItems[0].itemId, this.data.userInfo.id, 1)
                                .then(function (res) {
                                _this.setData({
                                    couponsList: res
                                });
                                if (_this.data.couponsList.length > 0) {
                                    _this.setData({
                                        pitchOn: _this.data.couponsList[0].marketingCoupons.id
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    clickPitchOn: function (event) {
        var _this = this;
        var data = this.data.couponsList[event.currentTarget.dataset.index];
        if (data.marketingCoupons.limitFullPrice > this.data.sumPrice) {
            wx.showToast({
                title: "不满足满减条件，请选择其他优惠券",
                icon: "none"
            });
            this.setData({
                pitchOn: null,
                sumPrice: 0
            });
            this.data.order.orderItems.forEach(function (item, i) {
                _this.setData({
                    sumPrice: _this.data.sumPrice + item.itemPrice
                });
            });
        }
        else {
            this.setData({
                pitchOn: event.currentTarget.dataset.id,
                sumPrice: Number((this.data.sumPrice - data.marketingCoupons.preferentialAmount).toFixed(2))
            });
        }
    },
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
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
    },
});
