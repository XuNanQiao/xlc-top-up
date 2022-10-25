import { WebClient } from "./WebClient";
import { setting } from "../setting";
export class PutUserInfo extends WebClient {
  public _userInfoKey = "userInfo";
  constructor() {
    super(setting.apiEndPoint)
  }
  //更新用户信息
  async putUser(userInfo: User): Promise<any> {
    let response = await this.sendAsync<any>({
      method: "PUT",
      url: `/api/ExamApp/mineControl/info?id=${userInfo.id}&uPic=${userInfo.uPic}&userName=${userInfo.userName}&nickName=${userInfo.nickName}&invitationCode=${userInfo.invitationCode}&tel=${userInfo.tel}&isEmailConfirmed=${userInfo.isEmailConfirmed}&isTelConfirmed=${userInfo.isTelConfirmed}&address=${userInfo.address}&birthday=${userInfo.birthday}&city=${userInfo.city}&invitedByCode=${userInfo.invitedByCode}&province=${userInfo.province}&sex=${userInfo.sex}`
    });
    if (response.data.isSuccess) {
      wx.showToast({
        title: "修改成功！",
        icon: "none"
      })
      if (userInfo.id != null || userInfo.id != undefined) {
        wx.setStorageSync(this._userInfoKey, userInfo);
      }
    }
  }
}