import { CourseClient } from "./courseClient";
import { MakeUpGroup } from "./MakeUpGroup";
abstract class CourseManager<T>{




    /**
     * 获取数据
     * @param id 数据的Id
     */
    async getDataAsync(id: number | string): Promise<T | null> {

        let newData = await this.pullDataAsync(id);

        if (newData == null) {
            return null;
        }
        return newData;

    }

    abstract async pullDataAsync(id: number | string): Promise<T | null>;

}

//单个公开课详情
export class FreeLiveCourseManager extends CourseManager<FreeLiveCourseDto> {
    _preCacheKey: string = "DTO:FreeLive";
    async pullDataAsync(id: string | number): Promise<FreeLiveCourseDto | null> {
        let client = new CourseClient();
        let data = await client.getFreeLiveShowAsync(id as number, true);
        return data;
    }
}
export class VipLiveCourseManager extends CourseManager<LiveCourseDto>{
    _preCacheKey: string = "DTO:VipLive";
    async pullDataAsync(id: string | number): Promise<LiveCourseDto> {
        let client = new CourseClient();
        let data = await client.getLiveShowAsync(id as number, true);
        return data;
    }
}
/* export class AutoCourseManager extends CourseManager<KnowAudioDto> {
    _preCacheKey: string = "DTO:FreeLive";
    async pullDataAsync(id: string | number): Promise<KnowAudioDto | null> {
        let client = new CourseClient();
        let data = await client.getKnowAuto(id as number);
        return data;
    }
}
export class KonowRichtextCourseManager extends CourseManager<KnowAudioDto> {
    _preCacheKey: string = "DTO:FreeLive";
    async pullDataAsync(id: string | number): Promise<KnowAudioDto | null> {
        let client = new CourseClient();
        let data = await client.getKonowRichtext(id as number);
        return data;
    }
}  
*/
export class FreeVideoCourseManager extends CourseManager<VideoCourseDto>{
    _preCacheKey: string = "DTO:FreeVideo";
    async pullDataAsync(id: string | number): Promise<VideoCourseDto | null> {
        let client = new CourseClient();
        let data = await client.getVideocourseAsync(id as number, true);
        return data;
    }
}


export class VipVideoCourseManager extends CourseManager<VideoCourseDto>{
    _preCacheKey: string = "DTO:VipVideo";
    async pullDataAsync(id: string | number): Promise<VideoCourseDto> {
        let client = new CourseClient();
        let data = await client.getVideocourseAsync(id as number, true);
        return data;
    }
}

/* export class ClassManager extends CourseManager<ClassDto>{
    _preCacheKey: string = "DTO:Class";
    async pullDataAsync(id: string | number): Promise<ClassDto> {
        let client = new CourseClient();
        let data = await client.getClassAsync(id as number, true);
        return data;
    }
} */
