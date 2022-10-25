/**
 * 用户信息
 */
declare interface User {
    id: number,
    userName: string,
    nickName: string,
    tel: string,
    email: string,
    isEmailConfirmed: boolean,
    isTelConfirmed: boolean,
    sex: string,
    uPic: string,
    province: string,
    city: string,
    birthday: Date | string,
    invitationCode: string,
    invitedByCode: string,
    address: string
}
declare interface WxUser {
    nickName: string,
    gender: any,
    avatarUrl: string,
    city: string,
    language: string,
    country: string,
    openid:string
}

/**
 * 公开课潜在用户
 */
declare interface PublicCoursePotentialUser {
    id: number,
    Tel: string,
    CourseId: number,
    CourseTitle: string,
    CourseUrl: string,
    CourseType: number,
    BrowseTime: Date | string,
}

