export interface Component {
  additional: { [key: string]: any }
}

export interface ExamObject extends Component {
  name: string
  totalScores: number
  testTimeMinutes: number
  questionGroups: QuestionGroup[]
}

export interface QuestionGroup extends Component {
  name: string
  eachScores: number
  questions: (
    | QuestionBase
    | SingleChoiceQuestionv1
    | MultipleChoiceQuestionv1
    | FillTextQuestion
    | StatementQuestion)[]
}

export interface QuestionBase extends Component {
  questionType: QuestionType
  questionStem: string
  scores: number
  [key: string]: any
}

export enum QuestionType {
	/**
	 * 题冒题 eg. 问题声明
	 */
  QuestionStatement,

	/**
	 * 单项选择
	 */
  SingleChoice,

	/**
	 * 多项选择
	 */
  MultipleChoice,

	/**
	 * 填空
	 */
  FillText,

	/**
	 * 主观题
	 */
  Subjective
}

/**
 * 1.0 版本单项选择
 */
export interface SingleChoiceQuestionv1 extends QuestionBase {
  options: string
  optionsLength: number
  answer: string
  analysis: string
}

/**
 * 多项选择题v1
 */
export interface MultipleChoiceQuestionv1 extends QuestionBase {
  options: string
  optionsLength: number
  answer: string
  analysis: string
}

/**
 * 填空题
 */
export interface FillTextQuestion extends QuestionBase {
  answer: string
  analysis: string
}

export interface StatementQuestion extends QuestionBase {
  SubQuestions: (SingleChoiceQuestionv1 | MultipleChoiceQuestionv1 | FillTextQuestion | SubjectiveQuestion)[]
}

export interface SubjectiveQuestion extends QuestionBase {
  answer: string
  analysis: string
}

export class QuestionNums {
  name: string = ''
  nums: number[] = []
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
