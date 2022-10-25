"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserClient_1 = require("../../utils/UserClient");
var courseClient_1 = require("../../utils/courseClient");
var courseClient = new courseClient_1.CourseClient();
var userClient = new UserClient_1.UserClient();
Component({
    properties: {
        width: {
            type: String,
            value: "130rpx"
        },
        height: {
            type: String,
            value: "40rpx"
        },
        fontSize: {
            type: Number,
            value: 1
        },
        length: {
            type: Number,
            value: 4
        }
    },
    data: {
        codeList: []
    },
    lifetimes: {
        ready: function () {
            this.createdCode();
            // this.startData();
        },
    },
    methods: {
        refreshCode: function () {
            this.createdCode();
        },
        createdCode: function () {
            var len = this.data.length, codeList = [], chars = "abcdefhijkmnprstwxyz0123456789", charsLen = chars.length;
            // 生成
            for (var i = 0; i < len; i++) {
                var rgb = [
                    Math.round(Math.random() * 220),
                    Math.round(Math.random() * 240),
                    Math.round(Math.random() * 200)
                ];
                codeList.push({
                    code: chars.charAt(Math.floor(Math.random() * charsLen)),
                    color: "rgb(" + rgb + ")",
                    fontSize: this.data.fontSize + ([Math.floor(Math.random() * 10)] + "rpx"),
                    padding: [Math.floor(Math.random() * 10)] + "rpx",
                    transform: "rotate(" + (Math.floor(Math.random() * 90) -
                        Math.floor(Math.random() * 90)) + "deg)"
                });
            }
            // 指向
            this.setData({
                codeList: codeList
            });
            // 将当前数据派发出去
            this.triggerEvent("update", codeList.map(function (item) { return item.code; }).join(""));
        },
        getStyle: function (data) {
            return "color: " + data.color + "; font-size: " + data.fontSize + "; padding: " + data.padding + "; transform: " + data.transform;
        }
    }
});
