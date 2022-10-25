declare interface tokenResposne {
  error?: string
  access_token: string
  expires_in: number
  token_type: string | 'Bearer'
  refresh_token?: string
  openid?: string
}
declare interface AppVersion {
  version: string
  downloadUrl: string
  introduction: string
}

declare interface PagedList<T> {
  currentIndex: number
  currentNumber: number
  hasNextPage: boolean
  hasPrevPage: boolean
  pageSize: number
  maxPageIndex: number
  maxPageNumber: number
  totalItemCount: number
  data: T[]
}

declare interface ApiStateResult {
  isSuccess: boolean
  errorMessage: string
}
declare interface KnowTutorialMessage {
  lecturerAvatar: string
  lecturerId: number
  lecturerNickName: string
  mineTutorialId: number
  userAvatar: string
  userId: number
  userNickName: number
  msgList: msgList[]

}
declare interface msgList {
  content: string
  source: number
  sourceName: string
  type: number
  typeName: string
  updateTime: string
}
declare interface ZhuanYeDto {
  id: number
  name: string
  code: string
  kind: number
  stage: number //专业阶段
  stageName: string
  classifyId?: number
  classifyName: string
  iconUrl: string
}

declare interface KeChengDto {
  Id: number
  name: string
  kc_Type?: number
  kc_Stage?: number
  kind: number
  code: string
}

/**
 * 教师
 */
declare interface TeacherDto {
  id: number
  name: string
  imgSm: string
  img: string
  recommend: boolean
  content: string
  thought: string
  introduction: string
  profession: string
  experience: string
  clicks: number
  addTime: Date | string
  updateTime: Date | string
}
/*
 *模拟考试
 */
declare interface SelectData {
  kind: number | null
  zyId: number
  kcId: number
}
//评论列表
declare interface CommentList {
  reviewId: number
  reviewScore: number
  reviewContent: string
  reviewLikes: number
  reviewTime: Date
  userImg: string
  userName: string
  isLike: boolean
}
//提交评论
declare interface SubReview {
  reviewScore: number
  reviewContent: string
  propertyType: number
  propertyId: number
}
/**
 * 幻灯
 */
declare interface SlidesDto {
  id: number
  adId: number
  ad: ''
  title: string
  img: string
  url: string
  content: string
  order: string
  addTime: Date | string
  updateTime: Date | string
}

/**
 * 资讯
 */
declare interface NewsDto {
  id: number
  lanmuId: number
  fenleiId: number
  provinceId: number
  title: string
  recommend: string
  metaTitle: string
  metaKeyWords: string
  metaDescription: string
  auther: string
  source: string
  editor: string
  isPass: string
  clicks: string
  staticLink: string
  addTime?: string
  updateTime?: string
  img?: string
  introduction: string
  content: string
}
/**
 *  兑换码
 */
declare interface RedeemcodeDto {
  id: string;
  exchangeType: number;
  itemId: number;
  uId?: number | null;
  createdBy: string;
  createdTime: string | Date;
  ExchangeTime?: string | Date | null;
}

/**
 *  学习轨迹
 */
