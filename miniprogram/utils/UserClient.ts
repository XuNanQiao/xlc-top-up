import { setting } from "../setting";
import { WebClient } from "./WebClient";

export class UserClient {
  public _userInfoKey = "userInfo";

  /**
 * 判断用户是否登陆
 */
  async checkLogin() {
    const userInfo = await wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.navigateTo({
        url: "/account/login/index"
      })
    }
  }
  /**
 * 获取用户信息
 */
  getInfo(): User | null {
    let info = wx.getStorageSync(this._userInfoKey);
    if (info == null || info == "") {
      return null;
    }
    return info;
  }
  /**
 * 退出登陆
 */
  public clear() {
    wx.removeStorageSync(this._userInfoKey);
  }
  /**
 * 跳转登陆
 */
  navigatorToLoginPage(): void {
    let info = wx.getStorageSync(this._userInfoKey);
    if (info == null || info == "") {
      wx.navigateTo({
        url: "/account/login/index"
      })
    }
  }

  /**
 * 微信绑定登陆注册（手机号+openid）
 */
  public async login(phone: string, data: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

      wx.request({
        url: `${setting.apiEndPoint}/api/Account/signByWechatOpenId`,
        data: data,
        method: "POST",
        header: { "Content-Type": "application/json" },
        success: (res: any) => {
          if (res.data.isSuccess) {
            console.log(res.data.data)

            wx.setStorageSync(this._userInfoKey, res.data.data);
            resolve(res);
          } else {
            resolve(res);
          }
        },
        fail: (res) => {
          reject(res);
        }
      })
    })
  }

  /**
 * 微信登陆
 */
  private wxloginWrapAsync(): Promise<{ code: string, errMsg: string }> {
    return new Promise((resove, reject) => {
      wx.login({
        success: (res: any) => {
          resove(res);
        },
        fail: (res) => {
          reject(res)
        }
      });
    })
  }
  /**
 * 获取微信用户信息
 */
  private wxGetUserInfo() {
    return new Promise((resove, reject) => {
      wx.getUserInfo({
        success: function (res) {
          resove(res);
        }, fail: (res) => {
          reject(res)
        }
      })
    })
  }
  //获取微信绑定手机号
  async getUserPhoneNumberAsync(model: { rawData: string, IV: string, code?: string }): Promise<any> {
    let loginResponse = await this.wxloginWrapAsync();
    model.code = loginResponse.code;
    try {
      let response = await new WebClient().postFormAsync<string>({
        url: `/api/Account/getPhoneNumber`,
        data: model
      });
      return response.data;
    } catch (e) {
      throw e;
    }
  }
  /**
 * 绑定微信登陆用户
 * @param data 绑定用的数据（tel:电话，nickName:昵称，verifyCode:验证码，invitedByCode:用户使用的邀请码（被哪个邀请码邀请） ）
 */
  async bindWechatLoginProviderAsync(data: { tel: string, nickName: string, verifyCode: string, invitedByCode?: string, code?: string, userSource?: string }) {
    let loginResponse = await this.wxloginWrapAsync();
    data["code"] = loginResponse.code;
    data["userSource"] = "小程序";
    let response = await new WebClient().postFormAsync({
      url: `/api/Account/bindlogin-wechatminiapp`,
      data: data
    });
    new WebClient().EnsureStatusCode(response);
  }

  /**
 * 尝试 登陆
 */
  async tryLoginAsync(): Promise<boolean> {
    try {
      await this.loginAsync();
      return true;
    }
    catch (e) {
      console.warn(JSON.stringify(e));
      return false;
    }
  }

  /** * 登陆 
   */
  async loginAsync() {
    let that = this
    let res = await this.wxloginWrapAsync();
    let user = wx.getStorageSync('userInfo')
    if (user) { return }
    let getOpenId = await that.getOpenId(res.code)
    if (getOpenId) {
      await new WebClient().sendAsync<any>({
        url: `/api/Users/user-by-openid?openId=${getOpenId.data}`
      }).then(result => {
        wx.getUserInfo({
          success: function (res: any) {
            result.data.data.nickName = res.userInfo.nickName
            result.data.data.uPic = res.userInfo.avatarUrl
            if (result.data.isSuccess == true) {
              new WebClient().EnsureStatusCode(result);
              wx.setStorageSync("userInfo", result.data.data);
            }
          }
        })


      });
    }
  }
  //判断是否已绑定手机号
  async ifBinding(code: string, userInfo: any): Promise<any> {
    let that = this;
    let data: boolean | null = null
    let res = await that.getOpenId(code);
    console.log(res)
    if (!res.data) { return }
    wx.setStorageSync("openId", res.data.data);
    return new Promise((resove, reject) => {
      new WebClient().sendAsync<any>({
        url: `/api/Users/user-by-openid?openId=${res.data.data}`
      }).then(result => {
        console.log(result)
        if (result.data.isSuccess == false) {
          data = false;
        } else if (result.data.isSuccess == true) {
          result.data.data.nickName = userInfo.nickName
          result.data.data.uPic = userInfo.avatarUrl
          new WebClient().EnsureStatusCode(result);
          wx.setStorageSync("userInfo", result.data.data);
          data = true
        }
        resove(data)
      });
    })
  }
  //openId
  async getOpenId(code: string): Promise<any> {
    return new Promise((resove, reject) => {
      let infoResponse = new WebClient().sendAsync<User>({
        url: `/api/Account/GetOpenIdByIndex?index=2`, data: {
          code: code
        }
      })
      resove(infoResponse);
    })

  }
  /**
  * 提取用户信息
  */
  async fetchUserInfoAsync() {
    let infoResponse = await new WebClient().sendAsync<User>({
      url: `/api/Mine/info`
    })
    new WebClient().EnsureStatusCode(infoResponse);
    wx.setStorageSync("userInfo", infoResponse.data);
    return infoResponse.data
  }
}