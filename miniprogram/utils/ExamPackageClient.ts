import { setting } from '../setting';
import { WebClient } from "./WebClient";
import { ExamObject } from '../../typings/examentends';

export class ExamPackageClient extends WebClient {
  constructor() {
    super(setting.apiEndPoint);
  }
  /**
   * 获得试卷列表
   * @param filter （搜索条件  || 筛选项）
   * @param pageIndex  当前页数
   * @param pageSize  每一页的大小
   */
  async getExamPackages(page: number, pageSize?: number | null, kind?: number | null, zyId?: number | null, kId?: number | null, classifyId?: number | null):
    Promise<PagedList<ExamPackageList>> {
    let response = await this.sendAsync<ExamPackageList[]>({
      url: "/api/exam/ExamPackage",
      data: {
        page: page,
        pageSize: pageSize,
        zyId: zyId,
        kId: kId,
        kind: kind,
        classifyId: classifyId
      }
    });
    return {
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
    }
  }
  /**
 * 获得 公开课 所有的学历类型
 */
  async getCourseKindsAsync(): Promise<{ key: number, value: string }[]> {
    let response = await this.sendAsync<{ key: number, value: string }[]>({
      url: "/api/Course/basic/kinds",
    });
    return response.data;
  }
  async getAppExamObj(packageId: number, examId: number) {
    let response = await this.sendAsync<ExamObject>({
      // url: `/api/exam/ExamPackage/${packageId}/exam/${examId}/MoKao`
      url: `/api/ExamApp/exam-packageControl/${packageId}/exam/${examId}/MoKao`
    });
    return response;
  }
  async getAppExamRoomObj(roomId: number, roomExamId: number, uId: number) {
    let response = await this.sendAsync<any>({
      // url: `/api/exam/ExamPackage/${packageId}/exam/${examId}/MoKao`
      url: `/api/ExamApp/exam-roomControl/${roomId}/${roomExamId}?uId=${uId}`
    });
    return response;
  }
  /* 根据试卷ID 获取试卷详情 */
  async getExamPackage(packageId: number) {
    let response = await this.sendAsync<ExamPackage>({
      url: `/api/exam/ExamPackage/${packageId}`
    });
    return response;
  }
  /* 根据试卷ID 获取试卷详情 */
  async getAppExamPackage(packageId: number, uId: number) {
    let response = await this.sendAsync<ExamPackage>({
      url: `/api/exam/ExamPackage/${packageId}`,
      data: {
        uId: uId
      }
    });
    return response;
  }
  /* 根据试卷ID，课程ID 获取试卷信息 */
  async getExam(packageId: number, examId: number) {
    let response = await this.sendAsync<Exam>({
      url: `/api/exam/ExamPackage/${packageId}/exam/${examId}`
    });
    return response;
  }
  /* 获取虚拟考场全部考场 */
  async getExamroom(page: number, mine: boolean, uid: number | null) {
    let data = { page, mine, uid }
    let response = await this.sendAsync<ExamroomList[]>({
      url: `/api/ExamApp/exam-roomControl`,
      data: data
    });
    return {
      currentIndex: parseInt(response.header["p-pageindex"]),
      currentNumber: parseInt(response.header["p-pagenumber"]),
      data: response.data,
      hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
      hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
      pageSize: parseInt(response.header["p-pagesize"]),
      totalItemCount: parseInt(response.header["p-totalitemcount"]),
      maxPageIndex: parseInt(response.header["p-maxpageindex"]),
      maxPageNumber: parseInt(response.header["p-maxpagenumber"])
    }
  }

