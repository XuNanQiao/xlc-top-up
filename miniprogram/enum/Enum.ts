/**
 * 订单项 类型
 */
export enum OrderTypeEnum {
  Classes = 0,
  Video = 1,
  Live = 2
}

/**
 * 发票类型
 */
export enum InvoiceTypeEnum {
  person = 0,
  company = 1,
  none = 2
}

/**
 * VIP课 学历类型
 */
export enum T_KindEnum {
  自考辅导 = 1,
  教师资格 = 6,
  学术硕士联考 = 8,
  专业硕士联考 = 9
}

/**
 * 共享课 学历类型
 */
export enum Free_KindEnum {
  自学考试 = 1,
  普通专升本 = 3,
  考研辅导 = 7,
  成考辅导 = 2,
  网教统考辅导 = 4,
  教师资格证 = 6,
  英语等级 = 5,
  计算机等级 = 8,
  注册消防师 = 9,
  工程预算师 = 10
}

export enum ShowAppointmentEnum {

  HideAppointment = 0,
  ShowAppointment = 1,
  ShowAppointmented = 2
}

export enum PropertyType {
  ClassShow,
  LiveShow,
  VideoShow
}


export enum ExamNumType {
  综合题 = 0,
  单选题 = 1,
  多选题 = 2,
  填空题 = 3,
  计算题 = 4
}

export enum SingleChoiceType {
  A = 0,
  B,
  C,
  D,
  E,
  F
}
//考试成绩结果
export enum ExamStateType {
  未确认 = 0,
  已通过 = 1,
  未通过 = 2
}
//用户记录类型
export enum RecordType {
  资料查看 = 1,
  资料下载 = 2,
  直播查看 = 3,
  公开直播查看 = 4,
  点播查看 = 5,
  公开点播查看 = 6,
  随堂练习做题 = 7,
  资料包查看,
  资料包下载,
}
export enum CommentPropertyType {
  PublicLiveCourse = 1,
  DocPackage = 4
}
export enum E_ClassType{
  精品班 = 4,
  协议班 = 1,
  普通班 = 2,
  特价班 = 5,
}