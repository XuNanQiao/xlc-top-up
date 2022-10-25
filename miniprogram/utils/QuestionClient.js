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
exports.QuestionClient = void 0;
var setting_1 = require("../setting");
var WebClient_1 = require("./WebClient");
var QuestionClient = /** @class */ (function (_super) {
    __extends(QuestionClient, _super);
    function QuestionClient() {
        return _super.call(this, setting_1.setting.apiEndPoint) || this;
    }
    /**
       * 获取问题数量
       */
    QuestionClient.prototype.GetCourseQuestionCount = function (liveId, playbackId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: '/api/teacherAskedQuestion/GetCourseQuestionCount?courseId=' + liveId + '&courseType=' + 1 + '&itemId=' + playbackId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
       * 获取问题数量
       */
    QuestionClient.prototype.GetEssentialCourseQuestionCount = function (liveId, playbackId) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendAsync({
                            url: '/api/teacherAskedQuestion/GetEssentialCourseQuestionCount?courseId=' + liveId + '&courseType=' + 1 + '&itemId=' + playbackId
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
     * 获得 全部答疑列表
     * @param pageIndex  当前页数
     * @param pageSize  每一页的大小
     */
    QuestionClient.prototype.getCommentList = function (pageIndex, pageSize, courseId, courseType, itemId) {
        if (pageIndex === void 0) { pageIndex = 0; }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ PageIndex: pageIndex, PageSize: pageSize }, { courseId: courseId, courseType: courseType, itemId: itemId });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/teacherAskedQuestion",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                currentIndex: parseInt(response.header["p-pageindex"]),
                                currentNumber: parseInt(response.header["p-pagenumber"]),
                                data: response.data,
                                hasNextPage: true,
                                hasPrevPage: true,
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
     * 获得 精品答疑列表
     * @param pageIndex  当前页数
     * @param pageSize  每一页的大小
     */
    QuestionClient.prototype.getEssentialCommentList = function (pageIndex, pageSize, courseId, courseType, itemId) {
        if (pageIndex === void 0) { pageIndex = 0; }
        if (pageSize === void 0) { pageSize = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.combin({ PageIndex: pageIndex, PageSize: pageSize }, { courseId: courseId, courseType: courseType, itemId: itemId });
                        return [4 /*yield*/, this.sendAsync({
                                url: "/api/teacherAskedQuestion/ListEssentialCourseQuestionAsync",
                                data: data
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                currentIndex: parseInt(response.header["p-pageindex"]),
                                currentNumber: parseInt(response.header["p-pagenumber"]),
                                data: response.data,
                                hasNextPage: true,
                                hasPrevPage: true,
                                pageSize: parseInt(response.header["p-pagesize"]),
                                totalItemCount: parseInt(response.header["p-totalitemcount"]),
                                maxPageIndex: parseInt(response.header["p-maxpageindex"]),
                                maxPageNumber: parseInt(response.header["p-maxpagenumber"])
                            }];
                }
            });
        });
    };
    QuestionClient.prototype.submit = function (review) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postFormAsync({
                            url: "/api/ExamApp/teacherAskedQuesControl/submit?question=" + review.question + "&&courseId=" + review.courseId + "&&courseType=" + review.courseType + "&&itemId=" + review.itemId + "&&answerId=" + review.answerId + "&&hierarchy=" + review.hierarchy + "&&uId=" + review.uId,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    QuestionClient.prototype.SubOfflineCourseQuestion = function (review) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.postFormAsync({
                            url: "/api/MyQuestion/SubOfflineCourseQuestion",
                            data: review
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    /**
 * 转换为树型节点
 */
    QuestionClient.prototype.translate2TreeNode = function (arr) {
        var treeNodeList = new Array();
        if (arr != null && arr.length > 0) {
            arr.map(function (ques) {
                var quesTime = ques.addTime;
                var treeNode = {
                    id: ques.questionId,
                    type: 0,
                    content: ques.questionContent,
                    imgUrlList: ques.imgUrlList,
                    addTime: quesTime,
                    addUserName: ques.userName,
                    addUserImg: ques.userImg,
                    isQuality: ques.isQuality,
                    encourageText: ques.encourageText,
                    treePath: ques.tree_Path,
                    hierarchy: ques.tree_Hierarchy,
                    leaf: ques.tree_Leaf,
                    isRoot: ques.tree_Path > -1 ? false : true,
                    answerCount: ques.answerCount,
                    questionId: ques.questionId,
                    isHide: false,
                    showChildState: ques.answerCount > 1 ? (ques.answerCount > ques.answerList.length ? 1 : 2) : 0,
                    firstAnswerId: (ques.answerList && ques.answerList.length > 0) ? ques.answerList[0].answerId : -1,
                    isShowCommentBox: false,
                    firstAnswerChildCount: ques.firstAnswerChildCount,
                };
                treeNodeList.push(treeNode);
                if (ques.answerList != null && ques.answerList.length > 0) {
                    ques.answerList.map(function (ans) {
                        var ansTime = ans.addTime;
                        var treeNode1 = {
                            id: ans.answerId,
                            type: 1,
                            content: ans.answerContent,
                            imgUrlList: ans.imgUrlList,
                            addTime: ansTime,
                            addUserName: ans.teacherName,
                            addUserImg: '',
                            isQuality: false,
                            encourageText: ques.encourageText,
                            treePath: ques.tree_Path,
                            hierarchy: ques.tree_Hierarchy,
                            leaf: ques.tree_Leaf,
                            isRoot: ques.tree_Path > -1 ? false : true,
                            answerCount: 0,
                            questionId: ques.questionId,
                            isHide: false,
                            showChildState: 0,
                            firstAnswerId: -1,
                            isShowCommentBox: false,
                            firstAnswerChildCount: -1,
                        };
                        treeNodeList.push(treeNode1);
                    });
                }
            });
        }
        return treeNodeList;
    };
    /**
       * 创建树型
       */
    QuestionClient.prototype.buildTree = function (array) {
        // 创建临时对象
        var temp = {};
        // 创建需要返回的树形对象
        var tree = [];
        // 先遍历数组，将数组的每一项添加到temp对象中
        for (var i = 0; i < array.length; i++) {
            temp[array[i].type + '-' + array[i].id] = array[i];
        }
        // 遍历temp对象，将当前子节点与父节点建立连接
        for (var j in temp) {
            // 判断是否是根节点下的项
            if (temp[j].isRoot != true) {
                if (!temp['1-' + temp[j].treePath].children) {
                    temp['1-' + temp[j].treePath].children = new Array();
                }
                temp['1-' + temp[j].treePath].children.push(temp[j]);
            }
            else {
                tree.push(temp[j]);
            }
        }
        return tree;
    };
    return QuestionClient;
}(WebClient_1.WebClient));
exports.QuestionClient = QuestionClient;
