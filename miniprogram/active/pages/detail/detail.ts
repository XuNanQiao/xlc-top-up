// index.ts
// 获取应用实例
const app = getApp()
import { WebClient } from "../../../utils/WebClient";
import { CourseClient } from "../../../utils/courseClient";

import { MakeUpGroup } from "../../../utils/MakeUpGroup";
let makeUpGroup = new MakeUpGroup()
let courseClient = new CourseClient()
let webClient = new WebClient();
Page({
  data: {
    yourUrl: '' as any
  },

  onLoad: async function (option) {
    this.setData({
      yourUrl: option.url
    })
    //判断是否是赠送
    if (option.invitedByUserId) {
      let invited: any = {
        invitedByUserId: option.invitedByUserId,
        invitedByType: option.invitedByType,
        kcid: option.id
      };
      wx.setStorageSync("inviter", invited);
    }
  },
})
