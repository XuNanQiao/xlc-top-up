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
            questionId: null,
            reply: []
        },
        modalName: "",
        isFirstModal: false,
        userAnswers: [],
        complete: 0
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!wx.getStorageSync("isFirst")) {
                    wx.setStorageSync("isFirst", true);
                    this.setData({
                        isFirstModal: true
                    });
                }
                if (option.id) {
                    this.setData({
                        id: option.id
                    });
                }
                if (option.regCode != null || option.regCode != "null" || option.regCode != undefined) {
                    InviteCodeManager_1.inviteCodeManager.TryStorageInviteCode(option.regCode);
                }
                wx.setNavigationBarTitle({
                    title: '考点练习',
                });
                this.getExamKeyPointQusetionList();
                return [2 /*return*/];
            });
        });
    },
    /**
     * 获取考点试题
     */
    getExamKeyPointQusetionList: function () {
        var _this = this;
        wx.showLoading({
            title: "加载中..."
        });
        examPackageClient.getExamKeyPointQusetion(this.data.id).then(function (res) {
            if (res) {
                for (var i in res) {
                    res[i].userAnswer = [];
                }
                _this.setData({
                    qusetionList: res
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
        this.data.qusetionList[e.target.dataset.questionindex].userAnswer[0] = e.target.dataset.index;
        var answer = [];
        answer.push(String.fromCharCode(e.target.dataset.index + 65));
        this.getanswer(answer, e.target.dataset.questionindex);
        if (e.target.dataset.questionindex < this.data.qusetionList.length - 1) {
            this.next();
        }
        this.setData({
            qusetionList: this.data.qusetionList
        });
    },
    //多选题
    checkCheckedAnswer: function (e) {
        var items = this.data.qusetionList[e.target.dataset.questionindex];
        var answer = [];
        if (items.userAnswer.indexOf(e.target.dataset.index) != -1) {
            for (var i = 0, lenI = items.userAnswer.length; i < lenI; ++i) {
                if (items.userAnswer[i] == e.target.dataset.index) {
                    items.userAnswer.splice(i, 1);
                }
            }
        }
        else {
            items.userAnswer.push(e.target.dataset.index);
        }
        for (var i_1 in items.userAnswer) {
            answer.push(String.fromCharCode(items.userAnswer[i_1] + 65));
        }
        this.getanswer(answer, e.target.dataset.questionindex);
        this.setData({
            qusetionList: this.data.qusetionList
        });
    },
    //解答题
    bindTextAreaBlur: function (e) {
        var answer = [];
        answer.push(e.detail.value);
        this.data.qusetionList[e.target.dataset.questionindex].userAnswer[0] = e.detail.value;
        this.getanswer(answer, e.target.dataset.questionindex);
        this.setData({
            qusetionList: this.data.qusetionList
        });
    },
    //写入答案
    getanswer: function (answer, index) {
        var have = false;
        if (this.data.userAnswers[0] == undefined) {
            this.data.userAnswers.push({
                questionId: this.data.qusetionList[index].id,
                reply: answer
            });
        }
        else {
            for (var i in this.data.userAnswers) {
                if (this.data.userAnswers[i].questionId ==
                    this.data.qusetionList[index].id) {
                    have = true;
                }
            }
            if (have) {
                for (var i in this.data.userAnswers) {
                    if (this.data.userAnswers[i].questionId ==
                        this.data.qusetionList[index].id) {
                        this.data.userAnswers[i].reply = answer;
                    }
                }
            }
            else {
                this.data.userAnswers.push({
                    questionId: this.data.qusetionList[index].id,
                    reply: answer
                });
            }
        }
        var complete = 0;
        for (var i in this.data.userAnswers) {
            if (this.data.userAnswers[i].reply.length > 0 && this.data.userAnswers[i].reply != '') {
                complete++;
            }
        }
        this.data.complete = complete;
        this.setData({
            complete: this.data.complete
        });
    },
    //提交答案
    PostPointId: function () {
        return __awaiter(this, void 0, void 0, function () {
            var that_1;
            return __generator(this, function (_a) {
                if (this.data.qusetionList.length - this.data.complete > 0) {
                    that_1 = this;
                    wx.showModal({
                        title: "提示",
                        content: "您还有未答的题目，确认提交吗？",
                        success: function (res) {
                            if (res.confirm) {
                                that_1.submit();
                                return;
                            }
                            else {
                                that_1.hideModal(null);
                                return;
                            }
                        }
                    });
                    return [2 /*return*/];
                }
                else {
                    this.submit();
                }
                return [2 /*return*/];
            });
        });
    },
    submit: function () {
        return __awaiter(this, void 0, void 0, function () {
            var PointIdData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wx.showLoading({
                            title: "加载中..."
                        });
                        if (!(this.data.userInfo != null && this.data.userInfo.id)) return [3 /*break*/, 2];
                        PointIdData = {
                            uId: this.data.userInfo.id,
                            pointId: parseInt(this.data.id),
                            questions: this.data.userAnswers,
                            seconds: 0
                        };
                        return [4 /*yield*/, webClient.sendAsync({
                                method: "POST",
                                url: "/api/ExamKeyPoint/submit",
                                data: JSON.stringify(PointIdData)
                            }).then(function (res) {
                                wx.hideLoading();
                                wx.navigateTo({
                                    url: "/questionBank/testingSites/question/Answerkey?pointId=" + _this.data.id
                                });
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
        console.log(this.data.isFirstModal);
    },
    toCurrent: function (e) {
        this.data.current = e.target.dataset.index;
        this.setData({
            current: this.data.current,
            modalName: ""
        });
        console.log(this.data.current);
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
