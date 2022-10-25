"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeVideoCourseTrackingClient = exports.FreeLiveCourseTrackingClient = exports.VideoCourseTrackingClient = exports.LiveCourseTrackingClient = void 0;
var setting_1 = require("../setting");
var WebSocketTrackingClient = /** @class */ (function () {
    function WebSocketTrackingClient() {
        var _this = this;
        this.socket = null; //SocketTask 类型
        this._isClose = true;
        this._state = false;
        this._lastRetyTime = null;
        this._errorTime = null;
        //#ifdef APP-PLUS
        this.client = "app";
        //#endif
        //#ifdef H5
        //@ts-ignore
        this.client = "wap";
        //#endif 
        //#ifdef MP-WEIXIN
        //@ts-ignore
        this.client = "weixin";
        this.retryCount = 0;
        this.retry = function () {
            if (_this._isClose) {
                _this.doneRetry(); // 取消retry
                if (_this.onDisConnect != null) {
                    _this.onDisConnect(_this);
                }
            }
            else {
                _this.retryCount += 1;
                setTimeout(function () {
                    _this._lastRetyTime = new Date();
                    _this.connect();
                }, 10000);
                if (_this.onRetry != null) {
                    _this.onRetry(_this, _this.retryCount);
                }
            }
        };
    }
    WebSocketTrackingClient.prototype.connect = function () {
        //防止链接未断开多次连接
        if (!this._isClose) {
            return;
        }
        this._isClose = false;
        var header = {};
        // if (!tokenManager.hasValidAccessToken()) {
        //     return;
        // }
        this.socket = wx.connectSocket({
            url: this.getApiUrl(),
            header: header,
            protocols: ["auth-wait"],
            complete: function () {
            }
        });
        if (this.socket != null) {
            wx.showToast({
                title: "开始跟踪",
                icon: "none",
                duration: 1000,
            });
            var that_1 = this;
            setTimeout(function () {
                that_1.sendMsg();
            }, 5000);
            console.log(this.socket, 'no-border');
            this.regEvent(this.socket);
        }
        else {
            console.error("未发现socket");
        }
    };
    WebSocketTrackingClient.prototype.regEvent = function (socket) {
        var _this = this;
        setTimeout(function () {
            _this.doneRetry();
        }, 5000);
        socket.onMessage(function (res) {
            if (res.data == "tracking") {
                console.log("tracking---成功");
                _this.sendMsg();
            }
            else if (res.data == "closing") {
                console.log("closing---断开");
                socket.close();
                console.log("-------已断开--------");
            }
            else {
                if (res.data) {
                    wx.showToast({
                        title: res.data.toString(),
                        icon: "none",
                        duration: 1000,
                    });
                }
                console.log("unknown---断开");
            }
        });
        socket.onError(function (errMsg) {
            wx.showToast({
                title: "\u4F60\u4E0E\u670D\u52A1\u7684\u7684\u94FE\u63A5\u5F02\u5E38\uFF0C\u4E0D\u518D\u8BA1\u65F6!",
                icon: "none",
                duration: 1000,
            });
            console.log(errMsg, "--------onError-------");
            _this._isClose = true;
            socket.close();
            console.log("-------已断开--------");
            _this._errorTime = new Date();
            _this.retry();
        });
        socket.onOpen(function (res) {
        });
        socket.onClose(function () {
            _this._isClose = true;
            console.log("--------onClose-------");
            socket.close();
            console.log("-------已断开--------");
            wx.showToast({
                title: "\u4F60\u4E0E\u670D\u52A1\u7684\u7684\u94FE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u4E0D\u518D\u8BA1\u65F6!",
                icon: "none",
                duration: 1000,
            });
            if (!_this._state) {
                _this.connect();
            }
        });
    };
    WebSocketTrackingClient.prototype.doneRetry = function () {
        if (this._lastRetyTime != null) {
            var now = new Date();
            var span = now.getTime() - this._lastRetyTime.getTime();
            if (span > 1000 * 10) {
                this.retryCount = 0;
                this._lastRetyTime = null;
                this._errorTime = null;
            }
        }
    };
    WebSocketTrackingClient.prototype.sendMsg = function () {
        var that = this;
        setTimeout(function () {
            if (that.socket) {
                that.socket.send({
                    data: "watching"
                });
            }
        }, 5000);
    };
    WebSocketTrackingClient.prototype.onMsg = function () {
        if (this.socket) {
            this.socket.onMessage(function (res) {
                console.log(res);
            });
        }
    };
    WebSocketTrackingClient.prototype.pagesConnect = function (state) {
        if (state === void 0) { state = false; }
        if (state == true) {
            if (this.socket) {
                this._state = true;
                this.socket.close();
            }
        }
    };
    WebSocketTrackingClient.prototype.disConnect = function () {
        this._isClose = true;
        if (this.socket != null) {
            return this.socket.close();
        }
    };
    return WebSocketTrackingClient;
}());
var LiveCourseTrackingClient = /** @class */ (function (_super) {
    __extends(LiveCourseTrackingClient, _super);
    function LiveCourseTrackingClient(courseId, showId) {
        var _this = _super.call(this) || this;
        _this.courseId = courseId;
        _this.showId = showId;
        _this.logName = "LiveCourseTrackingClient";
        return _this;
    }
    LiveCourseTrackingClient.prototype.getApiUrl = function () {
        var info = wx.getStorageSync("userInfo");
        var url = setting_1.setting.apiSocketEndPoint + "/api/Tracking/study/vip-live/ws/" + this.courseId;
        if (this.showId != null) {
            url += "/" + this.showId;
        }
        return url + "?client=" + this.client + "&uId=" + info.id;
    };
    return LiveCourseTrackingClient;
}(WebSocketTrackingClient));
exports.LiveCourseTrackingClient = LiveCourseTrackingClient;
var VideoCourseTrackingClient = /** @class */ (function (_super) {
    __extends(VideoCourseTrackingClient, _super);
    function VideoCourseTrackingClient(courseId, showId) {
        var _this = _super.call(this) || this;
        _this.courseId = courseId;
        _this.showId = showId;
        _this.logName = "VideoCourseTrackingClient";
        return _this;
    }
    VideoCourseTrackingClient.prototype.getApiUrl = function () {
        var info = wx.getStorageSync("userInfo");
        var url = setting_1.setting.apiSocketEndPoint + "/api/Tracking/study/vip-video/ws/" + this.courseId;
        if (this.showId != null) {
            url += "/" + this.showId;
        }
        return url + "?client=" + this.client + "&uId=" + info.id;
    };
    return VideoCourseTrackingClient;
}(WebSocketTrackingClient));
exports.VideoCourseTrackingClient = VideoCourseTrackingClient;
var FreeLiveCourseTrackingClient = /** @class */ (function (_super) {
    __extends(FreeLiveCourseTrackingClient, _super);
    function FreeLiveCourseTrackingClient(courseId) {
        var _this = _super.call(this) || this;
        _this.courseId = courseId;
        _this.logName = "FreeLiveCourseTrackingClient";
        return _this;
    }
    FreeLiveCourseTrackingClient.prototype.getApiUrl = function () {
        var info = wx.getStorageSync("userInfo");
        var url = setting_1.setting.apiSocketEndPoint + "/api/Tracking/study/free-live/ws/" + this.courseId;
        return url + "?client=" + this.client + "&uId=" + info.id;
    };
    return FreeLiveCourseTrackingClient;
}(WebSocketTrackingClient));
exports.FreeLiveCourseTrackingClient = FreeLiveCourseTrackingClient;
var FreeVideoCourseTrackingClient = /** @class */ (function (_super) {
    __extends(FreeVideoCourseTrackingClient, _super);
    function FreeVideoCourseTrackingClient(courseId, showId) {
        var _this = _super.call(this) || this;
        _this.courseId = courseId;
        _this.showId = showId;
        _this.logName = "FreeVideoCourseTrackingClient";
        return _this;
    }
    FreeVideoCourseTrackingClient.prototype.getApiUrl = function () {
        var info = wx.getStorageSync("userInfo");
        var url = setting_1.setting.apiSocketEndPoint + "/api/Tracking/study/free-video/ws/" + this.courseId;
        if (this.showId != null) {
            url += "/" + this.showId;
        }
        return url + "?client=" + this.client + "&uId=" + info.id;
    };
    return FreeVideoCourseTrackingClient;
}(WebSocketTrackingClient));
exports.FreeVideoCourseTrackingClient = FreeVideoCourseTrackingClient;
