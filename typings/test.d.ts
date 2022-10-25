
// // 获取用户首选课程记录
// declare interface StateResult {
//   uId: number
//   kind: number
//   zyId: number
//   kcId: number
//   kcName: string
// }
// 提交每日一练 
declare interface DailyPracticeSubmitDto {
  uId: number
  zyId: number
  kcId: number
  items: DailyPracticeItemSubmitDto[]
}
declare interface DailyPracticeItemSubmitDto {
  shiTiId: number
  answerRecord: string[]
  order: number
}
declare interface SubmitReplyAsync {
  uId: number,
  pointId: number,
  questions: Submitquestions[],
  seconds:number
}
declare interface Submitquestions {
  questionId: number,
  reply: string
}