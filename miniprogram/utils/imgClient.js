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
exports.ImgClient = void 0;
var WebClient_1 = require("./WebClient");
var setting_1 = require("../setting");
var ImgClient = /** @class */ (function (_super) {
    __extends(ImgClient, _super);
    function ImgClient() {
        return _super.call(this, setting_1.setting.apiEndPoint) || this;
    }
    //图片下载
    ImgClient.prototype.downloadImg = function (url) {
        wx.downloadFile({
            url: url,
            success: function (res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function (res) {
                            wx.showToast({
                                title: "保存成功"
                            });
                        },
                        fail: function () {
                            wx.showToast({
                                title: "图片保存失败，请稍后重试",
                                icon: "none"
                            });
                        }
                    });
                }
            },
            fail: function () {
                wx.showToast({
                    title: "图片保存失败，请稍后重试",
                    icon: "none"
                });
            }
        });
    };
    ImgClient.prototype.saveImg = function (imgUrl) {
        var _self = this;
        //获取相册授权
        wx.getSetting({
            success: function (res) {
                if (!res.authSetting["scope.writePhotosAlbum"]) {
                    wx.authorize({
                        scope: "scope.writePhotosAlbum",
                        success: function () {
                            //这里是用户同意授权后的回调
                            _self.saveImgToLocal(imgUrl);
                        },
                        fail: function () {
                        },
                    });
                }
                else {
                    //用户已经授权过了
                    _self.saveImgToLocal(imgUrl);
                }
            },
        });
    };
    ImgClient.prototype.saveImgToLocal = function (imgUrl) {
        var that = this;
        var aa = wx.getFileSystemManager();
        aa.writeFile({
            filePath: wx.env.USER_DATA_PATH + "/test.png",
            data: imgUrl.slice(22),
            encoding: "base64",
            success: function (res) {
                wx.saveImageToPhotosAlbum({
                    filePath: wx.env.USER_DATA_PATH + "/test.png",
                    success: function (res) {
                        wx.showToast({
                            title: "保存成功",
                        });
                    },
                    fail: function (err) {
                        console.log(err);
                    },
                });
            },
            fail: function (err) {
                console.log("writeFile" + err);
            },
        });
    };
    //图片预览
    ImgClient.prototype.previewImg = function (url) {
        wx.previewImage({
            urls: [url]
        });
    };
    return ImgClient;
}(WebClient_1.WebClient));
exports.ImgClient = ImgClient;
