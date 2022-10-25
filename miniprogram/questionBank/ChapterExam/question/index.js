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
var UserClient_1 = require("../../../utils/UserClient");
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var ExamPackageClient_1 = require("../../../utils/ExamPackageClient");
var examPackageClient = new ExamPackageClient_1.ExamPackageClient();
var webClient = new WebClient_1.WebClient();
var userClient = new UserClient_1.UserClient();
Page({
    data: {
        id: "",
        qusetionList: [],
        autoplay: false,
        indicatorDots: false,
        vertical: false,
        duration: 500,
        current: 0,
        interval: 100,
        userInfo: userClient.getInfo(),
        userQuestions: [],
        questions: {
            additional: {
                id: 0
            },
            answerRecord: [],
            order: 0
        },
        questionsChecked: { additional: {} },
        modalName: "",
        isFirstModal: false,
        onKcItem: wx.getStorageSync("onKcItem"),
        startTime: "",
        endTime: "",
        examPackage: {},
        chapterId: 0,
        kcId: 0,
        subject: {},
        complete: 0,
        subjectBox: {},
        examId: "",
        ifOnShow: false,
        option: null
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setData({
                    option: option
                });
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                    return [2 /*return*/];
                }
                if (!wx.getStorageSync("isFirst")) {
                    wx.setStorageSync("isFirst", true);
                    this.setData({
                        isFirstModal: true
                    });
                }
                this.setData({
                    chapterId: Number(option.id),
                    kcId: Number(option.kcId),
                });
                if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
                    InviteCodeManager_1.inviteCodeManager.TryStorageInviteCode(option.regCode);
                }
                this.getExamQusetionList();
                return [2 /*return*/];
            });
        });
    },
    /**
     * 获取试卷试题
     */
    getExamQusetionList: function () {
        var _this = this;
        wx.showLoading({
            title: "加载中..."
        });
        if (this.data.userInfo) {
            examPackageClient.GetChapterExam(this.data.chapterId, this.data.kcId).then(function (res) {
                if (res.data) {
                    _this.data.subject = res.data;
                    _this.data.subjectBox = res.data.questionGroups;
                    for (var i in res.data.questionGroups) {
                        for (var j in res.data.questionGroups[i].questions) {
                            res.data.questionGroups[i].questions[j].name = res.data.questionGroups[i].name;
                            res.data.questionGroups[i].questions[j].additional["userAnswer"] = "";
                            _this.data.qusetionList = _this.data.qusetionList.concat(res.data.questionGroups[i].questions[j]);
                        }
                    }
                    _this.setData({
                        qusetionList: _this.data.qusetionList,
                        subject: _this.data.subject,
                        subjectBox: _this.data.subjectBox
                    });
                    wx.setNavigationBarTitle({
                        title: _this.data.subject.name,
                    });
                    wx.hideLoading();
                }
            }, function (err) {
                wx.hideLoading();
                wx.showToast({
                    title: "服务器异常，请稍后再试！",
                    icon: "none",
                });
            });
        }
        else {
            wx.hideLoading();
            userClient.checkLogin();
            return;
        }
    },
    //上一页
    prev: function () {
        if (this.data.current == 0) {
            return;
        }
        var count = this.data.current;
        count = count > 0 ? count - 1 : this.data.qusetionList.length - 1;
        this.setData({
            current: count
        });
    },
    //下一页
    next: function () {
        if (this.data.current == (this.data.qusetionList.length - 1)) {
            return;
        }
        this.setData({
            current: this.data.current + 1
        });
    },
    //当前页current改变时触发的change事件
    demo: function (e) {
        if (e.detail.source == 'autoplay') {
            this.setData({
                autoplay: false
            });
        }
        this.setData({
            current: e.detail.current //记录下当前的滑块位置
        });
    },
    //单选题
    checkRadioboxAnswer: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                items = this.data.qusetionList[e.target.dataset.questionindex];
                items.additional.userAnswer = String.fromCharCode(e.target.dataset.index + 65);
                if (e.target.dataset.questionindex < this.data.qusetionList.length - 1) {
                    this.next();
                }
                this.setData({
                    qusetionList: this.data.qusetionList,
                });
                this.noAnswer();
                return [2 /*return*/];
            });
        });
    },
    //多选题
    checkCheckedAnswer: function (e) {
        var items = this.data.qusetionList[e.target.dataset.questionindex];
        var data = String.fromCharCode(e.target.dataset.index + 65);
        if (items.additional.userAnswer) {
            console.log(items.additional.userAnswer, "----------items.additional.userAnswer");
            var bottom = items.additional.userAnswer.indexOf(data);
            if (bottom != -1) {
                items.additional.userAnswer =
                    items.additional.userAnswer.substring(0, bottom) +
                        items.additional.userAnswer.substring(bottom + 2);
            }
            else {
                items.additional.userAnswer = items.additional.userAnswer + "," + data;
            }
        }
        else {
            items.additional.userAnswer = data;
        }
        this.setData({
            qusetionList: this.data.qusetionList,
        });
        this.noAnswer();
    },
    //解答题
    bindTextAreaBlur: function (e) {
        this.data.qusetionList[e.target.dataset.questionindex].additional.userAnswer = e.detail.value;
        this.setData({
            qusetionList: this.data.qusetionList
        });
        this.noAnswer();
    },
    //未答计算
    noAnswer: function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                this.data.complete = 0;
                for (i in this.data.qusetionList) {
                    if (this.data.qusetionList[i].additional.userAnswer != "") {
                        this.data.complete++;
                    }
                }
                this.setData({
                    complete: this.data.complete,
                });
                return [2 /*return*/];
            });
        });
    },
    //提交答案
    PostPointId: function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                this.noAnswer();
                that = this;
                if (this.data.userInfo != null) {
                    if (this.data.qusetionList.length - this.data.complete > 0) {
                        wx.showModal({
                            title: "提交",
                            content: "检测到您有未答的题目，确认是否提交？",
                            success: function (res) {
                                if (res.confirm) {
                                    that.submit();
                                }
                            }
                        });
                    }
                    else {
                        this.submit();
                    }
                }
                return [2 /*return*/];
            });
        });
    },
    //提交
    submit: function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({
                            title: "加载中..."
                        });
                        if (!(this.data.userInfo != null && this.data.userInfo.id)) return [3 /*break*/, 2];
                        for (i in this.data.qusetionList) {
                            this.data.qusetionList[i].additional["user-answer"] = this.data.qusetionList[i].additional.userAnswer;
                            delete this.data.qusetionList[i].additional.userAnswer;
                        }
                        this.data.subject.testSeconds = 0;
                        return [4 /*yield*/, webClient.sendAsync({
                                method: "POST",
                                url: "/api/exam/Chapter/submit?uId=" + this.data.userInfo.id,
                                data: JSON.stringify(this.data.subject)
                            }).then(function (res) {
                                wx.hideLoading();
                                if (res.data) {
                                    wx.setStorage({
                                        key: "chapterSubmit",
                                        data: res
                                    });
                                    wx.navigateTo({
                                        url: "/questionBank/ChapterExam/question/Answerkey"
                                    });
                                }
                                else {
                                    wx.showToast({
                                        title: "服务器异常，请稍后再试！",
                                        icon: "none",
                                    });
                                }
                            }, function (err) {
                                wx.hideLoading();
                                wx.showToast({
                                    title: "服务器异常，请稍后再试！",
                                    icon: "none",
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
    showModal: function (e) {
        this.setData({
            modalName: "bottomModal"
        });
    },
    hideModal: function (e) {
        this.setData({
            modalName: ""
        });
    },
    hideModalFirst: function (e) {
        this.setData({
            isFirstModal: false
        });
    },
    toCurrent: function (e) {
        this.data.current = e.target.dataset.index;
        this.setData({
            current: this.data.current,
            modalName: ""
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
