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
exports.StatusCodeError = exports.WebClient = void 0;
var setting_1 = require("../setting");
var WebClient = /** @class */ (function () {
    function WebClient(urlbase) {
        this._base = urlbase ? urlbase : setting_1.setting.apiEndPoint;
        if (this._base) {
            if (this._base.endsWith("/")) {
                this._base = this._base.substr(0, this._base.length - 1);
            }
        }
    }
    /**
     * 底层方法
     */
    WebClient.prototype.sendAsync = function (request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var f = {};
            for (var name in request) {
                if (name == "url") {
                    f[name] = _this.getUrl(request[name]);
                }
                else {
                    f[name] = request[name];
                }
            }
            f.success = function (response) {
                resolve(response);
            };
            f.fail = function (response) {
                reject(response);
            };
            wx.request(f);
        });
    };
    WebClient.prototype.putFormAsync = function (request) {
        if (request.header == null) {
            request.header = {};
        }
        request.method = "PUT";
        request.header["Content-Type"] = "application/x-www-form-urlencoded";
        return this.sendAsync(request);
    };
    WebClient.prototype.postFormAsync = function (request) {
        if (request.header == null) {
            request.header = {};
        }
        request.method = "POST";
        //request.header["Content-Type"] = "application/x-www-form-urlencoded";
        return this.sendAsync(request);
    };
    WebClient.prototype.getUrl = function (urlpart) {
        if (urlpart == null) {
            throw new Error("urlpart \u4E3A\u7A7A");
        }
        if (/^http(s)?\:\/\//.test(urlpart)) {
            return urlpart;
        }
        if (!urlpart.startsWith("/")) {
            urlpart = "/" + urlpart;
        }
        return "" + this._base + urlpart;
    };
    WebClient.prototype.handlerStatusCode = function (code) {
        if (code >= 200 && code < 300) {
            return true;
        }
        return false;
    };
    WebClient.prototype.EnsureStatusCode = function (response) {
        if (!this.handlerStatusCode(response.statusCode)) {
            throw new StatusCodeError("请求时发生错误", response.statusCode, response.data, response.header);
        }
    };
    WebClient.prototype.combin = function (objA, objB) {
        var r = {};
        if (objA != null) {
            for (var name in objA) {
                if (objA[name] !== undefined) {
                    r[name] = objA[name];
                }
            }
        }
        if (objB != null) {
            for (var name in objB) {
                if (objB[name] !== undefined) {
                    r[name] = objB[name];
                }
            }
        }
        return r;
    };
    return WebClient;
}());
exports.WebClient = WebClient;
var StatusCodeError = /** @class */ (function (_super) {
    __extends(StatusCodeError, _super);
    function StatusCodeError(message, statusCode, response, header) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.response = response;
        _this.header = header;
        return _this;
    }
    return StatusCodeError;
}(Error));
exports.StatusCodeError = StatusCodeError;
