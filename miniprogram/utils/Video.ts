import { WebClient } from "./WebClient";
import { setting } from "../setting";

export class Video extends WebClient {

  constructor() {
    super(setting.apiEndPoint)
  }

  //保存观看记录
  async postViewingHistory(UserId: number, CourseId: number, ShowId: number, Tracks: number): Promise<any> {
    let response = await this.postFormAsync<any>({
      url: `/api/ViewingHistory/Preserve?UserId=${UserId}&CourseId=${CourseId}&ShowId=${ShowId}&Tracks=${Tracks}`,
    });
    return response.data;
  }
  //获取观看记录
  async getViewingHdistory(UserId: number, CourseId: number, ShowId: number): Promise<any> {
    let response = await this.sendAsync<any>({
      url: `/api/ViewingHistory/GetViewingHistory?UserId=${UserId}&CourseId=${CourseId}&ShowId=${ShowId}`,

    });
    return response.data;
  }


}






