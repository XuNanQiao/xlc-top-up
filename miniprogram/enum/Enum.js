"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E_ClassType = exports.CommentPropertyType = exports.RecordType = exports.ExamStateType = exports.SingleChoiceType = exports.ExamNumType = exports.PropertyType = exports.ShowAppointmentEnum = exports.Free_KindEnum = exports.T_KindEnum = exports.InvoiceTypeEnum = exports.OrderTypeEnum = void 0;
/**
 * 订单项 类型
 */
var OrderTypeEnum;
(function (OrderTypeEnum) {
    OrderTypeEnum[OrderTypeEnum["Classes"] = 0] = "Classes";
    OrderTypeEnum[OrderTypeEnum["Video"] = 1] = "Video";
    OrderTypeEnum[OrderTypeEnum["Live"] = 2] = "Live";
})(OrderTypeEnum = exports.OrderTypeEnum || (exports.OrderTypeEnum = {}));
/**
 * 发票类型
 */
var InvoiceTypeEnum;
(function (InvoiceTypeEnum) {
    InvoiceTypeEnum[InvoiceTypeEnum["person"] = 0] = "person";
    InvoiceTypeEnum[InvoiceTypeEnum["company"] = 1] = "company";
    InvoiceTypeEnum[InvoiceTypeEnum["none"] = 2] = "none";
})(InvoiceTypeEnum = exports.InvoiceTypeEnum || (exports.InvoiceTypeEnum = {}));
/**
 * VIP课 学历类型
 */
var T_KindEnum;
(function (T_KindEnum) {
    T_KindEnum[T_KindEnum["\u81EA\u8003\u8F85\u5BFC"] = 1] = "\u81EA\u8003\u8F85\u5BFC";
    T_KindEnum[T_KindEnum["\u6559\u5E08\u8D44\u683C"] = 6] = "\u6559\u5E08\u8D44\u683C";
    T_KindEnum[T_KindEnum["\u5B66\u672F\u7855\u58EB\u8054\u8003"] = 8] = "\u5B66\u672F\u7855\u58EB\u8054\u8003";
    T_KindEnum[T_KindEnum["\u4E13\u4E1A\u7855\u58EB\u8054\u8003"] = 9] = "\u4E13\u4E1A\u7855\u58EB\u8054\u8003";
})(T_KindEnum = exports.T_KindEnum || (exports.T_KindEnum = {}));
/**
 * 共享课 学历类型
 */
