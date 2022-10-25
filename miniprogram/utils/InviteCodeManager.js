"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteCodeManager = void 0;
var UserClient_1 = require("./UserClient");
var userClient = new UserClient_1.UserClient();
var InviteCodeManager = /** @class */ (function () {
    function InviteCodeManager() {
    }
    /**
     *  尝试 添加缓存
     */
    InviteCodeManager.prototype.TryStorageInviteCode = function (invoiceCode) {
        wx.setStorageSync("InviteCode", invoiceCode);
    };
    /**
     * 获取 邀请码
     */
    InviteCodeManager.prototype.GetStorageInviteCode = function () {
        var response = wx.getStorageSync("InviteCode");
        if (response == null) {
            return null;
        }
        return response;
    };
    InviteCodeManager.prototype.CreatePath = function (path, id, type) {
        var newPath = path;
        var userInfo = userClient.getInfo();
        if (id != null && userInfo != null) {
            newPath = path + "?id=" + id + "&invitedByUserId=" + userInfo.id + "&invitedByType=" + type;
        }
        else if (id == null && userInfo != null) {
            newPath = path + "?invitedByUserId=" + userInfo.id + "&invitedByType=" + type;
        }
        return newPath;
    };
    InviteCodeManager.prototype.createSharePath = function (path) {
        var newPath = path;
        var userInfo = userClient.getInfo();
        if (userInfo != null) {
            if (newPath.indexOf("?")) {
                newPath = path + "&regCode=" + userInfo.invitationCode;
            }
            else {
                newPath = path + "?regCode=" + userInfo.invitationCode;
            }
        }
        return newPath;
    };
    InviteCodeManager.prototype.getInviteCodeFromQueryObject = function (obj) {
        if (obj == null) {
            return null;
        }
        if (obj.regCode == null) {
            return null;
        }
        return obj.regCode;
    };
    InviteCodeManager.prototype.tryStorageInviteCodeFromQueryObject = function (obj) {
        var code = this.getInviteCodeFromQueryObject(obj);
        if (code != null) {
            this.TryStorageInviteCode(code);
            console.debug("InviteCode stored:" + code);
        }
    };
    return InviteCodeManager;
}());
exports.inviteCodeManager = new InviteCodeManager();
