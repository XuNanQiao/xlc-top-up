"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamStateType = exports.SingleChoiceType = exports.ExamNumType = exports.PropertyType = exports.ShowAppointmentEnum = exports.QuestionNums = exports.QuestionType = void 0;
var QuestionType;
(function (QuestionType) {
    /**
     * 题冒题 eg. 问题声明
     */
    QuestionType[QuestionType["QuestionStatement"] = 0] = "QuestionStatement";
    /**
     * 单项选择
     */
    QuestionType[QuestionType["SingleChoice"] = 1] = "SingleChoice";
    /**
     * 多项选择
     */
    QuestionType[QuestionType["MultipleChoice"] = 2] = "MultipleChoice";
    /**
     * 填空
     */
    QuestionType[QuestionType["FillText"] = 3] = "FillText";
    /**
     * 主观题
     */
    QuestionType[QuestionType["Subjective"] = 4] = "Subjective";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var QuestionNums = /** @class */ (function () {
    function QuestionNums() {
        this.name = '';
        this.nums = [];
    }
    return QuestionNums;
}());
exports.QuestionNums = QuestionNums;
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
