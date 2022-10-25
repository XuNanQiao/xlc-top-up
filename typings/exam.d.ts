declare interface ExamCourseList {
	id: number
	name: string
	kC_Type: number
	kC_Stage: number
	kind: number
	code: string
}

declare interface ExamroomList {
	id: number
	title: string
	kind: number
	description: string
	mode: number
	startUTCTime: string
	endUTCTime: string
	isShowResult: boolean
}

declare interface ExamroomDesc {
	isAllowed: boolean
	reason: string
	room: Room
}

declare interface Room {
	id: number
	title: string
	kind: number
	description: string
	mode: number
	startUTCTime: string
	endUTCTime: string
	exams: Exams[]
}

declare interface Exams {
	roomExamId: number
	doCount: number
	examId: number
	examTitle: string
	examImg: string
	kind: number
	kcId: number
	kcTitle: string
	zyId: number
	zyTitle: string
	classifyId: number
	classifyName: string
	zyflId: number
	zyflTitle: string
	nianFen: number
	testCount: number
	scores: number
	pass_score: number
	ksTime: number
	isDone: boolean
}
declare interface ExamPackageList {
	id: number
	title: string
	kind: number
	kcId: number
	kcTitle: string
	zyId: number
	zyTitle: string
	classifyId: number
	classifyName: string
	zyflId: number
	zyflTitle: string
	nianFen: number
	img: string
	price: number
	oldPrice: number
	examCount: number
}

declare interface ExamPackage {
	id: number
	title: string
	kind: number
	kcId: number
	kcTitle: string
	zyId: number
	zyTitle: string
	classifyId: number
	classifyName: string
	zyflId: number
	zyflTitle: string
	nianFen: number
	img: string
	price: number
	oldPrice: number
	exams: Exam[]
	summary: string
	detail:string
	studentCount:number
}

declare interface Exam {
	id: number
	examTitle: string
	examImg: string
	kind: number
	kcId: number
	kcTitle: string
	zyId: number
	zyTitle: string
	classifyId: number
	classifyName: string
	zyflId: number
	zyflTitle: string
	nianFen: number
	testCount: number
}
declare interface ExamCourseList {
	id: number
	name: string
	kC_Type: number
	kC_Stage: number
	kind: number
	code: string
}

declare interface ExamroomList {
	id: number
	title: string
	kind: number
	description: string
	mode: number
	startUTCTime: string
	endUTCTime: string
	isShowResult: boolean
}

declare interface ExamroomDesc {
	isAllowed: boolean
	reason: string
	room: Room
}
//试卷信息
declare interface UserExamProgress {
	examId: number | null
	examTitle: string
	examFullScores: number | null
	examPassScores: number | null
	userScores: number | null
	userIsPass: boolean
}
//考场信息
declare interface UserExamRoomProgress {
	roomId: number
	roomTitle: number
	roomIsShowResult: boolean
	exams: UserExamProgress[]
}
/*
 *模拟考试
 */
declare interface SelectData {
	kind: number | null
	zyId: number
	kcId: number
}
/*
 *章节练习
 */
declare interface chapterSectionList {
	id: number
	chapterName: string
	kId: number
	kcName: string
}
