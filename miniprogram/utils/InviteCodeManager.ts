import { UserClient } from "./UserClient";
let userClient = new UserClient();
class InviteCodeManager {

    /**
     *  尝试 添加缓存
     */
    TryStorageInviteCode(invoiceCode?: string) {
        wx.setStorageSync("InviteCode", invoiceCode);
    }

    /**
     * 获取 邀请码
     */
    GetStorageInviteCode(): string | null {
        let response = wx.getStorageSync("InviteCode");
        if (response == null) {
            return null;
        }
        return response;
    }

    public CreatePath(path: string, id: number | null, type?: number) {
        let newPath = path;
        let userInfo = userClient.getInfo();
        if (id != null && userInfo != null) {
            newPath = path + "?id=" + id + "&invitedByUserId=" + userInfo.id + "&invitedByType=" + type;
        }
        else if (id == null && userInfo != null) {
            newPath = path + "?invitedByUserId=" + userInfo.id + "&invitedByType=" + type;
        }

        return newPath;

    }

    public createSharePath(path: string) {
        let newPath = path;
        let userInfo = userClient.getInfo();
        if (userInfo != null) {
            if (newPath.indexOf("?")) {
                newPath = path + "&regCode=" + userInfo.invitationCode;
            }
            else {
                newPath = path + "?regCode=" + userInfo.invitationCode;
            }
        }
        return newPath;
    }

    public getInviteCodeFromQueryObject(obj: any): string | null {
        if (obj == null) {
            return null;
        }
        if (obj.regCode == null) {
            return null;
        }
        return obj.regCode;
    }

    public tryStorageInviteCodeFromQueryObject(obj: any): void {
        let code = this.getInviteCodeFromQueryObject(obj);
        if (code != null) {
            this.TryStorageInviteCode(code);
            console.debug(`InviteCode stored:${code}`);
        }
    }
}
export let inviteCodeManager = new InviteCodeManager();