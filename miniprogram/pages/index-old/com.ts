import { UserClient } from "../../utils/UserClient"
import { CourseClient } from "../../utils/courseClient";
let courseClient = new CourseClient()
let userClient = new UserClient();
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
    day(val) {
    },
  },
  lifetimes: {
    ready() {
      if (!this.data.userInfo) {
        userClient.checkLogin();
      }
      this.triggerEvent("getCouponsModal", { val: "" });
      // this.startData();
    },
    detached() {

    }
  },


  methods: {
    goNext(event: any) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      });
    },
  }
})