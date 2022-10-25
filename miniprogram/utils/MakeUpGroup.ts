import { WebClient } from "./WebClient";
import { setting } from "../setting";

export class MakeUpGroup extends WebClient {

  constructor() {
    super(setting.apiEndPoint)
  }
  //获取拼团信息列表
  async GetMakeGroupList(page: number, PageSize: number): Promise<MakeUpGroupDto[]> {
    let response = await this.sendAsync<MakeUpGroupDto[]>({
      url: `/api/MakeUpGroup/GetMakeGroupList`,
      data: {
        page: page,
        PageSize: PageSize,
        kind: 3
      }
    });
    return response.data;
  }
  //获取助力信息列表
  async GetPowerAssistDTO() {
    let response = await this.sendAsync<PowerAssistDTO[]>({
      url: `/api/MarketAssist/list`,
      data: {
        kind: 3
      }
    })
    return response.data
  }
  /*** 获得 活动列表*/
  async getInteractActivityListAsync(pageIndex: number = 0, pageSize: number = 0, q?: string, vipType?: number, kind?: number, zyId?: number, topType?: string): Promise<PagedList<InteractActivityListDto>> {
    let data = this.combin({ pageIndex: pageIndex, pageSize: pageSize, kind: 3 }, { q: q, vipType: vipType, zyId: zyId, topType: topType });
    let response = await this.sendAsync<InteractActivityListDto[]>({
      url: "/api/Interact/list-activity",
      data: data
    });
    return {
      currentIndex: parseInt(response.header["p-pageindex"]),
      currentNumber: parseInt(response.header["p-pagenumber"]),
      data: response.data,
      hasNextPage: response.header["p-hasnextpage"].toLowerCase() == 'true',
      hasPrevPage: response.header["p-hasprevpage"].toLowerCase() == 'true',
      pageSize: parseInt(response.header["p-pagesize"]),
      totalItemCount: parseInt(response.header["p-totalitemcount"]),
      maxPageIndex: parseInt(response.header["p-maxpageindex"]),
      maxPageNumber: parseInt(response.header["p-maxpagenumber"])
    }
  }
  /*** 获取课程活动信息*/
  async getTopicListAsync(page: number = 0, kind: number = 3): Promise<InteractActivityListDto[]> {

    let response = await this.sendAsync<InteractActivityListDto[]>({
      url: "/api/TopicList",
      data: { page: page, kind: kind }
    });
    return response.data
  }
}