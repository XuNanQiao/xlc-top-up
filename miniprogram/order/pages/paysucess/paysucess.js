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
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var older_1 = require("../../../enum/older");
var orderClient = new orderClient_1.OrderClient();
var userClient = new UserClient_1.UserClient();
Page({
    data: {
        orderInfo: null,
        userInfo: userClient.getInfo(), ifOnShow: false,
        option: null
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setData({
                            option: option
                        });
                        wx.showLoading({
                            title: "加载中..."
                        });
                        if (!this.data.userInfo) {
                            userClient.checkLogin();
                            return [2 /*return*/];
                        }
                        this.setData({
                            olderTypeNum: older_1.olderType,
                            option: option
                        });
                        return [4 /*yield*/, orderClient.getorderDetailAsync(this.data.userInfo.id, option.orderId).then(function (res) {
                                _this.setData({
                                    orderInfo: res
                                });
                            })];
                    case 1:
                        _a.sent();
                        wx.hideLoading();
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
      * 用户点击右上角分享
      */
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/pages/index/index", null);
        return {
            title: "赢在专升本",
            path: path,
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
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
    // 查看课程
    viewCourse: function () {
        //公开课
        if (this.data.orderInfo.orderItems[0].itemType == 6) {
            wx.navigateTo({
                url: "/freeLive/pages/playerPublic/playerPublic?id=" + this.data.orderInfo.orderItems[0].itemId,
            });
        }
        // 直播
        else if (this.data.orderInfo.orderItems[0].itemType == 2) {
            wx.navigateTo({
                url: "/course/pages/introduction/introduction?id=" + this.data.orderInfo.orderItems[0].itemId,
            });
        }
        // 点播
        else if (this.data.orderInfo.orderItems[0].itemType == 1) {
            wx.navigateTo({
                url: "/course/video/introduction/introduction?id=" + this.data.orderInfo.orderItems[0].itemId,
            });
        }
        else {
            wx.showToast({
                title: "暂时无法查看哦~",
                icon: "none"
            });
        }
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
