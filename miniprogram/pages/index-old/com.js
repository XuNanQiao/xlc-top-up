"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserClient_1 = require("../../utils/UserClient");
var courseClient_1 = require("../../utils/courseClient");
var courseClient = new courseClient_1.CourseClient();
var userClient = new UserClient_1.UserClient();
Component({
    properties: {
        day: {
            type: Number,
            default: 0
        }
    },
    data: {
        userInfo: userClient.getInfo(),
    },
    observers: {
        day: function (val) {
        },
    },
    lifetimes: {
        ready: function () {
            if (!this.data.userInfo) {
                userClient.checkLogin();
            }
            this.triggerEvent("getCouponsModal", { val: "" });
            // this.startData();
        },
        detached: function () {
        }
    },
    methods: {
        goNext: function (event) {
            wx.navigateTo({
                url: event.currentTarget.dataset.url
            });
        },
    }
});
