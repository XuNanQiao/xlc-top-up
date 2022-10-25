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
exports.ExamPackageClient = void 0;
var setting_1 = require("../setting");
var WebClient_1 = require("./WebClient");
var ExamPackageClient = /** @class */ (function (_super) {
    __extends(ExamPackageClient, _super);
    function ExamPackageClient() {
        return _super.call(this, setting_1.setting.apiEndPoint) || this;
    }
    /**
     * 获得试卷列表
     * @param filter （搜索条件  || 筛选项）
     * @param pageIndex  当前页数
     * @param pageSize  每一页的大小
     */
    ExamPackageClient.prototype.getExamPackages = function (page, pageSize, kind, zyId, kId, classifyId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/ExamPackage",
                            data: {
                                page: page,
                                pageSize: pageSize,
                                zyId: zyId,
                                kId: kId,
                                kind: kind,
                                classifyId: classifyId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                currentIndex: parseInt(response.header["p-pageindex"]),
                                currentNumber: parseInt(response.header["p-pagenumber"]),
                                data: response.data,
                                hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
                                hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
                                // hasNextPage: response.header["p-hasnextpage"],
                                // hasPrevPage: response.header["p-hasprevpage"],
                                pageSize: parseInt(response.header["p-pagesize"]),
                                totalItemCount: parseInt(response.header["p-totalitemcount"]),
                                maxPageIndex: parseInt(response.header["p-maxpageindex"]),
                                maxPageNumber: parseInt(response.header["p-maxpagenumber"])
                            }];
                }
            });
        });
    };
    /**
   * 获得 公开课 所有的学历类型
   */
    ExamPackageClient.prototype.getCourseKindsAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/Course/basic/kinds",
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    ExamPackageClient.prototype.getAppExamObj = function (packageId, examId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            // url: `/api/exam/ExamPackage/${packageId}/exam/${examId}/MoKao`
                            url: "/api/ExamApp/exam-packageControl/" + packageId + "/exam/" + examId + "/MoKao"
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ExamPackageClient.prototype.getAppExamRoomObj = function (roomId, roomExamId, uId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            // url: `/api/exam/ExamPackage/${packageId}/exam/${examId}/MoKao`
                            url: "/api/ExamApp/exam-roomControl/" + roomId + "/" + roomExamId + "?uId=" + uId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /* 根据试卷ID 获取试卷详情 */
    ExamPackageClient.prototype.getExamPackage = function (packageId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/ExamPackage/" + packageId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /* 根据试卷ID 获取试卷详情 */
    ExamPackageClient.prototype.getAppExamPackage = function (packageId, uId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/ExamPackage/" + packageId,
                            data: {
                                uId: uId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /* 根据试卷ID，课程ID 获取试卷信息 */
    ExamPackageClient.prototype.getExam = function (packageId, examId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/ExamPackage/" + packageId + "/exam/" + examId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /* 获取虚拟考场全部考场 */
    ExamPackageClient.prototype.getExamroom = function (page, mine, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = { page: page, mine: mine, uid: uid };
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/ExamApp/exam-roomControl",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                currentIndex: parseInt(response.header["p-pageindex"]),
                                currentNumber: parseInt(response.header["p-pagenumber"]),
                                data: response.data,
                                hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
                                hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
                                pageSize: parseInt(response.header["p-pagesize"]),
                                totalItemCount: parseInt(response.header["p-totalitemcount"]),
                                maxPageIndex: parseInt(response.header["p-maxpageindex"]),
                                maxPageNumber: parseInt(response.header["p-maxpagenumber"])
                            }];
                }
            });
        });
    };
    /**
     * 获得 考场记录列表
     */
    ExamPackageClient.prototype.getExamRecordAsync = function (pageIndex, pageSize, uId) {
        if (pageIndex === void 0) { pageIndex = 0; }
        if (pageSize === void 0) { pageSize = 12; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamApp/mineControl/resources/examRoom",
                            data: {
                                pageIndex: pageIndex,
                                pageSize: pageSize,
                                uId: uId
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                currentIndex: parseInt(response.header["p-pageindex"]),
                                currentNumber: parseInt(response.header["p-pagenumber"]),
                                data: response.data,
                                hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
                                hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
                                pageSize: parseInt(response.header["p-pagesize"]),
                                totalItemCount: parseInt(response.header["p-totalitemcount"]),
                                maxPageIndex: parseInt(response.header["p-maxpageindex"]),
                                maxPageNumber: parseInt(response.header["p-maxpagenumber"])
                            }];
                }
            });
        });
    };
    /**
       * 获得 获取虚拟考场kind筛选
       * @param kind  （搜索条件  || 筛选项）
       * @param page  当前页数
       * @param pageSize  每一页的大小
       */
    ExamPackageClient.prototype.getExamroomList = function (page, pageSize, kind, mine) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = { page: page, pageSize: pageSize, kind: kind, mine: mine };
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/exam/rooms",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                currentIndex: parseInt(response.header["p-pageindex"]),
                                currentNumber: parseInt(response.header["p-pagenumber"]),
                                data: response.data,
                                hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
                                hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
                                pageSize: parseInt(response.header["p-pagesize"]),
                                totalItemCount: parseInt(response.header["p-totalitemcount"]),
                                maxPageIndex: parseInt(response.header["p-maxpageindex"]),
                                maxPageNumber: parseInt(response.header["p-maxpagenumber"])
                            }];
                }
            });
        });
    };
    /* 获取考场详情 */
    ExamPackageClient.prototype.getExamroomDesc = function (roomId, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamApp/exam-roomControl/" + roomId + "?uId=" + uid,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /* 章节练习 */
    ExamPackageClient.prototype.getExamCourse = function (page, kind, zyId) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        kind = kind === 0 ? null : kind;
                        data = { page: page, kind: kind, zyId: zyId };
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/exam/Chapter",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                currentIndex: parseInt(response.header["p-pageindex"]),
                                currentNumber: parseInt(response.header["p-pagenumber"]),
                                data: response.data,
                                hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
                                hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
                                pageSize: parseInt(response.header["p-pagesize"]),
                                totalItemCount: parseInt(response.header["p-totalitemcount"]),
                                maxPageIndex: parseInt(response.header["p-maxpageindex"]),
                                maxPageNumber: parseInt(response.header["p-maxpagenumber"])
                            }];
                }
            });
        });
    };
    /* 获取选择的练习章节内容 */
    ExamPackageClient.prototype.getChapterSection = function (kId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/Chapter/sections?kId=" + kId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    //获取章节练习试题
    ExamPackageClient.prototype.GetChapterExam = function (chapterid, kId, examtype) {
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ chapterid: chapterid, kId: kId }, { examtype: examtype });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/exam/Chapter/exam",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ExamPackageClient.prototype.postChapterExamObj = function (exam) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/Chapter/submit",
                            method: 'POST',
                            data: exam
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ExamPackageClient.prototype.getExamObj = function (packageId, examId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/ExamPackage/" + packageId + "/exam/" + examId + "/MoKao"
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ExamPackageClient.prototype.postExamObj = function (packageId, examId, exam) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/ExamPackage/" + packageId + "/" + examId + "/submit",
                            method: 'POST',
                            data: exam
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ExamPackageClient.prototype.getHomeWorkObj = function (examId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/homwork/live/" + examId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ExamPackageClient.prototype.getVideoHomwork = function (examId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/homwork/video/" + examId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ExamPackageClient.prototype.postHomeWorkObj = function (courseType, courseId, examId, exam) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/homwork/" + courseType + "/" + courseId + "/" + examId + "/submit",
                            method: 'POST',
                            data: exam
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ExamPackageClient.prototype.getisAlloed = function (packageId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/exam/ExamPackage/isAlloed/" + packageId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
       * 判断是否已购买某课程
       */
    ExamPackageClient.prototype.gethasItemAsync = function (itemType, itemId, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postFormAsync({
                            url: "/api/ExamApp/mineControl/hasitem?uId=" + uid + "&&itemType=" + itemType + "&&itemId=" + itemId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     * 获取考点试题
     */
    ExamPackageClient.prototype.getExamKeyPointQusetion = function (pointId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamKeyPoint/question?pointId=" + pointId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
       * 获取考点试题解析
       */
    ExamPackageClient.prototype.getExamKeyPointAnalysis = function (uId, pointId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamKeyPoint/analysis?uId=" + uId + "&pointId=" + pointId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**获取考点做题记录详情 */
    ExamPackageClient.prototype.getExamKeyPointRecord = function (uId, pointId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/ExamKeyPoint/record?uId=" + uId + "&pointId=" + pointId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**获取每日一练试题 */
    ExamPackageClient.prototype.getDailyTrainingQusetion = function (uId, kcId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/DailyPractice?uId=" + uId + "&zyId=263&kcId=" + kcId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**判断用户每日一练状态 */
    ExamPackageClient.prototype.judgeDailyPractice = function (uId, kcId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/DailyPractice/continuous-day?uId=" + uId + "&zyId=263&kcId=" + kcId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**获取我的每日一练记录 */
    ExamPackageClient.prototype.getDailyPracticeMineRecord = function (uId, kcId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: "/api/DailyPractice/mineRecord?uId=" + uId + "&zyId=263&kcId=" + kcId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /** 获取每日一练测试成员 */
    ExamPackageClient.prototype.getDailyPracticeMembers = function (pageIndex, pageSize, uId, desc, kcId, zyId) {
        if (pageIndex === void 0) { pageIndex = 0; }
        if (pageSize === void 0) { pageSize = 12; }
        if (kcId === void 0) { kcId = 132; }
        if (zyId === void 0) { zyId = 263; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ pageIndex: pageIndex, pageSize: pageSize }, { uId: uId, desc: desc, zyId: zyId, kcId: kcId });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/DailyPractice/members",
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
    return ExamPackageClient;
}(WebClient_1.WebClient));
exports.ExamPackageClient = ExamPackageClient;
