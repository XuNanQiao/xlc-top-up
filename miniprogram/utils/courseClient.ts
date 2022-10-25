import { setting } from "../setting";
import { WebClient } from "./WebClient";
let md5 = require("./md5.js");
export class CourseClient extends WebClient {
  constructor() {
    super(setting.apiEndPoint);
  }
  /**
 * 判断是否已购买某课程
 */
  async gethasItemAsync(itemType: number, itemId: number, uId: number) {
   
      let response = await this.postFormAsync<boolean>({
        url: `/api/ExamApp/mineControl/hasitem?uId=${uId}&&itemType=${itemType}&&itemId=${itemId}`,
      })
      return response.data;
    

  }
  //用户该课程是否已预约
  async hasAppoint(entryId: number, uId?: number): Promise<boolean> {
    if (uId) {
      let response = await this.sendAsync<boolean>({
        url: `/api/ExamApp/courseControl/free/live/${entryId}/appointment?uId=${uId}`,
        method: "GET"
      });
      return response.data;

    } else {
      let response = await this.sendAsync<boolean>({
        url: `/api/course/free/live/${entryId}/appointment`,
        method: "GET"
      });
      return response.data;

    }
  }
  //点击预约
  async tryAppointMsgAsync(entryId: number, uId?: number): Promise<boolean> {
    let invited = wx.getStorageSync("inviter");
    if (uId == invited.invitedByUserId) {
      invited.invitedByUserId = null
    }
    try {
      if (uId) {
        let response = await this.postFormAsync({
          url: `/api/ExamApp/courseControl/free/live/${entryId}/appointment?uId=${uId}&inviter=${invited.invitedByUserId}`
        });
        this.EnsureStatusCode(response);
        wx.setStorageSync("inviter", '')
        return true;
      } else {
        let response = await this.postFormAsync({
          url: `/api/course/free/live/${entryId}/appointment?inviter=${invited.invitedByUserId}`
        });
        this.EnsureStatusCode(response);
        wx.setStorageSync("inviter", '')
        return true;
      }

    }
    catch (e) {
      return false;
    }

  }
  /**
    * 获得公开课程列表
    * @param filter （搜索条件  || 筛选项）
    * @param pageIndex  当前页数
    * @param pageSize  每一页的大小
    */
  async getFreeListAsync(pageIndex: number = 0, pageSize: number = 12, q?: string | null, freeType?: number | null, kind?: number | null): Promise<PagedList<CourseListDto>> {
    let data = this.combin({ pageIndex: pageIndex, pageSize: pageSize }, { q: q, freeType: freeType, kind: 3 });
    let response = await this.sendAsync<CourseListDto[]>({
      url: "/api/course/free",
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
  /* 获取公开课日期分组列表 */
  async getLiveFreeDateGroupAsync(PageIndex: number = 0, PageSize: number = 12, q?: string | null, freeType?: number | null, kind?: number | null): Promise<liveFreeDateGroupDto[]> {
    let data = this.combin({ PageIndex: PageIndex, PageSize: PageSize,kind: 3  }, { q: q, freeType: freeType});
    let response = await this.sendAsync<liveFreeDateGroupDto[]>({
      url: "/api/Course/liveFreeDateGroup",
      data: data
    });
    return response.data
  }
  //判断公开课直播zhuanfg
  /* 
  1		直播进行中, 参加者可以进入观看直播
  2		预约中 , 直播预约中,尚未开始
  3		直播已结束
  4		当前为点播
  5		结束且有自动回放
  */
  async getLiveType(liveConfig: string): Promise<any> {
    let index = liveConfig.lastIndexOf("/");
    let id = liveConfig.substring(index + 1);
    const timestamp = new Date().getTime().toString();
    let resData = ""
    let data: any = {
      webinar_id: id,
      auth_type: 2,
      app_key: "ad493af2fdc36bffbd8515554c85ab8e",
      time_seq: 1,
      signed_at: timestamp,
    }
    data.sign = this.getSign(data)
    return new Promise<any>((resolve, reject) => {
      wx.request({
        url: "https://e.vhall.com/api/vhallapi/v2/webinar/state",
        data: data,
        method: "GET",
        success: (res: any) => {
          resolve(res);
        },
        fail: (err: any) => {
          reject(err);
        }
      })
    })

  }
  //sign加密
  private getSign(paramObj: { [key: string]: string }) {
    const APP_KEY = "ad493af2fdc36bffbd8515554c85ab8e";
    const SECRET_KEY = "e5148bdd470174b6a99fcce6842c6e8c";
    let keys = Reflect.ownKeys(paramObj).sort() as string[];
    let signStr = "";
    for (let key of keys) {
      signStr += key + paramObj[key];
    }
    signStr = SECRET_KEY + signStr + SECRET_KEY;
    return md5.hexMD5(signStr).toString();
  }

  /*** 获得 专业列表*/
  async getCourseZhuanYesAsync(kind: number = 3): Promise<ZhuanYeDto[]> {
    let response = await this.sendAsync<ZhuanYeDto[]>({
      url: "/api/Course/basic/zhuanyes",
      data: {
        kind: kind
      }
    })
    return response.data;
  }
  /** * 获得 课程列表 */
  async getCourseKeChengsAsync(kind: number = 3, zyId?: number): Promise<KeChengDto[]> {
    let data = this.combin({ kind: kind, }, { zyId: zyId });

    let response = await this.sendAsync<KeChengDto[]>({
      url: "/api/course/basic/Kechengs",
      data: data
    })
    return response.data;
  }
  /*** 获得 单科列表*/
  async getVideosProfessionListAsync(kind: number = 3, kId?: number, q?: string, zyId?: number, type?: number): Promise<any> {
    let data = this.combin({ kind: kind, }, { zyId: zyId, type: type, kId: kId, q: q });
    let response = await this.sendAsync<any>({
      url: "/api/Course/videos-of-profession",
      data: data
    });
    return response.data
  }
  /**
 *  获得 单个公开课的数据
 * @param liveId  直播Id
 * @param read  
 */
  async getFreeLiveShowAsync(liveId: number, read: boolean = false): Promise<FreeLiveCourseDto> {
    let response = await this.sendAsync<FreeLiveCourseDto>({
      url: `/api/Course/free/live/${liveId}`
    });
    if (read == true) {
      this.getFreeLiveshowReadAsync(liveId);
    }

    return response.data;
  }
  /**
 *  获得直播阅读数
 * @param liveId  直播Id
 * @param supressRead  是否抑制阅读
 */
  async getFreeLiveshowReadAsync(liveId: number, supressRead: boolean = false) {
    let response = await this.sendAsync<number>({
      url: `/api/Course/free/live/${liveId}/read`
    });

    return response.data;
  }

  /**
 *  公开课关注
 * @param kind  类型
 * @param liveId  项目id
 */
  async getFreeVideocourseFocus(kind: number, liveId: number) {
    let response = await this.sendAsync<number>({
      url: `/api/Promotion/follow-qrcode`,
      data: {
        kind: 3,
        liveId: liveId
      }
    });
    return response.data;
  }
  /**
 *  获取推荐排名 
 */
  async invitationRank(top: number, scope: number, itemId: number, uId?: number): Promise<invitationRankValue[]> {
    let response = await this.sendAsync<invitationRankValue[]>({
      url: `/api/Promotion/livePublic-invitation`,
      data: {
        PageSize: top,
        PageIndex: scope,
        livePublicId: itemId,
        uId: uId
      }
    });
    return response.data;
  }
  /**
*  获取我的邀请注册记录 
*/
  async invitationMyRank(uId: number, scope: number, itemId: number): Promise<invitationMyRankValue> {
    let response = await this.sendAsync<invitationMyRankValue>({
      url: `/api/ExamApp/promotionContorl/my-invitation-record`,
      data: {
        uId: uId,
        scope: scope,
        itemId: itemId,
      }
    });
    return response.data;
  }
  /**
   * 获得 我购买的单科列表
   */
  async getSingleCourseListAsync(uId?: number): Promise<CourseListDto[]> {
    let response = await this.sendAsync<CourseListDto[]>({
      url: `/api/ExamApp/mineControl/resources/singleCourse?uId=${uId}`
    })
    return response.data;
  }
  /**
* 获得我的直播公开课
*/
  async getPublicLiveCourseListAsync(uId?: number): Promise<CourseListDto[]> {
    let response = await this.sendAsync<CourseListDto[]>({
      url: `/api/ExamApp/mineControl/resources/publicLiveCourse?uId=${uId}`
    })
    return response.data;
  } /**
* 获得我的兑换课（只包含直播点播课程）
*/ async getExchangeCourseListAsync(uId?: number): Promise<CourseListDto[]> {
    let response = await this.sendAsync<CourseListDto[]>({
      url: `/api/ExamApp/mineControl/resources/exchangeCourse?uId=${uId}`
    })
    return response.data;
  }
  /**
   *  获得 单个直播的数据
   * @param liveId  直播Id
   * @param read  
   */
  async getLiveShowAsync(liveId: number, read: boolean = false): Promise<LiveCourseDto> {
    let response = await this.sendAsync<LiveCourseDto>({
      url: `/api/course/liveshow/${liveId}`
    });
    if (read == true) {
      this.getLiveshowReadAsync(liveId);
    }

    return response.data;
  }

  /***  获得  * @param liveId  直播Id*/
  async getPlaybackAsync(liveId: number, id: number): Promise<LivePlaybackDto> {
    let response = await this.sendAsync<LivePlaybackDto>({
      url: `/api/course/liveshow/${liveId}/${id}`
    });

    return response.data;
  }
  /**
 *  获得直播阅读数
 * @param liveId  直播Id
 * @param supressRead  是否抑制阅读
 */
  async getLiveshowReadAsync(liveId: number, supressRead: boolean = false) {
    let response = await this.sendAsync<number>({
      url: `/api/course/liveshow/${liveId}/read`
    });
    return response.data;
  }
  /**
  *  获得 单个点播的数据
  * @param courseId  点播Id
  * @param read  
  */
  async getVideocourseAsync(courseId: number, read: boolean = false): Promise<VideoCourseDto> {
    let response = await this.sendAsync<VideoCourseDto>({
      url: `/api/course/videoshow/${courseId}`
    });
    if (read == true) {
      this.getVideocourseReadAsync(courseId);
    }

    return response.data;
  }

  /**
   *  获得点播阅读数
   * @param courseId  点播Id
   * @param supressRead  是否抑制阅读
   */
  async getVideocourseReadAsync(courseId: number, supressRead: boolean = false) {
    let response = await this.sendAsync<number>({
      url: `/api/course/videoshow/${courseId}/read`
    });
    return response.data;
  }
  /**
*  获得班型周期列表
* @param classId  班型Id
* @param supressRead  是否抑制阅读
*/
  async getClassPeriodAsync(classId: number): Promise<CoursePeriod[]> {
    let response = await this.sendAsync<CoursePeriod[]>({
      url: `/api/course/classes/${classId}/period`,
    });
    return response.data;
  }
  /**
*  获取用户课程的最新学习记录（最近学习的课程章节）
* @param courseType  可空）课程类型，默认全部：1.直播课、2.点播课、3.直播公开课、4.点播公开课
* @param lastDays  （可空）最近天数
*/
  async courseLearnRecords(uId: number, kind: number = 3, lastDays?: number, courseType?: number,) {
    let data = this.combin({ uId: uId, kind: kind }, { courseType: courseType, lastDays: lastDays });
    let response = await this.sendAsync<CourseLearnRecordDto[]>({
      url: `/api/Tracking/courseLearnRecords`,
      data: data
    });
    return response.data;
  }
  // 随堂讲义、随堂资料下载
  async dataDownload(id: number, docType?: number, courseType?: number) {
    let slide = await this.sendAsync<any>({
      url: "/api/Course/courseDoc",
      data: {
        docType: docType,
        courseType: courseType,
        sectionId: id
      }
    });
    if (slide.data.isSuccess == false) {
      wx.showToast({
        title: "暂无随堂资料。无法下载",
        icon: "none",
      });
      return
    } else if (slide.data.isSuccess == true) {
      let downloadName = slide.data.data.fileName
      let urlVal = await slide.data.data.filePath
      wx.downloadFile({
        url: urlVal,
        success: res => {
          var tempFilePath = res.tempFilePath;
          if (res.statusCode === 200) {
            if (tempFilePath != undefined) {
              wx.saveFile({
                tempFilePath: tempFilePath,
                success: function (res: any) {
                  let savedFilePath = res.savedFilePath
                  wx.showModal({
                    title: "文件保存路径，是否打开文件",
                    content: res.savedFilePath,
                    success: res => {
                      if (res.confirm) {
                        wx.openDocument({
                          filePath: savedFilePath,
                          success: function (res) {

                          }, fail: err => {

                            wx.showModal({
                              title: "文件打开失败",
                            });
                          }
                        })
                      } else if (res.cancel) {
                      }
                    }
                  });
                }
              });


            }
            this.postFormAsync<any>({
              url: "/api/Know/docPack-Download-number?packageId=" + id
            });

          }
        }, fail: res => {
          wx.showModal({
            title: "文件保存失败",
          });
        }
      });

    }
  }
}