// 节的视频
declare interface UserSectionShowProgress {
  duration: number;
  userMinutes: number;
  userMinutes7Day: number;
  isPlaybackStart: boolean;
}
//节的随堂练习
declare interface UserHomeworkProgress {
  isHomeworkStart: boolean;
  examCount: number;
  doneCount: number;
}
//节的信息 
declare interface UserSectionProgress {
  sectionId: number;
  sectionTitle: string;
  watch: UserSectionShowProgress;
  homework: UserHomeworkProgress;
  watchRate: number;
  watchRate7Day: number;
}
//章的信息
declare interface UserChapterProgress {
  chapterId: number;
  chapterTitle: string;
  sections: UserSectionProgress[];
  watchRate: number;
  watchRate7Day: number;
  allExamCount: number;
  doneExamCount: number;
}
//直播的信息 
declare interface UserLiveCourseProgress {
  courseId: number;
  courseTitle: string;
  courseImg: string;
  sections: UserSectionProgress[];
  watchRate: number;
  watchRate7Day: number;
  allExamCount: number;
  doneExamCount: number;
}
//点播信息
declare interface UserVideoCourseProgress {
  courseId: number;
  courseTitle: string;
  courseImg: string;
  chapters: UserChapterProgress[];
  watchRate: number;
  watchRate7Day: number;
  allExamCount: number;
  doneExamCount: number;
}
//试卷信息
declare interface UserExamProgress {
  examId: number | null;
  examTitle: string;
  examFullScores: number | null;
  examPassScores: number | null;
  userScores: number | null;
  userIsPass: boolean;
}
//考场信息
declare interface UserExamRoomProgress {
  roomId: number;
  roomTitle: number;
  roomIsShowResult: boolean;
  exams: UserExamProgress[];
}
//班型信息
declare interface UserClassesProgress {
  classId: number;
  classTitle: string;
  classImg: string;
  videoCourses: UserVideoCourseProgress[];
  liveCourses: UserLiveCourseProgress[];
  rooms: UserExamRoomProgress[];
  liveWatchRate: number;
  liveExamRate: number;
  videoWatchRate: number;
  videoExamRate: number;
  examRoomRate: number;
}
declare interface CoursePeriod {
  id: number,
  periodName: string,
  startTime: Date,
  endTime: Date,
  summary: string,
  addTime: Date
}
//学生的学习记录
declare interface UserStudyProgress {
  userId: number;
  classes: UserClassesProgress[];
  liveWatchRate: number;
  homeworkRate: number;
  videoWatchRate: number;
  examRoomRate: number;
}
//用户课程
declare interface UserCourseListDto {
  belong: number;
  id: number;
  title: string;
  img: string;
  clicks: number;
  zhuanye: ZhuanYeDto;
  summary: string;
}
/* declare interface StateResult {
  isSuccess: boolean;
  error: string;
} */

declare interface StateResult<T = void> {
  isSuccess: boolean;
  error: string;
  data: T
}

//考试报名
declare interface ExamRegistDto {
  kind: number;
  zyId: number;
  zyTitle: string;
  kId: number;
  kcTitle: string;
  courseId: number;
  courseTitle: string;
}
//成绩登记
declare interface StudentScoreDto {
  kind: number;
  zyId: number;
  zyTitle: string;
  kId: number;
  kcTitle: string;
  courseId: number;
  courseTitle: string;
  score: number,

}

//报考列表
declare interface CourseExamListDto {
  courseId: number,
  courseTitle: string,
  courseImg: string,
  kind: number,
  zyId: number,
  zyTitle: string,
  keChengs: CourseExamKeCheng[]
}

declare interface CourseExamKeCheng {
  kcId: number,
  kcTitle: string,
  enrollmentState: boolean,
  score: number,
  examState: number | null,
  activeEnrollment: boolean
}

//考试报名记录
declare interface ExamHistory {
  id: number;
  studentId: number;
  studentName: string;
  studentTel: string;
  kind: number;
  zyId: number;
  zyTitle: string;
  kId: number;
  kcTitle: string;
  courseId: number;
  courseTitle: string;
  addTime: Date;
  batch: string;
  isConfirmed: boolean;
  teacherId: number | null;
  teacherName: string;
}

//成绩登记记录
declare interface ScoreHistory {
  id: number;
  kind: number;
  zyId: number,
  zyTitle: string,
  kId: number;
  kcTitle: string;
  courseId: number;
  courseTitle: string;
  score: number;
  studentId: number;
  studentName: string;
  studentTel: string;
  examState: number;
  examBatch: string;
  examTime: Date;
  addTime: Date;
  updateTime: Date
}


//资料发放列表
declare interface MaterialCourse {
  courseId: number;
  courseTitle: string;
  courseImg: string;
  docs: CourseDoc[];
}

declare interface CourseDoc {
  docId: number | null;
  docTitle: string;
  docType: string;
  distributeType: string;
  addTime: Date | null;
}

//学习计划列表
declare interface StudentStudyPlanList {
  month: string;
  studentId: number;
  plans: TypeStudyPlan[]
}

declare interface TypeStudyPlan {
  planType: string;
  planDetails: PlanDetail[]
}
declare interface PlanDetail {
  planId: number;
  planTitle: string;
  planContent: string;
  addTime: Date;
}

