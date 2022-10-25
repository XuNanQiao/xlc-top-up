export interface Message {
  id: string,
  messageType: KnownMessageType,
  title: string,
  notifyTime: string | Date,
  expireTime: string | Date,
  isRead?: boolean,
  readTime?: string | Date,
  detail: LiveCourseStartMessageDetail
}

export type livecourse_start = 'livecourse_start';
export type text_message = 'text_message';
export type url_message = 'url_message';
export type examroom_start = 'examroom_start';
export type examroom_result_published = 'examroom_result_published';
export type educational_notice = 'educational_notice'

export type KnownMessageType = url_message | text_message |
  livecourse_start | examroom_start | examroom_result_published |
  educational_notice;

export interface UrlMessageDetail {
  messageType: url_message,
  title: string,
  url: string
}

export interface TextMessageDetail {
  messageType: text_message,
  title: string,
  content: string
}

export interface LiveCourseStartMessageDetail {
  messageType: livecourse_start,
  title: string,
  courseId: number,
  courseName: string,
  courseImg: string,
  playbackId: number,
  playbackName: string,
  startTime: string | Date,
  endTime: string | Date,
}

export interface ExamRoomStartMessageDetail {
  messageType: examroom_start,
  title: string,
  roomId: string,
  roomName: string,
  startTime: string | Date,
  endTime: string | Date,
}

export interface ExamRoomResultPublishedMessageDetail {
  messageType: examroom_result_published,
  title: string,
  roomId: string,
  roomName: string,
  startTime: string | Date,
  endTime: string | Date,
  publishAt: string | Date,
}

export interface EducationalNoticeMessageDetail {
  messageType: educational_notice,
  title: string,
  content: string,
}