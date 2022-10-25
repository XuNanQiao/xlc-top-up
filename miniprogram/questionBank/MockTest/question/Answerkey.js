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
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var UserClient_1 = require("../../../utils/UserClient");
var ExamPackageClient_1 = require("../../../utils/ExamPackageClient");
var stringHelper_1 = require("../../../utils/stringHelper");
var userClient = new UserClient_1.UserClient();
var webClient = new WebClient_1.WebClient();
var examPackageClient = new ExamPackageClient_1.ExamPackageClient();
Page({
    data: {
        roomId: "",
        examId: "",
        userInfo: userClient.getInfo(),
        qusetionList: [],
        onAnalysisItem: {},
        onKcItem: wx.getStorageSync("onKcItem"),
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (option.roomId && option.examId) {
                    this.setData({
                        roomId: option.roomId,
                        examId: option.examId
                    });
                }
                if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
                    InviteCodeManager_1.inviteCodeManager.TryStorageInviteCode(option.regCode);
                }
                wx.setNavigationBarTitle({
                    title: '答案解析',
                });
                this.getExamKeyPointAnalysis();
                return [2 /*return*/];
            });
        });
    },
    //获取试卷解析
    getExamKeyPointAnalysis: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({
                            title: "加载中..."
                        });
                        if (!this.data.userInfo) return [3 /*break*/, 2];
                        return [4 /*yield*/, webClient.sendAsync({
                                url: "/api/ExamApp/exam-packageControl/exam-result?uId=" + this.data.userInfo.id + "&examId=" + this.data.examId
                            }).then(function (res) {
                                var data = res.data.data;
                                if (data) {
                                    for (var i in data.questionGroups) {
                                        for (var j in data.questionGroups[i].questions) {
                                            data.questionGroups[i].questions[j].analysis = stringHelper_1.ImgSizeLimit(data.questionGroups[i].questions[j].analysis);
                                            data.questionGroups[i].questions[j].answer = stringHelper_1.ImgSizeLimit(data.questionGroups[i].questions[j].answer);
                                            _this.data.qusetionList = _this.data.qusetionList.concat(data.questionGroups[i].questions[j]);
                                        }
                                    }
                                    _this.setData({
                                        qusetionList: _this.data.qusetionList,
                                        onAnalysisItem: _this.data.qusetionList[0]
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        wx.hideLoading();
                        return [3 /*break*/, 3];
                    case 2:
                        userClient.checkLogin();
                        _a.label = 3;
                    case 3:
                        wx.hideLoading();
                        return [2 /*return*/];
                }
            });
        });
    },
    pitchOnAnalysisItem: function (e) {
        this.data.onAnalysisItem = e.target.dataset.item;
        this.data.onAnalysisItem.order = e.target.dataset.index;
        this.setData({
            onAnalysisItem: this.data.onAnalysisItem
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        userClient.checkLogin();
        //this.getExamKeyPointAnalysis();
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
