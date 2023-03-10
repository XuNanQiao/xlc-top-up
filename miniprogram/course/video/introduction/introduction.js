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
// ??????????????????
var app = getApp();
var courseClient_1 = require("../../../utils/courseClient");
var UserClient_1 = require("../../../utils/UserClient");
var courseManager_1 = require("../../../utils/courseManager");
var ExamPackageClient_1 = require("../../../utils/ExamPackageClient");
var stringHelper_1 = require("../../../utils/stringHelper");
var aliPlayerClient_1 = require("../../../utils/aliPlayerClient");
var aliPlayerClient = new aliPlayerClient_1.AliPlayerClient();
var InviteCodeManager_1 = require("../../../utils/InviteCodeManager");
var courseManger = new courseManager_1.VipVideoCourseManager();
var courseClient = new courseClient_1.CourseClient();
var examClient = new ExamPackageClient_1.ExamPackageClient();
var userClient = new UserClient_1.UserClient();
Page({
    data: {
        page: 0,
        userInfo: userClient.getInfo(),
        periods: [],
        course: null,
        nav: ["????????????", "????????????"],
        from: "",
        trainingCampId: null,
        TabCur: 1,
        scrollLeft: 0,
        periodCur: 0,
        mnContent: "",
        xfContent: "",
        uhide: 0,
        usebg: true,
        hasthis: false,
        ifOnShow: false,
        options: null,
        CouponsModal: "",
        option: null
    },
    onLoad: function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var invited, liveId, invited, invited;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //?????????????????????
                        if (option.invitedByUserId) {
                            invited = {
                                invitedByUserId: option.invitedByUserId,
                                invitedByType: option.invitedByType,
                                kcid: option.id
                            };
                            wx.setStorageSync("inviter", invited);
                        }
                        this.setData({
                            userInfo: userClient.getInfo(),
                            option: option,
                            from: option.from,
                            trainingCampId: option.trainingCampId,
                        });
                        if (!!this.data.userInfo) return [3 /*break*/, 1];
                        this.setData({
                            hasthis: false,
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, courseClient.gethasItemAsync(1, Number(option.id), this.data.userInfo.id).then(function (res) {
                            _this.setData({
                                hasthis: res
                            });
                        })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        liveId = Number(option.id);
                        return [4 /*yield*/, courseClient.getClassPeriodAsync(liveId).then(function (res) {
                                _this.setData({
                                    periods: res
                                });
                            })];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, courseManger.getDataAsync(liveId).then(function (res) {
                                if (res.content != null) {
                                    res.content = stringHelper_1.ImgSizeLimit(res.content);
                                }
                                _this.setData({
                                    course: res
                                });
                            })];
                    case 5:
                        _a.sent();
                        if (this.data.course == null) {
                            wx.showModal({
                                title: "\u53D1\u751F\u9519\u8BEF",
                                content: "\u627E\u4E0D\u5230\u6B64\u8BFE\u7A0B",
                                showCancel: false,
                                success: function (res) {
                                    wx.navigateBack();
                                },
                            });
                            return [2 /*return*/];
                        }
                        wx.setNavigationBarTitle({
                            title: this.data.course.title,
                        });
                        if (option.invitedByUserId != undefined) {
                            invited = {
                                invitedByUserId: option.invitedByUserId,
                                invitedByType: option.invitedByType,
                                kcid: option.id,
                            };
                            wx.setStorageSync("inviter", invited);
                        }
                        //?????????????????????
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
    onHide: function () {
        if (!this.data.userInfo) {
            this.setData({
                ifOnShow: true
            });
        }
    },
    onShow: function () {
        if (this.data.ifOnShow == true) {
            app.reloadCurrent(this.data.options);
        }
        this.setData({
            userInfo: userClient.getInfo(),
        });
    },
    //tab??????
    tabSelect: function (event) {
        this.setData({
            TabCur: event.currentTarget.dataset.index
        });
    },
    periodsSelect: function (index) {
        this.setData({
            periodCur: index
        });
    },
    getUrl: function (liveConfig) {
        var isComma = liveConfig.indexOf("?") > 0;
        var result = "";
        if (isComma) {
            result = liveConfig + "&embed=video";
        }
        else {
            result = liveConfig + "?embed=video";
        }
        if (this.data.userInfo != null) {
            result +=
                "&emial=" +
                    this.data.userInfo.id +
                    "@juxuewx.com&name=" +
                    this.data.userInfo.nickName;
        }
        return result;
    },
    openChapter: function (event) {
        var id = event.currentTarget.dataset.id;
        this.setData({
            uhide: this.data.uhide == id ? 0 : id
        });
        // this.uhide = this.uhide == id ? 0 : id;
    },
    play: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.data.course && this.data.course.price > 0 && this.data.hasthis == false) {
                            wx.showToast({
                                title: "??????????????????????????????",
                                icon: "none",
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, event.currentTarget.dataset.id];
                    case 1:
                        id = _a.sent();
                        return [4 /*yield*/, aliPlayerClient.cheackIsSegment(id, "videoCourses").then(function (res) {
                                if (res.isSuccess == true) {
                                    if (_this.data.course != null) {
                                        wx.navigateTo({
                                            url: "/course/video/playerCorldraw/playerCorldraw?id=" + id + "&video=" + _this.data.course.id + "&from=" + _this.data.from + "&trainingCampId=" + _this.data.trainingCampId
                                        });
                                    }
                                }
                                else {
                                    if (_this.data.course != null) {
                                        wx.navigateTo({
                                            url: "/course/video/play/play?id=" + id + "&video=" + _this.data.course.id + "&from=" + _this.data.from + "&trainingCampId=" + _this.data.trainingCampId
                                        });
                                    }
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    //????????????
    getHomeWork: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var examId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event.currentTarget.dataset.examid];
                    case 1:
                        examId = _a.sent();
                        if (!this.data.hasthis && this.data.course && this.data.course.price > 0) {
                            wx.showToast({
                                title: "??????????????????????????????",
                                icon: "none",
                            });
                            return [2 /*return*/];
                        }
                        examClient.getVideoHomwork(examId).then(function (res) {
                            if (res.data) {
                                wx.navigateTo({
                                    url: "/examPackage/pages/exam/CourseHomework/indexnew?examId=" +
                                        examId +
                                        "&courseType=2",
                                });
                                return;
                            }
                            else {
                                wx.showToast({
                                    title: "??????????????????",
                                    icon: "none",
                                    image: "",
                                    duration: 1500,
                                    mask: false,
                                });
                                return;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    // ??????????????????
    download: function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event.currentTarget.dataset.id];
                    case 1:
                        id = _a.sent();
                        if (this.data.hasthis && this.data.course && this.data.course.price > 0) {
                            courseClient.dataDownload(id, 1, 2);
                        }
                        else {
                            wx.showToast({
                                title: "???????????????????????????????????????",
                                icon: "none",
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    CouponsModalClick: function () {
        if (!this.data.userInfo) {
            userClient.checkLogin();
            return;
        }
        this.setData({
            CouponsModal: "CouponsModal"
        });
    },
    getCouponsModal: function (e) {
        this.setData({
            CouponsModal: e
        });
    },
    goNext: function (event) {
        wx.navigateTo({
            url: event.currentTarget.dataset.url
        });
    },
    /*** ???????????????????????????????????????*/
    onReachBottom: function () {
        this.setData({
            page: this.data.page + 1
        });
    },
    /*** ???????????????????????????*/
    onShareAppMessage: function () {
        var path = InviteCodeManager_1.inviteCodeManager.CreatePath("/course/video/introduction/introduction", this.data.option.id, 1);
        var title, imageUrl;
        if (this.data.course) {
            title = this.data.course.title;
            imageUrl = this.data.course.img;
        }
        else {
            title = "???????????????";
            imageUrl = "";
        }
        return {
            title: title,
            path: path,
            imageUrl: imageUrl,
            success: function (res) {
                console.log("????????????");
                //?????????
                wx.showShareMenu({
                    // ???????????????????????????????????????              
                    withShareTicket: true
                });
                if (res.shareTickets) {
                    // ????????????????????????
                    wx.getShareInfo({
                        shareTicket: res.shareTickets[0],
                        success: function (res) {
                            res.errMsg; // ????????????
                            res.encryptedData; // ?????????????????? JSON ?????????openGId  ?????????????????????????????? ID???
                            res.iv; // ???????????????????????????
                        },
                        fail: function () { },
                        complete: function () { }
                    });
                }
            },
            fail: function (res) {
                // wx.showModal({ title: "????????????", content: "????????????????????????" });
                console.log("????????????");
            }
        };
    },
});
