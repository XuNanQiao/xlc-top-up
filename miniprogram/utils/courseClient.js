"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CourseClient = void 0;
var setting_1 = require("../setting");
var WebClient_1 = require("./WebClient");
var md5 = require("./md5.js");
var CourseClient = /** @class */ (function (_super) {
    __extends(CourseClient, _super);
    function CourseClient() {
        return _super.call(this, setting_1.setting.apiEndPoint) || this;
    }
    /**
   * 判断是否已购买某课程
   */
    CourseClient.prototype.gethasItemAsync = function (itemType, itemId, uId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postFormAsync({
                            url: "/api/ExamApp/mineControl/hasitem?uId=" + uId + "&&itemType=" + itemType + "&&itemId=" + itemId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    //用户该课程是否已预约
    CourseClient.prototype.hasAppoint = function (entryId, uId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!uId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/ExamApp/courseControl/free/live/" + entryId + "/appointment?uId=" + uId,
                                method: "GET"
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2: return [4 /*yield*/, this.sendAsync({
                            url: "/api/course/free/live/" + entryId + "/appointment",
                            method: "GET"
                        })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    //点击预约
    CourseClient.prototype.tryAppointMsgAsync = function (entryId, uId) {
        return __awaiter(this, void 0, void 0, function () {
            var invited, response, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        invited = wx.getStorageSync("inviter");
                        if (uId == invited.invitedByUserId) {
                            invited.invitedByUserId = null;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!uId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.postFormAsync({
                                url: "/api/ExamApp/courseControl/free/live/" + entryId + "/appointment?uId=" + uId + "&inviter=" + invited.invitedByUserId
                            })];
                    case 2:
                        response = _a.sent();
                        this.EnsureStatusCode(response);
                        wx.setStorageSync("inviter", '');
                        return [2 /*return*/, true];
                    case 3: return [4 /*yield*/, this.postFormAsync({
                            url: "/api/course/free/live/" + entryId + "/appointment?inviter=" + invited.invitedByUserId
                        })];
                    case 4:
                        response = _a.sent();
                        this.EnsureStatusCode(response);
                        wx.setStorageSync("inviter", '');
                        return [2 /*return*/, true];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
      * 获得公开课程列表
      * @param filter （搜索条件  || 筛选项）
      * @param pageIndex  当前页数
      * @param pageSize  每一页的大小
      */
    CourseClient.prototype.getFreeListAsync = function (pageIndex, pageSize, q, freeType, kind) {
        if (pageIndex === void 0) { pageIndex = 0; }
        if (pageSize === void 0) { pageSize = 12; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ pageIndex: pageIndex, pageSize: pageSize }, { q: q, freeType: freeType, kind: 3 });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/course/free",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                currentIndex: response.header["p-pageindex"],
                                currentNumber: response.header["p-pagenumber"],
                                data: response.data,
                                hasNextPage: response.header["p-hasnextpage"],
                                hasPrevPage: response.header["p-hasprevpage"],
                                pageSize: response.header["p-pagesize"],
                                totalItemCount: response.header["p-totalitemcount"],
                                maxPageIndex: response.header["p-maxpageindex"],
                                maxPageNumber: response.header["p-maxpagenumber"]
                            }];
                }
            });
        });
    };
    /* 获取公开课日期分组列表 */
    CourseClient.prototype.getLiveFreeDateGroupAsync = function (PageIndex, PageSize, q, freeType, kind) {
        if (PageIndex === void 0) { PageIndex = 0; }
        if (PageSize === void 0) { PageSize = 12; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ PageIndex: PageIndex, PageSize: PageSize, kind: 3 }, { q: q, freeType: freeType });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/Course/liveFreeDateGroup",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    //判断公开课直播zhuanfg
    /*
    1		直播进行中, 参加者可以进入观看直播
    2		预约中 , 直播预约中,尚未开始
    3		直播已结束
    4		当前为点播
    5		结束且有自动回放
    */
    CourseClient.prototype.getLiveType = function (liveConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var index, id, timestamp, resData, data;
            return __generator(this, function (_a) {
                index = liveConfig.lastIndexOf("/");
                id = liveConfig.substring(index + 1);
                timestamp = new Date().getTime().toString();
                resData = "";
                data = {
                    webinar_id: id,
                    auth_type: 2,
                    app_key: "ad493af2fdc36bffbd8515554c85ab8e",
                    time_seq: 1,
                    signed_at: timestamp,
                };
                data.sign = this.getSign(data);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.request({
                            url: "https://e.vhall.com/api/vhallapi/v2/webinar/state",
                            data: data,
                            method: "GET",
                            success: function (res) {
                                resolve(res);
                            },
                            fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    //sign加密
    CourseClient.prototype.getSign = function (paramObj) {
        var APP_KEY = "ad493af2fdc36bffbd8515554c85ab8e";
        var SECRET_KEY = "e5148bdd470174b6a99fcce6842c6e8c";
        var keys = Reflect.ownKeys(paramObj).sort();
        var signStr = "";
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            signStr += key + paramObj[key];
        }
        signStr = SECRET_KEY + signStr + SECRET_KEY;
        return md5.hexMD5(signStr).toString();
    };
    /*** 获得 专业列表*/
    CourseClient.prototype.getCourseZhuanYesAsync = function (kind) {
        if (kind === void 0) { kind = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/Course/basic/zhuanyes",
                            data: {
                                kind: kind
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /** * 获得 课程列表 */
    CourseClient.prototype.getCourseKeChengsAsync = function (kind, zyId) {
        if (kind === void 0) { kind = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ kind: kind, }, { zyId: zyId });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/course/basic/Kechengs",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /*** 获得 单科列表*/
    CourseClient.prototype.getVideosProfessionListAsync = function (kind, kId, q, zyId, type) {
        if (kind === void 0) { kind = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ kind: kind, }, { zyId: zyId, type: type, kId: kId, q: q });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/Course/videos-of-profession",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
   *  获得 单个公开课的数据
   * @param liveId  直播Id
   * @param read
   */
    CourseClient.prototype.getFreeLiveShowAsync = function (liveId, read) {
        if (read === void 0) { read = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/Course/free/live/" + liveId
                        })];
                    case 1:
                        response = _a.sent();
                        if (read == true) {
                            this.getFreeLiveshowReadAsync(liveId);
                        }
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
   *  获得直播阅读数
   * @param liveId  直播Id
   * @param supressRead  是否抑制阅读
   */
    CourseClient.prototype.getFreeLiveshowReadAsync = function (liveId, supressRead) {
        if (supressRead === void 0) { supressRead = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/Course/free/live/" + liveId + "/read"
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
   *  公开课关注
   * @param kind  类型
   * @param liveId  项目id
   */
    CourseClient.prototype.getFreeVideocourseFocus = function (kind, liveId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/Promotion/follow-qrcode",
                            data: {
                                kind: 3,
                                liveId: liveId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
   *  获取推荐排名
   */
    CourseClient.prototype.invitationRank = function (top, scope, itemId, uId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/Promotion/livePublic-invitation",
                            data: {
                                PageSize: top,
                                PageIndex: scope,
                                livePublicId: itemId,
                                uId: uId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
  *  获取我的邀请注册记录
  */
    CourseClient.prototype.invitationMyRank = function (uId, scope, itemId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamApp/promotionContorl/my-invitation-record",
                            data: {
                                uId: uId,
                                scope: scope,
                                itemId: itemId,
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     * 获得 我购买的单科列表
     */
    CourseClient.prototype.getSingleCourseListAsync = function (uId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamApp/mineControl/resources/singleCourse?uId=" + uId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
  * 获得我的直播公开课
  */
    CourseClient.prototype.getPublicLiveCourseListAsync = function (uId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamApp/mineControl/resources/publicLiveCourse?uId=" + uId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    }; /**
  * 获得我的兑换课（只包含直播点播课程）
  */
    CourseClient.prototype.getExchangeCourseListAsync = function (uId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamApp/mineControl/resources/exchangeCourse?uId=" + uId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     *  获得 单个直播的数据
     * @param liveId  直播Id
     * @param read
     */
    CourseClient.prototype.getLiveShowAsync = function (liveId, read) {
        if (read === void 0) { read = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/course/liveshow/" + liveId
                        })];
                    case 1:
                        response = _a.sent();
                        if (read == true) {
                            this.getLiveshowReadAsync(liveId);
                        }
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /***  获得  * @param liveId  直播Id*/
    CourseClient.prototype.getPlaybackAsync = function (liveId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/course/liveshow/" + liveId + "/" + id
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
   *  获得直播阅读数
   * @param liveId  直播Id
   * @param supressRead  是否抑制阅读
   */
    CourseClient.prototype.getLiveshowReadAsync = function (liveId, supressRead) {
        if (supressRead === void 0) { supressRead = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/course/liveshow/" + liveId + "/read"
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
    *  获得 单个点播的数据
    * @param courseId  点播Id
    * @param read
    */
    CourseClient.prototype.getVideocourseAsync = function (courseId, read) {
        if (read === void 0) { read = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/course/videoshow/" + courseId
                        })];
                    case 1:
                        response = _a.sent();
                        if (read == true) {
                            this.getVideocourseReadAsync(courseId);
                        }
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     *  获得点播阅读数
     * @param courseId  点播Id
     * @param supressRead  是否抑制阅读
     */
    CourseClient.prototype.getVideocourseReadAsync = function (courseId, supressRead) {
        if (supressRead === void 0) { supressRead = false; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/course/videoshow/" + courseId + "/read"
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
  *  获得班型周期列表
  * @param classId  班型Id
  * @param supressRead  是否抑制阅读
  */
    CourseClient.prototype.getClassPeriodAsync = function (classId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/course/classes/" + classId + "/period",
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
  *  获取用户课程的最新学习记录（最近学习的课程章节）
  * @param courseType  可空）课程类型，默认全部：1.直播课、2.点播课、3.直播公开课、4.点播公开课
  * @param lastDays  （可空）最近天数
  */
    CourseClient.prototype.courseLearnRecords = function (uId, kind, lastDays, courseType) {
        if (kind === void 0) { kind = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ uId: uId, kind: kind }, { courseType: courseType, lastDays: lastDays });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/Tracking/courseLearnRecords",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    // 随堂讲义、随堂资料下载
    CourseClient.prototype.dataDownload = function (id, docType, courseType) {
        return __awaiter(this, void 0, void 0, function () {
            var slide, downloadName, urlVal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/Course/courseDoc",
                            data: {
                                docType: docType,
                                courseType: courseType,
                                sectionId: id
                            }
                        })];
                    case 1:
                        slide = _a.sent();
                        if (!(slide.data.isSuccess == false)) return [3 /*break*/, 2];
                        wx.showToast({
                            title: "暂无随堂资料。无法下载",
                            icon: "none",
                        });
                        return [2 /*return*/];
                    case 2:
                        if (!(slide.data.isSuccess == true)) return [3 /*break*/, 4];
                        downloadName = slide.data.data.fileName;
                        return [4 /*yield*/, slide.data.data.filePath];
                    case 3:
                        urlVal = _a.sent();
                        wx.downloadFile({
                            url: urlVal,
                            success: function (res) {
                                var tempFilePath = res.tempFilePath;
                                if (res.statusCode === 200) {
                                    if (tempFilePath != undefined) {
                                        wx.saveFile({
                                            tempFilePath: tempFilePath,
                                            success: function (res) {
                                                var savedFilePath = res.savedFilePath;
                                                wx.showModal({
                                                    title: "文件保存路径，是否打开文件",
                                                    content: res.savedFilePath,
                                                    success: function (res) {
                                                        if (res.confirm) {
                                                            wx.openDocument({
                                                                filePath: savedFilePath,
                                                                success: function (res) {
                                                                },
                                                                fail: function (err) {
                                                                    wx.showModal({
                                                                        title: "文件打开失败",
                                                                    });
                                                                }
                                                            });
                                                        }
                                                        else if (res.cancel) {
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    _this.postFormAsync({
                                        url: "/api/Know/docPack-Download-number?packageId=" + id
                                    });
                                }
                            }, fail: function (res) {
                                wx.showModal({
                                    title: "文件保存失败",
                                });
                            }
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CourseClient;
}(WebClient_1.WebClient));
exports.CourseClient = CourseClient;