//课程表
declare interface TimeTableCourse {
  courseId: number,
  courseName: string,
  startTime: Date,
  teacherName: string,
  showName: string | null,
  showId: number | null,
  endTime: Date | null

}
declare interface TimeTable {
  courses: TimeTableCourse[],
  color: string,
  courseType: number
}
declare interface TimeTableCourseFlat {
  courseId: number,
  courseName: string,
  startTime: Date,
  teacherName: string
  color: string,
  courseType: number,
  sectionName: string | null,
  sectionId: number | null,
  endTime: Date | null
}
declare interface DayGroupDto {
  weekNum: number,
  courses: TimeTableCourseFlat[]
}

//课程观看历史
declare interface CourseRecordDto {
  id: number,
  title: string,
  teacher: string,
  studyUserCount: number,
  courseType: number,//enum RecordType
  courseId: number,
  chapterId: number,
  visitTime: Date,
}
//课程收藏
declare interface CourseCollectDto {
  collectId: number,
  courseId: number,
  courseTitle: string,
  collectDate: Date
}


//随堂记录/考场试卷记录
declare interface ExamHistoryDto {
  examId: number,
  resultId: number | null,
  examTitle: string,
  examScore: number,
  examClassifyId: number,
  userScore: number,
  submintDate: Date | null,
  stCount: number,
}
//反馈
declare interface FeedbackDto {
  id: number,
  typeId: number,
  typeName: string,
  title: string,
  content: string | null,
  addTime: Date,
  reply: string | null,
  replyName: string | null,
  replyTime: Date | null,
  uid: number | null,
  userName: string
}

declare interface FeedbackSubmintDto {
  type: number,
  typeName: string,
  title: string,
  content: string,
}


//评论列表
declare interface CommentList {
  reviewId: number,
  reviewScore: number,
  reviewContent: string,
  reviewLikes: number,
  reviewTime: Date,
  userImg: string,
  userName: string,
  isLike: boolean
}

declare interface SubReview {
  reviewScore: number,
  reviewContent: string,
  propertyType: number,
  propertyId: number
}

//奖学金申请
declare interface ScholarshipDto {
  classId: number,
  kcId: number,
  img: string,
  reason: string,
  remark: string
}

//奖学金记录
declare interface ScholarshipListDto {
  id: number,
  classId: number,
  classTitle: string,
  kcId: number,
  kcTitle: string,
  img: string,
  reson: string,
  remark: string,
  applyforTime: Date,
  isProcessed: number,
  processOpinion: string,
  processTime: Date
}

//班主任信息
declare interface TeacherInfoDto {
  teacherId: number,
  teacherName: string,
  teacherImg: string,
  tel: string,
  weChat: string,
  qrCode_WeChat: string,
  qrCode_QQ: string,
  introduction: string,
  experience: string,
  nickname: string | null,
  courses: SimpleCourseDto[]
}

declare interface SimpleCourseDto {
  courseId: number,
  courseTitle: string,
  courseImg: string,
}

declare interface StudentSchoolRoll {
  studentId: number,
  studentName: string,
  admissionTime: string,
  highestEducation: string
}

//课程答疑
declare interface CourseQuestion {
  courseId: number;
  courseType: number;
  itemId: number;
  question: string;
  answerId: number;
  hierarchy: number;
  imgUrlList: string[];
  uId: number
}

declare interface AskedQuestionList {
  questionId: number;
  courseId: number;
  courseType: number;
  itemId: number;
  questionContent: string;
  imgUrlList: string[];
  userId: number;
  userName: string;
  userImg: string;
  addTime: Date;
  // answer?: CourseAnswer;
  answerCount: number;
  answerList: CourseAnswer[];
  firstAnswerChildCount: number;
  isQuality: boolean;
  encourageId: number;
  encourageText: string;
  tree_Path: number;
  tree_Hierarchy: number;
  tree_Leaf: boolean;
}

declare interface CourseAnswer {
  answerId: number;
  answerContent: string;
  imgUrlList: string[];
  addTime: Date | string;
  teacherName: string;
}

declare interface CourseQuestionTreeNode {
  id: number;
  type: number;
  content: string;
  imgUrlList: string[];
  addTime: string | Date;
  addUserName: string;
  addUserImg: string;
  isQuality: boolean;
  encourageText: string;
  treePath: number;
  hierarchy: number;
  leaf: boolean;
  isRoot: boolean;
  answerCount: number;
  questionId: number;
  isHide: boolean;
  showChildState: number;
  firstAnswerId: number;
  isShowCommentBox: boolean;
  children: CourseQuestionTreeNode[];
  firstAnswerChildCount: number;
}

