Component({
  properties: {
    showDay: {
      type: Boolean,
      value: true
    },
    showColon: {
      type: Boolean,
      value: true
    },
    backgroundColor: {
      type: String,
      value: '#FFFFFF'
    },
    borderColor: {
      type: String,
      value: '#000000'
    },
    color: {
      type: String,
      value: '#000000'
    },
    splitorColor: {
      type: String,
      value: '#000000'
    },
    day: {
      type: Number,
      value: 0
    },
    hour: {
      type: Number,
      value: 0
    },
    minute: {
      type: Number,
      value: 0
    },
    second: {
      type: Number,
      value: 0
    }
  },
  data: {
    timer: null as any,
    syncFlag: false,
    d: '00',
    h: '00',
    i: '00',
    s: '00',
    leftTime: 0,
    seconds: 0
  },
  observers: {
    day(val) {
      this.changeFlag()
    },
    hour(val) {
      this.changeFlag()
    },
    minute(val) {
      this.changeFlag()
    },
    second(val) {
      this.changeFlag()
    }
  },
  lifetimes: {
    ready() {
      // this.startData();
    },
    detached() {
      clearInterval(this.data.timer)
    }
  },


  methods: {
    toSeconds(day, hours, minutes, seconds) {
      return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
    },
    timeUp() {
      clearInterval(this.data.timer)
      this.triggerEvent('timeup')
    },
    countDown() {
      let that = this
      let seconds = that.data.seconds
      let [day, hour, minute, second] = [0, 0, 0, 0] as any
      if (seconds > 0) {
        day = Math.floor(seconds / (60 * 60 * 24))
        hour = Math.floor(seconds / (60 * 60)) - (day * 24)
        minute = Math.floor(seconds / 60) - (day * 24 * 60) - (hour * 60)
        second = Math.floor(seconds) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
      } else {
        this.timeUp()
      }
      if (day < 10) {
        day = '0' + day
      }
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      this.setData({
        d: day,
        h: hour,
        i: minute,
        s: second,
      })
    },
    startData() {
      this.setData({
        seconds: this.toSeconds(this.data.day, this.data.hour, this.data.minute, this.data.second)
      })
      // this.data.seconds = this.toSeconds(this.data.day, this.data.hour, this.data.minute, this.data.second)
      if (this.data.seconds <= 0) {
        return
      }
      this.countDown()
      this.data.timer = setInterval(() => {
        this.setData({
          seconds: this.data.seconds - 1
        })

        if (this.data.seconds < 0) {
          this.timeUp()
          return
        }
        this.countDown()
      }, 1000)
    },
    changeFlag() {
      if (!this.data.syncFlag) {
        this.setData({
          seconds: this.toSeconds(this.data.day, this.data.hour, this.data.minute, this.data.second)
        })
        this.startData();
        this.data.syncFlag = true;
      }
    }
  }
})