  /**
   * 获得 考场记录列表 
   */
  async getExamRecordAsync(pageIndex: number = 0, pageSize: number = 12, uId: number): Promise<PagedList<ExamHistoryDto>> {
    let response = await this.sendAsync<ExamHistoryDto[]>({
      url: "/api/ExamApp/mineControl/resources/examRoom",
      data: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        uId: uId
      }
    })
    return {
      currentIndex: parseInt(response.header["p-pageindex"]),
      currentNumber: parseInt(response.header["p-pagenumber"]),
      data: response.data,
      hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
      hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
      pageSize: parseInt(response.header["p-pagesize"]),
      totalItemCount: parseInt(response.header["p-totalitemcount"]),
      maxPageIndex: parseInt(response.header["p-maxpageindex"]),
      maxPageNumber: parseInt(response.header["p-maxpagenumber"])
    };
  }
  /**
     * 获得 获取虚拟考场kind筛选
     * @param kind  （搜索条件  || 筛选项）
     * @param page  当前页数
     * @param pageSize  每一页的大小
     */
  async getExamroomList(page: number, pageSize: number, kind: number, mine: boolean) {
    let data = { page, pageSize, kind, mine }
    let response = await this.sendAsync<ExamroomList[]>({
      url: `/api/exam/rooms`,
      data: data
    });
    return {
      currentIndex: parseInt(response.header["p-pageindex"]),
      currentNumber: parseInt(response.header["p-pagenumber"]),
      data: response.data,
      hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
      hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
      pageSize: parseInt(response.header["p-pagesize"]),
      totalItemCount: parseInt(response.header["p-totalitemcount"]),
      maxPageIndex: parseInt(response.header["p-maxpageindex"]),
      maxPageNumber: parseInt(response.header["p-maxpagenumber"])
    }
  }
  /* 获取考场详情 */
  async getExamroomDesc(roomId: number, uid?: number) {
    let response = await this.sendAsync<any>({
      url: `/api/ExamApp/exam-roomControl/${roomId}?uId=${uid}`,
    });
    return response.data;
  }

  /* 章节练习 */
  async getExamCourse(page: number, kind: number | null, zyId: number | null) {
    kind = kind === 0 ? null : kind
    let data = { page, kind, zyId };
    let response = await this.sendAsync<ExamCourseList[]>({
      url: "/api/exam/Chapter",
      data
    });
    return {
      currentIndex: parseInt(response.header["p-pageindex"]),
      currentNumber: parseInt(response.header["p-pagenumber"]),
      data: response.data,
      hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
      hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
      pageSize: parseInt(response.header["p-pagesize"]),
      totalItemCount: parseInt(response.header["p-totalitemcount"]),
      maxPageIndex: parseInt(response.header["p-maxpageindex"]),
      maxPageNumber: parseInt(response.header["p-maxpagenumber"])
    }
  }
  /* 获取选择的练习章节内容 */
  async getChapterSection(kId: number) {
    let response = await this.sendAsync<chapterSectionList[]>({
      url: `/api/exam/Chapter/sections?kId=${kId}`,
    });
    return response;
  }
  //获取章节练习试题
  async GetChapterExam(chapterid: number, kId: number, examtype?: string) {
    let data = this.combin({ chapterid: chapterid, kId: kId }, { examtype: examtype });
    let response = await this.sendAsync<ExamObject>({
      url: "/api/exam/Chapter/exam",
      data
    });
    return response;
  }
  async postChapterExamObj(exam: ExamObject) {
    let response = await this.sendAsync({
      url: `/api/exam/Chapter/submit`,
      method: 'POST',
      data: exam
    });
    return response;
  }

  async getExamObj(packageId: number, examId: number) {
    let response = await this.sendAsync<ExamObject>({
      url: `/api/exam/ExamPackage/${packageId}/exam/${examId}/MoKao`
    });
    return response;
  }

  async postExamObj(packageId: number, examId: number, exam: ExamObject) {
    let response = await this.sendAsync<ExamObject>({
      url: `/api/exam/ExamPackage/${packageId}/${examId}/submit`,
      method: 'POST',
      data: exam
    });
    return response;
  }

  async getHomeWorkObj(examId: number) {
    let response = await this.sendAsync<ExamObject>({
      url: `/api/exam/homwork/live/${examId}`
    });
    return response;
  }
  async getVideoHomwork(examId: number) {
    let response = await this.sendAsync<ExamObject>({
      url: `/api/exam/homwork/video/${examId}`
    });
    return response;
  }
  async postHomeWorkObj(courseType: number, courseId: number, examId: number, exam: ExamObject) {
    let response = await this.sendAsync<ExamObject>({
      url: `/api/exam/homwork/${courseType}/${courseId}/${examId}/submit`,
      method: 'POST',
      data: exam
    });
    return response;
  }

  async getisAlloed(packageId: number) {
    let response = await this.sendAsync<boolean>({
      url: `/api/exam/ExamPackage/isAlloed/${packageId}`,
    });
    return response.data;
  }
  /**
     * 判断是否已购买某课程
     */
  async gethasItemAsync(itemType: number, itemId: number, uid: number) {
    let response = await this.postFormAsync<boolean>({
      url: `/api/ExamApp/mineControl/hasitem?uId=${uid}&&itemType=${itemType}&&itemId=${itemId}`,
    })
    return response.data;
  }
  /**
   * 获取考点试题
   */
  async getExamKeyPointQusetion(pointId: any) {
    let response = await this.sendAsync<any>({
      url: `/api/ExamKeyPoint/question?pointId=${pointId}`,
    })
    return response.data;
  }
  /**
     * 获取考点试题解析
     */
  async getExamKeyPointAnalysis(uId: number, pointId: any) {
    let response = await this.sendAsync<any>({
      url: `/api/ExamKeyPoint/analysis?uId=${uId}&pointId=${pointId}`,
    })
    return response.data;
  }
  /**获取考点做题记录详情 */
  async getExamKeyPointRecord(uId: number, pointId: any) {
    let response = await this.sendAsync<any>({
      url: `/api/ExamKeyPoint/record?uId=${uId}&pointId=${pointId}`,
    })
    return response.data;
  }

  /**获取每日一练试题 */
  async getDailyTrainingQusetion(uId: number, kcId: number) {
    let response = await this.sendAsync<any>({
      url: `/api/DailyPractice?uId=${uId}&zyId=263&kcId=${kcId}`,
    })
    return response.data;
  }

  /**判断用户每日一练状态 */
  async judgeDailyPractice(uId: number, kcId: number) {
    let response = await this.sendAsync<any>({
      url: `/api/DailyPractice/continuous-day?uId=${uId}&zyId=263&kcId=${kcId}`,
    })
    return response.data;
  }

  /**获取我的每日一练记录 */
  async getDailyPracticeMineRecord(uId: number, kcId: number) {
    let response = await this.sendAsync<any>({
      url: `/api/DailyPractice/mineRecord?uId=${uId}&zyId=263&kcId=${kcId}`,
    })
    return response.data;
  }
  /** 获取每日一练测试成员 */
  async getDailyPracticeMembers(pageIndex: number = 0, pageSize: number = 12, uId: number, desc: boolean, kcId: number = 132, zyId: number = 263): Promise<PagedList<CourseListDto>> {
    let data = this.combin({ pageIndex: pageIndex, pageSize: pageSize }, { uId: uId, desc: desc, zyId: zyId, kcId: kcId });
    let response = await this.sendAsync<any>({
      url: "/api/DailyPractice/members",
      data: data
    });
    return {
      currentIndex: response.header["p-pageindex"],
      currentNumber: response.header["p-pagenumber"],
      data: response.data,
      hasNextPage: response.header["p-hasnextpage"],
      hasPrevPage: response.header["p-hasprevpage"],
      pageSize: response.header["p-pagesize"],
      totalItemCount: response.header["p-totalitemcount"],
      maxPageIndex: response.header["p-maxpageindex"],
      maxPageNumber: response.header["p-maxpagenumber"]
    }
  }



  // async getExamroomExamObj(roomId: number, roomExamId: number) {
  //   let response = await this.sendAsync<ExamroomDesc[]>({
  //     url: `/api/exam/rooms/${roomId}/${roomExamId}`,
  //   });
  //   return response;
  // }

  // async postExamroomExamObj(roomId: number, roomExamId: number, exam) {
  //   let response = await this.sendAsync({
  //     url: `/api/exam/rooms/${roomId}/${roomExamId}/submit`,
  //     method: 'POST',
  //     data: exam
  //   });
  //   return response;
  // }
}