declare interface AskedExamFeedbackDto {
  feedbackId: number;
  examId: number;
  exam: Exam;
  kind: number;
  itemId: number;
  isTiMao: boolean;
  itemIndex: number;
  userId: number;
  feedContent: string;
  // answer?: CourseAnswer;
  feedImgUrlList: string;
  isClosed: boolean;
  addTime: Date | string;
  updateTime: Date | string;
  encourage: string;
  examFeedbackAnswers: ExamFeedbackAnswerDto[];

}

declare interface ExamFeedbackAnswerDto {
  replyId: number;
  reply: string;
  replyImgUrlList: string;
  replyName: string;
  replyTime: Date | string;
}

//线下资料答疑
declare interface OfflineCourseQuestion {
  courseTitle: string;
  question: string;
  imgUrlList: string[];
}

declare interface OfflineCourseAskDto {
  question: OfflineCourseQuestionDto[];
  answers: OfflineCourseAnswerDto[]
}

declare interface OfflineCourseQuestionDto {
  id: number;
  courseId: number;
  courseTitle: string;
  question: string;
  imgUrlList: string;
  userId: number;
  userName: string;
  userTel: number;
  isQuality: boolean;
  encourageId: number;
  encourageText: string;
  addTime: Date | string;
}

declare interface OfflineCourseAnswerDto {
  id: number;
  questionId: number;
  answerContent: string;
  teacherId: number;
  teacherName: string;
  answerImageUrls: string;
  addTime: Date | string;
}

declare interface GroupDto {
  UG_ID: string;
  UG_Name: string;
  UG_CreateTime: Date;
  U_NickName: string;
  U_Name: string;
  UG_ICon: string;
  UG_Notice: string;
  UG_Intro: string;
  UG_MaxPerson: number;
  StatusCode: number;
  UpdateTime: Date;
  EntryCheackID: number;
  IsApproval: number;
  UserCount: number;
}

declare interface MassageDto {
  /// 群ID
  groupId: string;
  /// 消息
  message: string;
  /// 发送人手机号
  fromtelphone: string;
  ///发送人昵称
  userNick: string;
  /// 发送人头像
  userImg: string;
  /// 发送时间
  sendTime: Date;
}
declare interface KnowAudioDto {
  id: number;
  name: string;
  describe: string;
  lecturerId: number;
  lecturerName: string;
  iconUrl: string;
  details: string;
  kcId: number;
  KcName: string;
  order: number;
  playCount: number;
  isAllowFetch: boolean;
  isFreeTrail: boolean;
  freeSeconds: number;
  updateTime: Date;
  items: KnowAudioItemDto[]


}
declare interface KnowAudioItemDto {
  id: number;
  name: string;
  describe: string;
  fileUrl: string;
  long: number;
  oOrder: number;
  updateTime: Date;
}
//推广课程
declare interface PromotionItemDto {
  id: number,
  type: number,
  typeName: string,
  itemId: number,
  itemName: string,
  useGeneral: boolean,
  firstPurchaseAwardRate: number,
  secondPurchaseAwardRate: number,
  updateTime: string,
}

//用户推广统计
declare interface PromotionStatisticsDto {
  accumulatedIncome: number,
  accumulatedCustomerCount: number,
  juniorPromoterCount: number,
  promotionOrderCount: number
}
//推广收入明细
declare interface PromotionIncomeDetailDto {
  type: number,
  typeName: string,
  itemId: number,
  itemName: string,
  detail: number,
  updateTime: string,
  isDirect: boolean
}
//推广订单
declare interface PromotionOrderDto {
  orderId: string,
  customerName: string,
  orderTotalPrice: number,
  totalAward: number,
  isDirect: boolean,
  updateTime: string,
  details: PromotionOrderDetailDto;
}
declare interface PromotionOrderDetailDto {
  type: number,
  typeName: string,
  itemId: number,
  itemName: string,
  itemImg: string,
  price: number,
}


declare interface VideoSegmentDTO {
  id: number,
  vId: string,
  lengthTime: string,
  courseId: number,
  videoType: string,
  progressMarkers: any,
  order: number
}
//查询活动列表
declare interface InteractActivityListDto {
  id: number,
  name: string,
  zyId: number,
  zyName: string,
  sponsor: string,
  order: number,
  poster: string,
  updateTime: string
}
// 查询活动报名成功人员列表
declare interface ApplySuccessUserDto {
  uId: number,
  userName: string,
  avatar: string,
  updateTime: string
}
//获取活动额外报名信息
declare interface ExtraInfoDefineDto {
  fieldName: string
  fieldTip: string
  isRequired: boolean
  type: string
}