var Free_KindEnum;
(function (Free_KindEnum) {
    Free_KindEnum[Free_KindEnum["\u81EA\u5B66\u8003\u8BD5"] = 1] = "\u81EA\u5B66\u8003\u8BD5";
    Free_KindEnum[Free_KindEnum["\u666E\u901A\u4E13\u5347\u672C"] = 3] = "\u666E\u901A\u4E13\u5347\u672C";
    Free_KindEnum[Free_KindEnum["\u8003\u7814\u8F85\u5BFC"] = 7] = "\u8003\u7814\u8F85\u5BFC";
    Free_KindEnum[Free_KindEnum["\u6210\u8003\u8F85\u5BFC"] = 2] = "\u6210\u8003\u8F85\u5BFC";
    Free_KindEnum[Free_KindEnum["\u7F51\u6559\u7EDF\u8003\u8F85\u5BFC"] = 4] = "\u7F51\u6559\u7EDF\u8003\u8F85\u5BFC";
    Free_KindEnum[Free_KindEnum["\u6559\u5E08\u8D44\u683C\u8BC1"] = 6] = "\u6559\u5E08\u8D44\u683C\u8BC1";
    Free_KindEnum[Free_KindEnum["\u82F1\u8BED\u7B49\u7EA7"] = 5] = "\u82F1\u8BED\u7B49\u7EA7";
    Free_KindEnum[Free_KindEnum["\u8BA1\u7B97\u673A\u7B49\u7EA7"] = 8] = "\u8BA1\u7B97\u673A\u7B49\u7EA7";
    Free_KindEnum[Free_KindEnum["\u6CE8\u518C\u6D88\u9632\u5E08"] = 9] = "\u6CE8\u518C\u6D88\u9632\u5E08";
    Free_KindEnum[Free_KindEnum["\u5DE5\u7A0B\u9884\u7B97\u5E08"] = 10] = "\u5DE5\u7A0B\u9884\u7B97\u5E08";
})(Free_KindEnum = exports.Free_KindEnum || (exports.Free_KindEnum = {}));
var ShowAppointmentEnum;
(function (ShowAppointmentEnum) {
    ShowAppointmentEnum[ShowAppointmentEnum["HideAppointment"] = 0] = "HideAppointment";
    ShowAppointmentEnum[ShowAppointmentEnum["ShowAppointment"] = 1] = "ShowAppointment";
    ShowAppointmentEnum[ShowAppointmentEnum["ShowAppointmented"] = 2] = "ShowAppointmented";
})(ShowAppointmentEnum = exports.ShowAppointmentEnum || (exports.ShowAppointmentEnum = {}));
var PropertyType;
(function (PropertyType) {
    PropertyType[PropertyType["ClassShow"] = 0] = "ClassShow";
    PropertyType[PropertyType["LiveShow"] = 1] = "LiveShow";
    PropertyType[PropertyType["VideoShow"] = 2] = "VideoShow";
})(PropertyType = exports.PropertyType || (exports.PropertyType = {}));
var ExamNumType;
(function (ExamNumType) {
    ExamNumType[ExamNumType["\u7EFC\u5408\u9898"] = 0] = "\u7EFC\u5408\u9898";
    ExamNumType[ExamNumType["\u5355\u9009\u9898"] = 1] = "\u5355\u9009\u9898";
    ExamNumType[ExamNumType["\u591A\u9009\u9898"] = 2] = "\u591A\u9009\u9898";
    ExamNumType[ExamNumType["\u586B\u7A7A\u9898"] = 3] = "\u586B\u7A7A\u9898";
    ExamNumType[ExamNumType["\u8BA1\u7B97\u9898"] = 4] = "\u8BA1\u7B97\u9898";
})(ExamNumType = exports.ExamNumType || (exports.ExamNumType = {}));
var SingleChoiceType;
(function (SingleChoiceType) {
    SingleChoiceType[SingleChoiceType["A"] = 0] = "A";
    SingleChoiceType[SingleChoiceType["B"] = 1] = "B";
    SingleChoiceType[SingleChoiceType["C"] = 2] = "C";
    SingleChoiceType[SingleChoiceType["D"] = 3] = "D";
    SingleChoiceType[SingleChoiceType["E"] = 4] = "E";
    SingleChoiceType[SingleChoiceType["F"] = 5] = "F";
})(SingleChoiceType = exports.SingleChoiceType || (exports.SingleChoiceType = {}));
//考试成绩结果
var ExamStateType;
(function (ExamStateType) {
    ExamStateType[ExamStateType["\u672A\u786E\u8BA4"] = 0] = "\u672A\u786E\u8BA4";
    ExamStateType[ExamStateType["\u5DF2\u901A\u8FC7"] = 1] = "\u5DF2\u901A\u8FC7";
    ExamStateType[ExamStateType["\u672A\u901A\u8FC7"] = 2] = "\u672A\u901A\u8FC7";
})(ExamStateType = exports.ExamStateType || (exports.ExamStateType = {}));
//用户记录类型
var RecordType;
(function (RecordType) {
    RecordType[RecordType["\u8D44\u6599\u67E5\u770B"] = 1] = "\u8D44\u6599\u67E5\u770B";
    RecordType[RecordType["\u8D44\u6599\u4E0B\u8F7D"] = 2] = "\u8D44\u6599\u4E0B\u8F7D";
    RecordType[RecordType["\u76F4\u64AD\u67E5\u770B"] = 3] = "\u76F4\u64AD\u67E5\u770B";
    RecordType[RecordType["\u516C\u5F00\u76F4\u64AD\u67E5\u770B"] = 4] = "\u516C\u5F00\u76F4\u64AD\u67E5\u770B";
    RecordType[RecordType["\u70B9\u64AD\u67E5\u770B"] = 5] = "\u70B9\u64AD\u67E5\u770B";
    RecordType[RecordType["\u516C\u5F00\u70B9\u64AD\u67E5\u770B"] = 6] = "\u516C\u5F00\u70B9\u64AD\u67E5\u770B";
    RecordType[RecordType["\u968F\u5802\u7EC3\u4E60\u505A\u9898"] = 7] = "\u968F\u5802\u7EC3\u4E60\u505A\u9898";
    RecordType[RecordType["\u8D44\u6599\u5305\u67E5\u770B"] = 8] = "\u8D44\u6599\u5305\u67E5\u770B";
    RecordType[RecordType["\u8D44\u6599\u5305\u4E0B\u8F7D"] = 9] = "\u8D44\u6599\u5305\u4E0B\u8F7D";
})(RecordType = exports.RecordType || (exports.RecordType = {}));
var CommentPropertyType;
(function (CommentPropertyType) {
    CommentPropertyType[CommentPropertyType["PublicLiveCourse"] = 1] = "PublicLiveCourse";
    CommentPropertyType[CommentPropertyType["DocPackage"] = 4] = "DocPackage";
})(CommentPropertyType = exports.CommentPropertyType || (exports.CommentPropertyType = {}));
var E_ClassType;
(function (E_ClassType) {
    E_ClassType[E_ClassType["\u7CBE\u54C1\u73ED"] = 4] = "\u7CBE\u54C1\u73ED";
    E_ClassType[E_ClassType["\u534F\u8BAE\u73ED"] = 1] = "\u534F\u8BAE\u73ED";
    E_ClassType[E_ClassType["\u666E\u901A\u73ED"] = 2] = "\u666E\u901A\u73ED";
    E_ClassType[E_ClassType["\u7279\u4EF7\u73ED"] = 5] = "\u7279\u4EF7\u73ED";
})(E_ClassType = exports.E_ClassType || (exports.E_ClassType = {}));
