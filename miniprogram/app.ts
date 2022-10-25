// app.ts
App({
  globalData: { val: "huangenai" },
  onLaunch() {
  },
  //小程序上页刷新 
  reloadUp: function () {
    var pages: any = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    let OldOptions = null;
    if (prevPage.option) {
      OldOptions = prevPage.option;
    } else if (prevPage.option) {
      OldOptions = prevPage.option;
    } else {
      OldOptions = null
    }
    if (OldOptions) {
      currPage.onLoad(OldOptions);
    } else {
      currPage.onLoad();
    }

  },
  reloadCurrent: function (Options?: any) {
    var pages: any = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面 
    if (Options) {
      currPage.setData({
        ifOnShow: false,

      })
      currPage.onLoad(Options);
    } else {
      currPage.setData({
        ifOnShow: false,

      })
      currPage.onLoad();
    }


  },

  //时间修改
  dateShow: function (time: any) {
    if (
      new Date(time).toLocaleDateString() == new Date().toLocaleDateString()
    ) {
      return "今天" + new Date(time).toTimeString().substring(0, 5);
    } else if (
      new Date(time).toLocaleDateString() ==
      new Date(this.GetDateStr(-1)).toLocaleDateString()
    ) {
      return "昨天" + new Date(time).toTimeString().substring(0, 5);
    } else {
      return (
        new Date(time).toLocaleDateString() +
        " " +
        new Date(time).toTimeString().substring(0, 5)
      );
    }
  },
  countDown: async function (dateVal: Date, date2Val?: Date) {
    //倒计时差计算
    var date1 = dateVal; //开始时间
    var date2   //结束时间
    if (date2Val) {
      date2 = date2Val;
    } else {
      date2 = new Date(); //结束时间
    }
    var date3 = new Date(date1).getTime() - new Date(date2).getTime(); //时间差的毫秒数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    let time = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      Dvalue: date3
    }
    return time

  },
  // 获取时间
  GetDateStr: function (AddDayCount: any) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y: number = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
  }
})