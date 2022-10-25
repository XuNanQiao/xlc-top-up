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
var WebClient_1 = require("../../../utils/WebClient");
var courseClient_1 = require("../../../utils/courseClient");
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var courseClient = new courseClient_1.CourseClient();
var webClient = new WebClient_1.WebClient();
Page({
    data: {
        VideosProfessionList: [],
        searchVal: '',
        courseKeChengsList: [],
        kcId: null
    },
    // 事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.VideosProfession();
                        return [4 /*yield*/, courseClient.getCourseKeChengsAsync().then(function (res) {
                                _this.setData({
                                    courseKeChengsList: res
                                });
                            })
                            //判断是否是赠送
                        ];
                    case 1:
                        _a.sent();
                        //判断是否是赠送
                        if (option.invitedByUserId) {
                            invited = {
                                invitedByUserId: option.invitedByUserId,
                                invitedByType: option.invitedByType,
                                kcid: option.id
                            };
                            wx.setStorageSync("inviter", invited);
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    //获取优选课列表
    VideosProfession: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.data.kcId) return [3 /*break*/, 2];
                        return [4 /*yield*/, courseClient.getVideosProfessionListAsync(3, this.data.kcId, this.data.searchVal).then(function (res) {
                                _this.setData({
                                    VideosProfessionList: res
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, courseClient.getVideosProfessionListAsync(3, undefined, this.data.searchVal).then(function (res) {
                            _this.setData({
                                VideosProfessionList: res
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
    // 搜索
    sendMsgTap: function (e) {
        this.setData({
            kcId: null,
            VideosProfessionList: []
        });
        this.VideosProfession();
    },
    //搜索赋值
    setSearchVal: function (e) {
        this.setData({
            kcId: null,
            searchVal: e.detail.value
        });
    },
    //课程选择
    kcChoose: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setData({
                    kcId: event.currentTarget.dataset.id,
                    searchVal: '',
                    VideosProfessionList: []
                });
                this.VideosProfession();
                return [2 /*return*/];
            });
        });
    },
    /**
  * 用户点击右上角分享
  */
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/course/pages/index/index", null);
        return {
            title: "优选课",
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
    //页面跳转
    goNext: function (event) {
        console.log("event.currentTarget.dataset.type:", event.currentTarget.dataset.type);
        if (event.currentTarget.dataset.type == 1) {
            wx.navigateTo({
                url: '/course/pages/introduction/introduction?id=' + event.currentTarget.dataset.id
            });
        }
        else {
            wx.navigateTo({
                url: '/course/video/introduction/introduction?id=' + event.currentTarget.dataset.id
            });
        }
    }
});
