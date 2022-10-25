import { UserClient } from "../../utils/UserClient"
import { CourseClient } from "../../utils/courseClient";
import { chatRobotJson } from "../../utils/chatRobotJson";

let courseClient = new CourseClient()
let userClient = new UserClient();
Component({
  properties: {
    height: {
      type: String,
      default: ''
    }
  },
  data: {
    userInfo: userClient.getInfo(),
    msgList: [] as any,
    my_msg: "",
    dateTime: new Date(),
    scrollAnimation: false,
    scrollTop: 0,
    scrollToView: "msg1",
  },

  lifetimes: {
    ready() {
      for (let item of chatRobotJson) {
        if (item.type == 1) {
          this.data.msgList.push(item);
        }
      }
    },
  },


  methods: {
    submit() {
      let my_msg = this.data.my_msg
      this.setData({
        dateTime: new Date()
      })
      if (!this.data.userInfo) {
        userClient.checkLogin();
        return;
      }
      if (my_msg == "") {
        wx.showToast({
          title: "请输入内容!",
          icon: "none"
        });
        return;
      }
      var myMsg: any = [{
        isMy: true,
        msg: my_msg,
        pic: this.data.userInfo.uPic,
        name: this.data.userInfo.nickName,
        sendTime: this.data.dateTime.toString(),
        type: 2
      }];
      this.setData({
        msgList: this.data.msgList.concat(myMsg)
      })
      setTimeout(() => {
        this.setData({
          dateTime: new Date()
        })
        var errMsgNum = 0;
        for (let item of chatRobotJson) {
          item.sendTime = this.data.dateTime.toString();
          if (item.search.indexOf(my_msg) != -1) {
            this.setData({
              msgList: this.data.msgList.push(item)
            })
            errMsgNum++;
          }
        }
        if (errMsgNum == 0) {
          var errMsg = [{
            isMy: false,
            msg: "你说的啥？",
            pic: "",
            sendTime: this.data.dateTime.toString(),
            name: "新里程",
            type: 2
          }];
          this.setData({
            msgList: this.data.msgList.concat(errMsg),
            my_msg: "",

          })
          this.setData({
            scrollToView: 'msg' + this.data.msgList.length,
          })
        }
        console.log(this.data.msgList, "-------------this.data.msgList");
      }, 2000);
      this.setData({
        scrollToView: 'msg' + this.data.msgList.length,
      })
    },
    setInput(e: any) {
      this.setData({
        my_msg: e.detail.value
      })

    },
    focus() {
      wx.pageScrollTo({
        scrollTop: 670,
        duration: 300
      });
    }
  }
})