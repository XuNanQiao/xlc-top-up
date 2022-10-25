import { setting } from "../setting";
import { WebClient } from "./WebClient";

export class QuestionClient extends WebClient {
    constructor() {
        super(setting.apiEndPoint);
    }

    /**
       * 获取问题数量
       */
    async GetCourseQuestionCount(liveId: number, playbackId: number) {
        let response = await this.sendAsync<ApiStateResult>({
            url: '/api/teacherAskedQuestion/GetCourseQuestionCount?courseId=' + liveId + '&courseType=' + 1 + '&itemId=' + playbackId
        });
        return response.data
    }

    /**
       * 获取问题数量
       */
    async GetEssentialCourseQuestionCount(liveId: number, playbackId: number) {
        let response = await this.sendAsync<ApiStateResult>({
            url: '/api/teacherAskedQuestion/GetEssentialCourseQuestionCount?courseId=' + liveId + '&courseType=' + 1 + '&itemId=' + playbackId
        });
        return response.data
    }
    /**
     * 获得 全部答疑列表
     * @param pageIndex  当前页数
     * @param pageSize  每一页的大小
     */
    async getCommentList(pageIndex: number = 0, pageSize: number = 10, courseId?: number, courseType?: number, itemId?: number): Promise<PagedList<AskedQuestionList>> {
        let data = this.combin({ PageIndex: pageIndex, PageSize: pageSize }, { courseId: courseId, courseType: courseType, itemId: itemId });
        let response = await this.sendAsync<AskedQuestionList[]>({
            url: "/api/teacherAskedQuestion",
            data: data
        });
        return {
            currentIndex: parseInt(response.header["p-pageindex"]),
            currentNumber: parseInt(response.header["p-pagenumber"]),
            data: response.data,
            hasNextPage: true,
            hasPrevPage: true,
            pageSize: parseInt(response.header["p-pagesize"]),
            totalItemCount: parseInt(response.header["p-totalitemcount"]),
            maxPageIndex: parseInt(response.header["p-maxpageindex"]),
            maxPageNumber: parseInt(response.header["p-maxpagenumber"])
        }
    }

    /**
     * 获得 精品答疑列表
     * @param pageIndex  当前页数
     * @param pageSize  每一页的大小
     */
    async getEssentialCommentList(pageIndex: number = 0, pageSize: number = 10, courseId?: number, courseType?: number, itemId?: number): Promise<PagedList<AskedQuestionList>> {
        let data = this.combin({ PageIndex: pageIndex, PageSize: pageSize }, { courseId: courseId, courseType: courseType, itemId: itemId });
        let response = await this.sendAsync<AskedQuestionList[]>({
            url: "/api/teacherAskedQuestion/ListEssentialCourseQuestionAsync",
            data: data
        });
        return {
            currentIndex: parseInt(response.header["p-pageindex"]),
            currentNumber: parseInt(response.header["p-pagenumber"]),
            data: response.data,
            hasNextPage: true,
            hasPrevPage: true,
            pageSize: parseInt(response.header["p-pagesize"]),
            totalItemCount: parseInt(response.header["p-totalitemcount"]),
            maxPageIndex: parseInt(response.header["p-maxpageindex"]),
            maxPageNumber: parseInt(response.header["p-maxpagenumber"])
        }
    }


    async submit(review: CourseQuestion): Promise<ApiStateResult> {
        let response = await this.postFormAsync<ApiStateResult>({
            url: `/api/ExamApp/teacherAskedQuesControl/submit?question=${review.question}&&courseId=${review.courseId}&&courseType=${review.courseType}&&itemId=${review.itemId}&&answerId=${review.answerId}&&hierarchy=${review.hierarchy}&&uId=${review.uId}`,
        });
        return response.data;
    }

    async SubOfflineCourseQuestion(review: OfflineCourseQuestion): Promise<ApiStateResult> {

        let response = await this.postFormAsync<ApiStateResult>({
            url: `/api/MyQuestion/SubOfflineCourseQuestion`,
            data: review
        });
        return response.data;
    }

    /**
 * 转换为树型节点
 */
    translate2TreeNode(arr: AskedQuestionList[]) {
        let treeNodeList: CourseQuestionTreeNode[] = new Array<CourseQuestionTreeNode>();
        if (arr != null && arr.length > 0) {
            arr.map(ques => {
                let quesTime = ques.addTime
                let treeNode = <CourseQuestionTreeNode>{
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
                    ques.answerList.map(ans => {
                        let ansTime = ans.addTime
                        let treeNode1 = <CourseQuestionTreeNode>{
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
                    })
                }
            })
        }
        return treeNodeList;
    }
    /**
       * 创建树型
       */
    buildTree(array: CourseQuestionTreeNode[]) {
        // 创建临时对象
        let temp: any = {};
        // 创建需要返回的树形对象
        let tree: any = [];
        // 先遍历数组，将数组的每一项添加到temp对象中
        for (let i = 0; i < array.length; i++) {
            temp[array[i].type + '-' + array[i].id] = array[i];
        }

        // 遍历temp对象，将当前子节点与父节点建立连接
        for (let j in temp) {
            // 判断是否是根节点下的项
            if (temp[j].isRoot != true) {
                if (!temp['1-' + temp[j].treePath].children) {
                    temp['1-' + temp[j].treePath].children = new Array();
                }
                temp['1-' + temp[j].treePath].children.push(temp[j]);
            } else {
                tree.push(temp[j]);
            }
        }

        return tree;
    }



}

