import { setting } from "../setting";

export class WebClient {

    private _base: string;

    constructor(urlbase?: string) {
        this._base = urlbase ? urlbase : setting.apiEndPoint;
        if (this._base) {
            if (this._base.endsWith("/")) {
                this._base = this._base.substr(0, this._base.length - 1);
            }
        }
    }



    /**
     * 底层方法
     */
    public sendAsync<T>(request: WebClientRequest<T>): Promise<WebClientResponse<T>> {
        return new Promise<WebClientResponse<T>>((resolve, reject) => {
            let f: any = {};
            for (let name in request) {
                if (name == "url") {
                    f[name] = this.getUrl(request[name]);
                }
                else {
                    f[name] = request[name];
                }

            }
            f.success = (response: WebClientResponse<T>) => {
                resolve(response);
            };
            f.fail = (response: WebClientResponse<T | any>) => {
                reject(response);
            };
            wx.request(f)
        })
    }
    public putFormAsync<T>(request: WebClientRequest<T>) {
        if (request.header == null) {
            request.header = {};
        }
        request.method = "PUT";
        request.header["Content-Type"] = "application/x-www-form-urlencoded";
        return this.sendAsync<T>(request);
    }

    public postFormAsync<T>(request: WebClientRequest<T>) {
        if (request.header == null) {
            request.header = {};
        }
        request.method = "POST";
        //request.header["Content-Type"] = "application/x-www-form-urlencoded";
        return this.sendAsync<T>(request);
    }

    protected getUrl(urlpart: string): string {
        if (urlpart == null) {
            throw new Error(`urlpart 为空`);
        }
        if (/^http(s)?\:\/\//.test(urlpart)) {
            return urlpart;
        }
        if (!urlpart.startsWith("/")) {
            urlpart = `/${urlpart}`;
        }
        return `${this._base}${urlpart}`;
    }
    protected handlerStatusCode(code: number): boolean {
        if (code >= 200 && code < 300) {
            return true;
        }
        return false;
    }

    EnsureStatusCode(response: WebClientResponse<any>) {
        if (!this.handlerStatusCode(response.statusCode)) {
            throw new StatusCodeError("请求时发生错误", response.statusCode, response.data, response.header);
        }
    }

    protected combin<T1, T2>(objA: T1, objB: T2): T1 & T2 {
        let r: any = {};
        if (objA != null) {
            for (let name in objA) {
                if (objA[name] !== undefined) {
                    r[name] = objA[name];
                }
            }
        }
        if (objB != null) {
            for (let name in objB) {
                if (objB[name] !== undefined) {
                    r[name] = objB[name];
                }
            }
        }

        return r;
    }
}

export class StatusCodeError extends Error {
    statusCode: number;
    response?: any;
    header?: any;
    constructor(message: string, statusCode: number, response?: any, header?: any) {
        super(message);
        this.statusCode = statusCode;
        this.response = response;
        this.header = header;
    }
}

interface WebClientRequest<T> {
    /**
     * 开发者服务器接口地址
     */
    url: string;
    /**
     * 请求的参数
     */
    data?: any | string;
    /**
     * 设置请求的 header , header 中不能设置 Referer
     */
    header?: any;
    /**
     * 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     */
    method?: string | "GET" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | "OPTIONS" | "HEAD";
    /**
     * 默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
     */
    dataType?: string;
    // /**
    //  * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
    //  */
    // success?: (resposne:WebClientRequest<T>)=>any;
    // /**
    //  * 接口调用失败的回调函数
    //  */
    // fail?: (resposne:WebClientRequest<T|any>)=>any;
    // /**
    //  * 接口调用结束的回调函数（调用成功、失败都会执行）
    //  */
    // complete?: (resposne:WebClientRequest<T|any>)=>any;
}

interface WebClientResponse<T> {
    header: any | Map<string, string>;
    data: T;
    statusCode: number
}