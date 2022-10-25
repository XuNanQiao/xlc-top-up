import { UserClient } from "../../utils/UserClient"
import { CourseClient } from "../../utils/courseClient";
let courseClient = new CourseClient()
let userClient = new UserClient();
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    itemType: {
      type: Number,
      value: 0
    },
    itemId: {
      type: Number,
      value: 0
    },
    gettype: {
      type: Number,
      value: 0
    },
    price: {
      type: Number,
      value: 0
    }
  },
  observers: {
    "itemType,itemId": function (itemType, itemId) {
      if (!this.data.userInfo) {
        this.setData({
          hasthis: false
        })
        return
      } else {
        courseClient.gethasItemAsync(
          itemType,
          itemId,
          this.data.userInfo.id
        ).then(res => {
          this.setData({
            hasthis: res
          })
        })

      }
    },
  },
  data: {
    subFlag: false,
    hasthis: false,
    userInfo: userClient.getInfo(),
    price: 0,
  },

  lifetimes: {
    async created() {
      this.setData({
        price: this.properties.price,
        userInfo: userClient.getInfo(),

      })
      if (!this.data.userInfo) {
        this.setData({
          hasthis: false
        })
        return
      } else {
        let res = await courseClient.gethasItemAsync(
          this.data.itemType,
          this.data.itemId,
          this.data.userInfo.id
        )
        this.setData({
          hasthis: res
        })
      }
      console.log(this.data.hasthis);

    },
    detached() {
    }
  },
  methods: {
    async order() {
      if (this.data.subFlag) {
        return;
      }
      if (!this.data.userInfo) {
        userClient.checkLogin();
        return;
      }
      this.data.subFlag = true;
      if (this.data.itemType == 6) {
        await courseClient.tryAppointMsgAsync(this.data.itemId, this.data.userInfo.id);
      }

      let storageKey = `order${new Date().getTime().toString()}`;
      wx.setStorageSync(storageKey, [
        { itemId: Number(this.data.itemId), itemType: Number(this.data.itemType) }
      ]);
      wx.navigateTo({
        url: `/order/pages/index/index?storageKey=${storageKey}`,
        complete: () => {
          this.setData({
            subFlag: false
          })
        }
      });
    },
  },

})