"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserClient_1 = require("../../utils/UserClient");
var courseClient_1 = require("../../utils/courseClient");
var chatRobotJson_1 = require("../../utils/chatRobotJson");
var courseClient = new courseClient_1.CourseClient();
var userClient = new UserClient_1.UserClient();
Component({
    properties: {
        height: {
            type: String,
            default: ''
        }
    },
    data: {
        userInfo: userClient.getInfo(),
        msgList: [],
        my_msg: "",
        dateTime: new Date(),
        scrollAnimation: false,
        scrollTop: 0,
        scrollToView: "msg1",
    },
    lifetimes: {
        ready: function () {
            for (var _i = 0, chatRobotJson_2 = chatRobotJson_1.chatRobotJson; _i < chatRobotJson_2.length; _i++) {
                var item = chatRobotJson_2[_i];
                if (item.type == 1) {
                    this.data.msgList.push(item);
                }
            }
        },
    },
    methods: {
        submit: function () {
            var _this = this;
            var my_msg = this.data.my_msg;
            this.setData({
                dateTime: new Date()
            });
            if (!this.data.userInfo) {
                userClient.checkLogin();
                return;
            }
            if (my_msg == "") {
                wx.showToast({
                    title: "请输入内容!",
                    icon: "none"
                });
                return;
            }
            var myMsg = [{
                    isMy: true,
                    msg: my_msg,
                    pic: this.data.userInfo.uPic,
                    name: this.data.userInfo.nickName,
                    sendTime: this.data.dateTime.toString(),
                    type: 2
                }];
            this.setData({
                msgList: this.data.msgList.concat(myMsg)
            });
            setTimeout(function () {
                _this.setData({
                    dateTime: new Date()
                });
                var errMsgNum = 0;
                for (var _i = 0, chatRobotJson_3 = chatRobotJson_1.chatRobotJson; _i < chatRobotJson_3.length; _i++) {
                    var item = chatRobotJson_3[_i];
                    item.sendTime = _this.data.dateTime.toString();
                    if (item.search.indexOf(my_msg) != -1) {
                        _this.setData({
                            msgList: _this.data.msgList.push(item)
                        });
                        errMsgNum++;
                    }
                }
                if (errMsgNum == 0) {
                    var errMsg = [{
                            isMy: false,
                            msg: "你说的啥？",
                            pic: "",
                            sendTime: _this.data.dateTime.toString(),
                            name: "新里程",
                            type: 2
                        }];
                    _this.setData({
                        msgList: _this.data.msgList.concat(errMsg),
                        my_msg: "",
                    });
                    _this.setData({
                        scrollToView: 'msg' + _this.data.msgList.length,
                    });
                }
                console.log(_this.data.msgList, "-------------this.data.msgList");
            }, 2000);
            this.setData({
                scrollToView: 'msg' + this.data.msgList.length,
            });
        },
        setInput: function (e) {
            this.setData({
                my_msg: e.detail.value
            });
        },
        focus: function () {
            wx.pageScrollTo({
                scrollTop: 670,
                duration: 300
            });
        }
    }
});
