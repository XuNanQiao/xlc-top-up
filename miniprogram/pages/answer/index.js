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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
// 获取应用实例
var app = getApp();
var mineClient_1 = require("../../utils/mineClient");
var UserClient_1 = require("../../utils/UserClient");
var InviteCodeManager_1 = require("../../utils/InviteCodeManager");
var WebClient_1 = require("../../utils/WebClient");
var mineClient = new mineClient_1.MineClient();
var userClient = new UserClient_1.UserClient();
var webClient = new WebClient_1.WebClient();
Page({
    data: {
        page: 0,
        pageSize: 100,
        userInfo: userClient.getInfo(),
        TabCur: 0,
        ifOpen: true,
        examList: [
            {
                order: [
                    {
                        question: "报考条件是什么？",
                        answer: "应届专科毕业生须通过毕业高校的综合素质测评获得学校推荐资格，或通过报考高校的专业综合能力测试获得考生自荐资格"
                    },
                    {
                        question: "报考资格获得方式？",
                        answer: "应届专科毕业生可通过高校推荐或考生自荐的方式获得报考资格，并选择与本人专科所学专业相同或相近的专业（限一个）报考。（一）高校推荐。符合下列条件之一的学生，可获得高校推荐资格，经生源高校公示无异议后可以报考。1.在校期间的综合素质测评成绩排名不低于同年级、同专业的前40%。同专业使用不同人才培养方案的，可按培养方案分类排序。2.参加省级以上职业院校技能大赛或省师范类高校学生从业技能大赛获三等奖以上的学生。由学生向生源高校提交申请和证明材料，生源高校负责审定。（二）考生自荐。未获得高校推荐资格的学生，可以向意向报考专升本招生高校进行自荐，通过招生高校的专业综合能力测试后可以获得报考该校的资格"
                    }, {
                        question: "可以报名考试几次？",
                        answer: "专升本相当于第二次高考，可见其重要性。统招的专升本只能考一次，只有大三一次机会，以应届生身份报考"
                    }
                ]
            },
        ],
        curriculumList: [
            {
                order: [
                    {
                        question: "“专升本”考试科目为何？",
                        answer: "山东省专升本入学考试共4门，英语（政治）、计算机、大学语文、高等数学（I.II.III）"
                    },
                    {
                        question: "统招专升本需要购买培训课程吗？",
                        answer: "根据自己的学习情况选择，新里程网校开设精品专升本在线课程，帮助您提高通过率！"
                    }
                ]
            },
        ],
        questionVal: 0,
        sendVal: '',
        mineFeedbackList: [],
        option: null,
        ifOnShow: false
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited;
            return __generator(this, function (_a) {
                this.setData({
                    option: option,
                    userInfo: userClient.getInfo(),
                });
                wx.showLoading({
                    title: "加载中..."
                });
                //判断是否是赠送
                if (option.invitedByUserId) {
                    invited = {
                        invitedByUserId: option.invitedByUserId,
                        invitedByType: option.invitedByType,
                        kcid: option.id
                    };
                    wx.setStorageSync("inviter", invited);
                }
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                }
                this.getMineFeedback();
                wx.hideLoading();
                return [2 /*return*/];
            });
        });
    },
    openClick: function () {
        this.setData({
            ifOpen: !this.data.ifOpen
        });
    },
    //获取我的反馈
    getMineFeedback: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                    return [2 /*return*/];
                }
                webClient.sendAsync({
                    method: 'GET',
                    url: "/wangxiao/feedback/selectUserPageList?feedUserid=" + this.data.userInfo.id + "&type=2"
                }).then(function (res) {
                    _this.setData({
                        mineFeedbackList: __spreadArrays(_this.data.mineFeedbackList, res.data.data)
                    });
                    console.log(_this.data.mineFeedbackList);
                    if (res.length > 3) {
                        _this.setData({
                            ifOpen: false
                        });
                    }
                });
                wx.pageScrollTo({
                    selector: '#last',
                    duration: 300,
                    success: function (res) {
                    },
                    fail: function (res) {
                    }
                });
                return [2 /*return*/];
            });
        });
    },
    //选择切换
    tabSelect: function (event) {
        this.setData({
            TabCur: event.currentTarget.dataset.index,
            questionVal: 0
        });
    },
    //换一换点击事件
    switch: function () {
        if (this.data.TabCur == 0) {
            if (this.data.questionVal < this.data.examList.length - 1) {
                this.setData({
                    questionVal: this.data.questionVal + 1
                });
            }
            else {
                this.setData({
                    questionVal: 0
                });
            }
        }
        if (this.data.TabCur == 1) {
            if (this.data.questionVal < this.data.curriculumList.length - 1) {
                this.setData({
                    questionVal: this.data.questionVal + 1
                });
            }
            else {
                this.setData({
                    questionVal: 0
                });
            }
        }
    },
    //输入赋值
    setSearchVal: function (e) {
        this.setData({
            sendVal: e.detail.value
        });
    },
    //发送
    sendMsgTap: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.data.userInfo) {
                    userClient.checkLogin();
                    return [2 /*return*/];
                }
                if (!this.data.sendVal) {
                    return [2 /*return*/];
                }
                webClient.sendAsync({
                    method: 'POST',
                    url: "/wangxiao/feedback/addFeedback?title=\u6388\u8BFE\u5E08\u8D44\u95EE\u9898&content=" + this.data.sendVal + "&type=2&feedbackUser=" + this.data.userInfo.nickName + "&mobile=" + this.data.userInfo.tel + "&feedUserid=" + this.data.userInfo.id + "&forms=1&isZd=2"
                }).then(function (res) {
                    if (res.data.code == 0) {
                        var data = {
                            content: _this.data.sendVal
                        };
                        _this.setData({
                            sendVal: '',
                            mineFeedbackList: _this.data.mineFeedbackList.concat(data)
                        });
                        _this.getMineFeedback();
                        wx.pageScrollTo({
                            selector: '#last',
                            duration: 300,
                        });
                    }
                    else {
                        wx.showToast({
                            title: res.msg,
                            icon: "none"
                        });
                    }
                });
                if (this.data.mineFeedbackList.length > 3) {
                    this.setData({
                        ifOpen: false
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    //输入框聚焦
    bindfocus: function () {
        this.setData({
            ifOpen: false
        });
    },
    thisQuestion: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var question, answer, index, data;
            return __generator(this, function (_a) {
                index = event.currentTarget.dataset.index;
                if (this.data.TabCur == 0) {
                    question = this.data.examList[this.data.questionVal].order[index].question,
                        answer = this.data.examList[this.data.questionVal].order[index].answer;
                }
                if (this.data.TabCur == 1) {
                    question = this.data.curriculumList[this.data.questionVal].order[index].question,
                        answer = this.data.curriculumList[this.data.questionVal].order[index].answer;
                }
                data = [{
                        id: 1,
                        typeId: 1,
                        typeName: '',
                        title: '',
                        content: question,
                        addTime: new Date(),
                        reply: answer,
                        replyName: '',
                        replyTime: null,
                        uid: null,
                        userName: ''
                    }];
                this.setData({
                    mineFeedbackList: this.data.mineFeedbackList.concat(data)
                });
                wx.pageScrollTo({
                    selector: '#last',
                    duration: 300,
                });
                if (this.data.mineFeedbackList.length > 3) {
                    this.setData({
                        ifOpen: false
                    });
                }
                return [2 /*return*/];
            });
        });
    },
    onHide: function () {
        if (!this.data.userInfo) {
            this.setData({
                ifOnShow: true
            });
        }
    },
    onShow: function () {
        this.setData({
            userInfo: userClient.getInfo(),
        });
        if (this.data.ifOnShow == true) {
            app.reloadCurrent(this.data.option);
        }
    },
    /**
      * 用户点击右上角分享
      */
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/pages/learning/index", null);
        return {
            title: "学习",
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
    //上拉事件
    onPullDownRefresh: function () {
        this.setData({
            page: this.data.page + 1
        });
        this.getMineFeedback();
    },
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
});
