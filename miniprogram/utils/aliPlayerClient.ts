import { WebClient } from "./WebClient";
import { setting } from "../setting";

export class AliPlayerClient extends WebClient {

    constructor() {
        super(setting.apiEndPoint)
    }
    /**
    * 根据ID查询分段视频数据
    * @param pageIndex  当前页数
    * @param pageSize  每一页的大小
    */
  async getVideoSegmentList(PageIndex: number = 0, PageSize: number = 10, id:string,videoType:string,): Promise<PagedList<VideoSegmentDTO>> {
    let data = this.combin({ PageIndex: PageIndex, PageSize: PageSize }, { id: id, videoType:videoType});
    let response = await this.sendAsync<VideoSegmentDTO[]>({
      url: "/api/AliVideoPlayer/GetVideoSegment",
      data: data
    }); 
    return {
      currentIndex: response.header["p-pageindex"],
      currentNumber: response.header["p-pagenumber"],
      data: response.data,
      hasNextPage: response.header["p-hasnextpage"],
      hasPrevPage: response.header["p-hasprevpage"],
      pageSize: response.header["p-pagesize"],
      totalItemCount: response.header["p-totalitemcount"],
      maxPageIndex: response.header["p-maxpageindex"],
      maxPageNumber: response.header["p-maxpagenumber"]
    }
  }

  //获取播放凭证
  async getVideoPlayAuth(VideoId:string): Promise<StateResult> {
    let response = await this.sendAsync<StateResult>({
      url: `/api/AliVideoPlayer/GetVideoPlayAuth?VideoId=${VideoId}`
    })
    return response.data;
  }

  //检查是或否存在分段视频列表
  async cheackIsSegment(id:string,videoType:string): Promise<StateResult> {
    let response = await this.sendAsync<StateResult>({
      url: `/api/AliVideoPlayer/CheackIsSegment?id=${id}&videoType=${videoType}`
    })
    return response.data;
  }
}






