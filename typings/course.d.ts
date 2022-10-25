

/**
 * 直播 点播 班型 三表联合表
 */
declare interface CourseListDto {
    isState: number//添加字段
    id: number;
    title: string;
    img: string;
    price: number | null;
    tags: string[];
    kecheng: KeChengDto;
    addTime: Date | string;
    updateTime: Date | string;
    courseKind: number;
    summary: string;
    clikcs: number;
    isLive: boolean | null;
    appointmentCount?: number;
    showAppointment?: number;
    keChengCount: number | null;
    liveConfig: string | null;  
}
declare interface liveFreeDateGroupDto {
    day: string,
    today: boolean,
    courses: CourseListDto,
    hasLive: boolean
}
/**
 * 课程
 */
declare interface KeChengDto {//Interface 是一种描述对象或函数的东西
    id: number;
    name: string;
    kC_Type: number;
    kC_Stage: number;
    kind: number;
    code: string;
}

/**
 * 班型表
 */
declare interface ClassDto {
    id: number;
    title: string;
    kecheng: KeChengDto;
    summary: string;
    content: string;
    img: string;
    clikcs: number;
    price: number;
    updateTime: Date | string;
    trialVideoConfig: string;
    agreements: AgreementDto[];
    videoCourses: VideoCourseDto[];
    liveCourses: LiveCourseDto[];
    descriptions: DescriptionDto[];
    features: string;
}

declare interface ClassesListItemDto {
    id: number;
    title: string;
    img: string;
    clicks: number;
    kind: number | null;
    zhuanYe: ZhuanYeDto;
    summary: string;
    price: number;
    oldPrice: number;
    updateTime: Date;
    detailSummaries: DetailSummaries;
}
declare interface DetailSummaries {
    liveCourseCount: number;
    videoCourseCount: number;
    faceToFaceCourseCount: number;
}

// 专栏
declare interface KnowSpecialColumnDto {
    id: number;
    name: string;
    describe: string;
    iconUrl: string;
    details: string;
    zyId: number;
    zyName: string;
    order: number;
    saleCount: number;
    isAllowFetch: boolean;
    updateTime: Date;
    price: number;
    olderPrice: number;
    discount: number;
    itemCount: number;
    items: KnowSpecialColumnItemDto[];
    chatGroupIds: []
}

declare interface KnowSpecialColumnItemDto {
    type: number;
    typeTitle: string;
    order: number;
    contentId: number;
    content: any;
}

/**
 * 协议
 */
declare interface AgreementDto {
    id: number;
    title: string;
    content: string;
    addTime: Date | string;
    updateTime: Date | string;
}

/**
 * 点播表
 */
declare interface VideoCourseDto {
    id: number;
    title: string;
    img: string;
    summary: string;
    content: string;
    kecheng: KeChengDto;
    videoGroups: VideoCourseGroupDto[];
    videos: VideoCourseVideoDto[];
    teacher: TeacherDto[];
    clikcs: number;
    price: number;
    addTime: Date | string;
    updateTime: Date | string;
    trialVideoConfig: string;
    hours: number;
    aliVideoUrl:string
}
/**
 * 点播  组
 */
declare interface VideoCourseGroupDto {
    id: number;
    title: string;
    order: number;
    videos: VideoCourseVideoDto[];
}
/**
 * 点播 视频
 */
declare interface VideoCourseVideoDto {
    id: number;
    title: string;
    videoConfig: string;
    videoDuration: number;
    order: number;
    groupId: number;
}

/**
 * 直播表
 */
declare interface LiveCourseDto {
    id: number;
    title: string;
    img: string;
    kecheng: KeChengDto;
    liveConfig: string;
    liveDuration: number;
    liveTime: Date | string;
    summary: string;
    content: string;
    teacher: TeacherDto;
    clicks: number;
    price: number;
    updateTime: Date | string;
    trialVideoConfig: string;
    playbacks: LivePlaybackDto[];
    periodId: number;
    hours: number;
}

/**
 * 共享直播表
 */
declare interface FreeLiveCourseDto {
    appointmentCount: number;
    id: number;
    title: string;
    img: string;
    keCheng: KeChengDto;
    liveConfig: string;
    isLive: boolean;
    summary: string;
    content: string;
    teacher: TeacherDto;
    updateTime: Date;
    courseType: number;
    suppressLogin: boolean;
    price: number | null;
    isAllowPresent: boolean;
    isAllowShare: boolean;
    kind: number
}
/**
 * 获取关注二维码
 */
declare interface FreeLiveFocus {
    id: number;
    imgUrl: string;
    scope: number;
    liveId: number;
    liveTitle: string;
    describe: string
}
/**
 * 分享排名
 */
declare interface invitationRankValue {
    inviterId: number,
    inviterNickName: string,
    inviterIcon: string,
    count: number

}
// 我的分享

declare interface invitationMyRankValue {
    id: number,
    inviterId: number,
    inviterNickName: string,
    receivedId: number,
    receivedNickName: string,
    scope: number,
    itemId: number,
    addTime: Date

}
/**
 * 共享点播表
 */
declare interface FreeVideoCourseDto {
    id: number;
    title: string;
    img: string;
    summary: string;
    content: string;
    keCheng: KeChengDto;
    teacher: TeacherDto;
    clicks: number;
    updateTime: Date | string;
    courseType: number;
    videoGroups: VideoCourseGroupDto[];
    videos: VideoCourseVideoDto[];
}

/**
 * 直播 回放
 */
declare interface LivePlaybackDto {
    id: number;
    title: string;
    order: number;
    other: string;
    clicks: number | null;
    duration: number;
    endTime: Date | string;
    startTime: Date | string;
    liveState?: string;
    aliVideoUrl: string
    trialVideoConfig: string;
}

/**
 *  班型描述
 */
declare interface DescriptionDto {
    id: number;
    key: string;
    title: string;
    order: number;
    content: string;
}

//班型直播周期
declare interface CoursePeriod {
    id: number,
    periodName: string,
    startTime: Date,
    endTime: Date,
    summary: string,
    addTime: Date
}


declare interface inviteDate {
    url: string,
    kcId: number,
    type: number,
    img: string,
    name: string
}
//学习记录
declare interface CourseLearnRecordDto {
    /// 本次 起始时间
    startTime: string,
    /// 本次 结束时间
    endTime: string,
    /// 学习总分钟数
    minutes: number,
    /// 课程的Id , 当不分章节时，此字段应该被使用
    courseId: number,
    /// 课程名称
    courseName: string,
    /// 课程图片
    courseIcon: string,
    /// 播放的章节的Id
    showId?: number,
    /// 课程类型
    type: number,
    /// 课程类型名称
    typeName: string,
}