//课程收藏
declare interface CourseCollectDto{
    collectId:number,
    courseId:number,
    courseTitle:string,
    collectDate:Date
}
//课程观看历史
declare interface CourseRecordDto{
    id:number,
    title:string,
    teacher:string,
    studyUserCount:number,
    courseType:number,//enum RecordType
    courseId:number,
    chapterId:number,
    visitTime:Date,
}