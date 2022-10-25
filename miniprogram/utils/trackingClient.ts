import { setting } from "../setting";

abstract class WebSocketTrackingClient {
  private socket: any | null = null; //SocketTask 类型
  private _isClose = true;
  private _state = false;
  private _lastRetyTime: Date | null = null;
  private _errorTime: Date | null = null;
  //#ifdef APP-PLUS
  public client: string = "app";
  //#endif
  //#ifdef H5
  //@ts-ignore
  public client: string = "wap";
  //#endif 
  //#ifdef MP-WEIXIN
  //@ts-ignore
  public client: string = "weixin";
  //#endif


  abstract getApiUrl(): string;
  protected abstract logName: string;

  connect() {
    //防止链接未断开多次连接
    if (!this._isClose) {
      return;
    }
    this._isClose = false
    let header: any = {};
    // if (!tokenManager.hasValidAccessToken()) {
    //     return;
    // }
    this.socket = wx.connectSocket({
      url: this.getApiUrl(),
      header: header,
      protocols: ["auth-wait"],
      complete: () => {

      }
    });

    if (this.socket != null) {
      wx.showToast({
        title: "开始跟踪",
        icon: "none",
        duration: 1000,
      });
      let that = this;
      setTimeout(() => {
        that.sendMsg();
      }, 5000);
      console.log(this.socket, 'no-border');

      this.regEvent(this.socket);
    } else {
      console.error("未发现socket");
    }
  }

  private regEvent(socket: any) {

    setTimeout(() => {
      this.doneRetry();
    }, 5000);

    socket.onMessage(res => {
      if (res.data == "tracking") {
        console.log("tracking---成功")
        this.sendMsg();
      } else if (res.data == "closing") {
        console.log("closing---断开");
        socket.close();
        console.log("-------已断开--------");
      } else {
        if (res.data) {
          wx.showToast({
            title: res.data.toString(),
            icon: "none",
            duration: 1000,
          });
        }

        console.log("unknown---断开")
      }
    })
    socket.onError(errMsg => {
      wx.showToast({
        title: `你与服务的的链接异常，不再计时!`,
        icon: "none",
        duration: 1000,
      });
      console.log(errMsg, "--------onError-------");
      this._isClose = true;
      socket.close();
      console.log("-------已断开--------");

      this._errorTime = new Date();
      this.retry();
    })
    socket.onOpen(res => {
    })

    socket.onClose(() => {
      this._isClose = true;
      console.log("--------onClose-------");
      socket.close();
      console.log("-------已断开--------");
      wx.showToast({
        title: `你与服务的的链接已断开，不再计时!`,
        icon: "none",
        duration: 1000,
      });
      if (!this._state) {
        this.connect()
      }
    })
  }

  private retryCount: number = 0;
  private retry = () => {
    if (this._isClose) {
      this.doneRetry();// 取消retry
      if (this.onDisConnect != null) {
        this.onDisConnect(this);
      }
    }
    else {
      this.retryCount += 1;
      setTimeout(() => {
        this._lastRetyTime = new Date();
        this.connect();
      }, 10000);

      if (this.onRetry != null) {
        this.onRetry(this, this.retryCount);
      }

    }
  }

  private doneRetry() {
    if (this._lastRetyTime != null) {
      let now = new Date();
      let span = now.getTime() - this._lastRetyTime.getTime();
      if (span > 1000 * 10) {
        this.retryCount = 0;
        this._lastRetyTime = null;
        this._errorTime = null;
      }
    }

  }

  sendMsg() {
    let that = this;
    setTimeout(() => {
      if (that.socket) {
        that.socket.send({
          data: "watching"
        })
      }
    }, 5000);
  }

  onMsg() {
    if (this.socket) {
      this.socket.onMessage(res => {
        console.log(res)
      })
    }
  }

  pagesConnect(state: boolean = false) {
    if (state == true) {
      if (this.socket) {
        this._state = true;
        this.socket.close();
      }
    }
  }

  disConnect() {
    this._isClose = true;
    if (this.socket != null) {
      return this.socket.close();
    }
  }

  onConnect: ((sender: this) => any) | undefined;
  onDisConnect: ((sender: this) => any) | undefined;
  onRetry: ((sender: this, tryCount: number, reason?: string) => any) | undefined;
}


export class LiveCourseTrackingClient extends WebSocketTrackingClient {
  protected logName: string = "LiveCourseTrackingClient";
  constructor(public courseId: number, public showId?: number) {

    super();
  }

  getApiUrl(): string {
    let info = wx.getStorageSync("userInfo");
    let url = `${setting.apiSocketEndPoint}/api/Tracking/study/vip-live/ws/${this.courseId}`;
    if (this.showId != null) {
      url += `/${this.showId}`
    }
    return `${url}?client=${this.client}&uId=${info.id}`;
  }



}

export class VideoCourseTrackingClient extends WebSocketTrackingClient {
  protected logName: string = "VideoCourseTrackingClient";
  constructor(public courseId: number, public showId?: number) {
    super();
  }
  getApiUrl(): string {
    let info = wx.getStorageSync("userInfo");

    let url = `${setting.apiSocketEndPoint}/api/Tracking/study/vip-video/ws/${this.courseId}`;
    if (this.showId != null) {
      url += `/${this.showId}`
    }
    return `${url}?client=${this.client}&uId=${info.id}`;
  }

}

export class FreeLiveCourseTrackingClient extends WebSocketTrackingClient {
  protected logName: string = "FreeLiveCourseTrackingClient";
  constructor(public courseId: number) {
    super()
  }
  getApiUrl(): string {
    let info = wx.getStorageSync("userInfo");

    let url = `${setting.apiSocketEndPoint}/api/Tracking/study/free-live/ws/${this.courseId}`;

    return `${url}?client=${this.client}&uId=${info.id}`;
  }
}

export class FreeVideoCourseTrackingClient extends WebSocketTrackingClient {
  protected logName: string = "FreeVideoCourseTrackingClient";
  constructor(public courseId: number, public showId?: number) {
    super();
  }
  getApiUrl(): string {
    let info = wx.getStorageSync("userInfo");

    let url = `${setting.apiSocketEndPoint}/api/Tracking/study/free-video/ws/${this.courseId}`;
    if (this.showId != null) {
      url += `/${this.showId}`
    }
    return `${url}?client=${this.client}&uId=${info.id}`;
  }
}
