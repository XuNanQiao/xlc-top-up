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
var UserClient_1 = require("../../utils/UserClient");
var couponsClient_1 = require("../../utils/couponsClient");
var coupons = new couponsClient_1.CouponsClient();
var userClient = new UserClient_1.UserClient();
Component({
    options: { styleIsolation: 'apply-shared' },
    properties: {
        modalName: {
            type: String,
            value: ''
        },
        proType: {
            type: Number,
            value: 0
        },
        productId: {
            type: Number,
            value: 0
        },
        scopeName: {
            type: String,
            value: ''
        }
    },
    data: {
        couponsList: [],
        userInfo: userClient.getInfo(),
    },
    lifetimes: {
        ready: function () {
            if (!this.data.userInfo) {
                userClient.checkLogin();
            }
            this.getMarketCouponsList();
        },
    },
    methods: {
        getMarketCouponsList: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.data.userInfo) return [3 /*break*/, 2];
                            return [4 /*yield*/, coupons
                                    .getMarketCouponsProList(this.data.proType, this.data.productId, this.data.userInfo.id)
                                    .then(function (res) {
                                    _this.setData({
                                        couponsList: res
                                    });
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        },
        PutMarketCode: function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = event.currentTarget.dataset.id;
                            wx.showLoading({
                                title: "加载中...",
                            });
                            if (!this.data.userInfo) return [3 /*break*/, 2];
                            return [4 /*yield*/, coupons.PutMarketCode(this.data.userInfo.id, id).then(function (res) {
                                    if (res.isSuccess == true) {
                                        wx.showToast({
                                            title: "已领取，快去使用吧~",
                                            icon: "none",
                                            duration: 2000,
                                        });
                                        _this.getMarketCouponsList();
                                    }
                                    else {
                                        wx.showToast({
                                            title: "系统开小差了，再试一次吧~",
                                            icon: "none",
                                            duration: 2000,
                                        });
                                        wx.hideLoading();
                                    }
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            wx.hideLoading();
                            return [2 /*return*/];
                    }
                });
            });
        },
        Purchased: function () {
            wx.showToast({
                title: "您已领取优惠券，快去购买吧~",
                icon: "none",
                duration: 2000,
            });
        },
        hideModal: function () {
            this.triggerEvent("getCouponsModal", { val: "" });
        },
        //页面跳转
        goNext: function (event) {
            wx.navigateTo({
                url: event.currentTarget.dataset.url
            });
        },
    }
});
