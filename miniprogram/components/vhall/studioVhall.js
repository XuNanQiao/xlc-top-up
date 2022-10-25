let myPlugin = require('../../wxcomponents/lib/vhall/index.js');
let crypto = require('../../wxcomponents/lib/cryptojs/cryptojs').Crypto;
const SECRET_KEY = "e5148bdd470174b6a99fcce6842c6e8c";
Component({
  data: {
    definitionsKey: {
      'same': '原画',
      '720p': '超清',
      '480p': '高清',
      '360p': '标清',
      'a': '纯音频'
    },
    playStatusval: 0,
    msg: '',
    timeMsg: '',
    currentTime: '0',
    duration: '0',
    screenStatus: '',
    showSource: false,
    showLine: false,
    options: {
      roomid: '',
      account: '',
      username: '',
      app_key: '',
      signedat: '',
      sign: ''
    },
    selectType: 'doc',
    videoUrl: '',
    showTool: false,
    docWidth: 375,
    playInfo: {
      sourceInfo: {
        lineTypes: ['线路1', '线路2'],
        qualiTypes: ['same', 'a', '720p', '480p', '360p']
      },
      currentLineIndex: 0,
      currentQuality: 'same'
    },
    playRateList: [],
    showPlayRate: false
  },
  properties: {
    vallConfigUrl: {
      type: String,
      value: ''
    },
    nickName: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    ready() {
      let vallConfigUrl = this.properties.vallConfigUrl
      let nickName = this.properties.nickName
      const roomid = this.properties.vallConfigUrl.substring(vallConfigUrl.lastIndexOf("/") + 1);
      const timestamp = new Date().getTime().toString()

      let havedata = this.signData({
        account: "15376403705",
        app_key: "ad493af2fdc36bffbd8515554c85ab8e",
        username: nickName,
        roomid: roomid,
        signedat: timestamp
      });

      this.setData({
        options: {
          account: havedata.account,
          app_key: havedata.app_key,
          roomid: havedata.roomid,
          signedat: havedata.signedat,
          sign: havedata.sign,
          username: havedata.username
        }
      });
      myPlugin.default.setOptions(this.data.options);
    },

  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      myPlugin.default.pause()
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  methods: {
    signData: function (data) {
      let sign = this.getSign(data);
      let result = data;
      result["sign"] = sign;
      return result;
    },
    getSign: function (paramObj) {
      let keys = Reflect.ownKeys(paramObj).sort();
      let signStr = "";
      for (let key of keys) {
        signStr += key + paramObj[key];
      }
      signStr = SECRET_KEY + signStr + SECRET_KEY;
      return this.md5(signStr);
    },
    md5: function (str) {
      return crypto.MD5(str).toString();
    },

    playStatus(msg) {
      this.setData({
        playStatusval: msg.detail.status
      });

    },
    closeChangeType() {
      this.setData({
        showSource: false,
        showLine: false
      });
    },
    changeQualiTypes() {
      this.setData({
        showSource: !this.data.showSource,
        showLine: false
      });
    },
    changeLineTypes() {
      this.setData({
        showLine: !this.data.showLine,
        showSource: false
      });
    },
    changePlayRate() {
      console.log(myPlugin.default.playbackRateList)
      this.setData({
        playRateList: myPlugin.default.playbackRateList,
        showPlayRate: true,
        showMain: false,
      });
    },
    selectPlayRate(e) {
      myPlugin.default.setPlaybackRate(e.target.dataset.type);
      this.setData({
        showPlayRate: false,
        showMain: false,
      });
    },
    selectQualiTypes(e) {
      let playInfo = this.data.playInfo;
      playInfo.currentQuality = e.target.dataset.type;
      this.setData({
        showSource: !this.data.showSource,
        playInfo: playInfo
      });
      myPlugin.default.changePlaySource({
        currentQuality: e.target.dataset.type
      });
    },
    selectLine(e) {
      let playInfo = this.data.playInfo;
      playInfo.currentLineIndex = e.target.dataset.type;
      this.setData({
        showLine: !this.data.showLine,
        playInfo: playInfo
      });
      myPlugin.default.changePlaySource({
        currentLineIndex: e.target.dataset.type
      });
    },
    selectMenu(e) {
      this.setData({
        selectType: e.target.dataset.type
      });
      this.mathWidth();
    },
    getPlaySource(source) {
      let playInfo = source.detail;
      playInfo.sourceInfo.qualiTypes.sort().reverse();
      this.setData({
        playInfo: playInfo
      });
      this.setData({
        msg: JSON.stringify(playInfo)
      });
    },

    onGetMessage(msg) {
      this.setData({
        msg: JSON.stringify(msg.detail)
      });
      let contentMsg = '';
      switch (msg.detail.type) {
        case 'start':
          console.log('直播开始,进入直播')
          contentMsg = '直播开始,进入直播';
          break;
        case 'over':
          contentMsg = '直播结束';
          break;
        case 'kickout':
          contentMsg = '直播被踢出';
          break;
        case 'kickoutRestore':
          contentMsg = '恢复踢出';
          break;
      }
      let _this = this;
      wx.showModal({
        title: '提示',
        content: contentMsg,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            if (msg.detail.type == 'start') {
              myPlugin.default.setOptions(_this.data.options);
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    errorFn(e) {
      wx.showToast({
        title: e.detail.msg,
        icon: 'none',
        duration: 2000
      });
      this.setData({
        msg: JSON.stringify(e.detail)
      });
    },
    screenChange(e) {
      this.setData({
        msg: JSON.stringify(e.detail),
      });
    },
    waiting(e) {
      /* 直播时不会调用此函数 */
      this.setData({
        msg: JSON.stringify(e.detail)
      });
    },
    playUpdate(e) {
      let startH, endH, startM, endM;
      let start = parseInt(e.detail.currentTime)
      let end = parseInt(e.detail.duration)
      if (parseInt(start / 60) < 10) {
        startH = "0" + parseInt(start / 60)
      } else {
        startH = parseInt(start / 60)
      }
      if (start % 60 < 10) {
        startM = "0" + start % 60
      } else {
        startM = start % 60
      }
      if (parseInt(end / 60) < 10) {
        endH = "0" + parseInt(end / 60)
      } else {
        endH = parseInt(end / 60)
      }

      if (end % 60 < 10) {
        endM = "0" + end % 60
      } else {
        endM = end % 60
      }
      /* 播放进度变化时触发, 直播时不会调用此函数 */
      this.setData({
        currentTime: startH + ":" + startM,
        duration: endH + ":" + endM,
        timeMsg: JSON.stringify(e.detail)
      });
    },
  },

});