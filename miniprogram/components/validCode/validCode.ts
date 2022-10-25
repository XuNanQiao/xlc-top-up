import { UserClient } from "../../utils/UserClient"
import { CourseClient } from "../../utils/courseClient";
let courseClient = new CourseClient()
let userClient = new UserClient();
Component({
  properties: {
    width: {
      type: String,
      value: "130rpx"
    },
    height: {
      type: String,
      value: "40rpx"
    },
    fontSize: {
      type: Number,
      value: 1
    },
    length: {
      type: Number,
      value: 4
    }
  },
  data: {
    codeList: [] as any
  },
  lifetimes: {
    ready() {
      this.createdCode();
      // this.startData();
    },
  },


  methods: {
    refreshCode() {
      this.createdCode();
    },
    createdCode() {
      let len = this.data.length,
        codeList = [] as any,
        chars = "abcdefhijkmnprstwxyz0123456789",
        charsLen = chars.length;
      // 生成
      for (let i = 0; i < len; i++) {
        let rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200)
        ];
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: this.data.fontSize + `${[Math.floor(Math.random() * 10)]}rpx`,
          padding: `${[Math.floor(Math.random() * 10)]}rpx`,
          transform: `rotate(${Math.floor(Math.random() * 90) -
            Math.floor(Math.random() * 90)}deg)`
        });
      }
      // 指向
      this.setData({
        codeList: codeList
      })
      // 将当前数据派发出去
      this.triggerEvent("update", codeList.map(item => item.code).join(""));
    },
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`;
    }
  }
})