// 查询活动票型列表
declare interface InteractActivityTicketSetDto {
  amount: number
  description: string
  endTime: string
  isCollectApplyInfo: boolean
  isFree: boolean
  isNeedAudit: true
  maxSaleCount: number
  minSaleCount: number
  name: string
  price: number
  remainCount: number
  setId: number
  startTime: string
}
// 获取指定票型的活动票券
declare interface InteractActivityTicketDto {
  ticketCode: string
  ticketId: number
}
//获取活动票据
declare interface InteractActivityTicketShowDto {
  activityAddress: string
  activityCity: string
  activityEndTime: string
  activityID: number
  activityName: string
  activityPoster: string
  activityProvince: string
  activityStartTime: string
  isFree: boolean
  price: number
  tel: string
  ticketCode: string
  ticketDescription: string
  ticketId: number
  ticketName: string
  ticketState: string
  userName: string
}
//查询训练营期列表
declare interface KnowCampPeriodListDto {
  entryMode: number
  entryModeName: string
  iconUrl: string
  id: number
  intro: string
  name: string
  price: number
  updateTime: string
  zyId: number
  zyName: string
}
//获取拼团信息列表
declare interface MakeUpGroupDto {
  autoGroup: boolean
  describe: string
  endTime: string
  id: number
  imageSrc: string
  leaderPrice: number
  memberPrice: number
  name: string
  peopleNumber: number
  price: number
  relationID: number
  startTime: string
  state: number
  type: string
  memberlist: MakeUpGroupRecordDto[]
  teamLeaderlist: MemberRecordDto[]
  timeLimit: number
  endTimeDown: any
}
// 团长列表
declare interface MemberRecordDto {
  ID: number
  /// 团长ID
  TeamLeaderID: number
  /// 团长名称
  TeamLeader: string
  /// 头像
  TeamImg: string
  /// 用户手机号
  UserTel: string
  /// 开团时间
  TeamStart: string
  /// 结束时间
  TeamEnd: string
  /// 拼团情况
  TeamSituation: number
  /// 真实参团人数
  JoinNumber: number
  /// 状态
  State: number
  /// 拼团ID
  MakeUpGroupID: number
  /// 拼团人数
  MakeUpGroupSum: number
}
// 团员列表
declare interface MakeUpGroupRecordDto {
  ID: number
  /// 用户ID
  UserID: number
  imgsrc: string
  /// 成员身份  1 团长  2 团员
  membertype: number
  /// 参团时间
  JoinTime: string
  /// 状态
  State: number
  /// 拼团记录ID
  MakeUpGrouprecordID: number
}
//优惠券
declare interface Marketing_Coupons {
  id: number
  type: number
  marketAmount: number
  startTime: string
  endTime: string
  isStop: boolean
  stock: number
  scopeType: number
  productId: number
  productType: number
  name: string
  createTime: string
  limitFullPrice: number
}
//助力
declare interface PowerAssistDTO {
  state: number,//添加字段判断助力状态
  powerAssist: PowerAssist,
  hasPurchased: boolean,//true已领取
  user: PowerAssistUserInfo,/// 记录表主键
  isNeedAssist: boolean//是否需要继续转发
  recordId: number,
  /// 剩余人数
  remainingNumber: number,
  /// 已助力人数
  assistNumuber: number,
  /// 是否助力成功
  isSuccess: boolean,
  /// 对应商品价格
  price: string,
  userNickName: string,
  userAvatar: string,
  isAssist: boolean,
}
declare interface PowerAssist {
  id: number
  title: string
  describe: string
  iconUrl: string
  startTime: string
  endTime: string
  freeLimitAmount: number
  secondMinAmount: number
  secondMaxAmount: number
  secondPrice: number
  thirdMinAmount: number
  thirdMaxAmount: number
  thirdPrice: number
  productType: number
  productId: number
  isStop: boolean
  updateTime: string

}
declare interface PowerAssistUserInfo {
  uId: number,
  addTime: string,
  /// 用户昵称
  userNickName: string,
  /// 用户头像
  userAvatar: string,
}
