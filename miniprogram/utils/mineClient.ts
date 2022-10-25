import { WebClient } from "./WebClient";
import { setting } from "../setting";

export class MineClient extends WebClient {

  constructor() {
    super(setting.apiEndPoint)
  }


  //获取优惠券（领券中心）
  async GetMarketCouponsList(type: number, uId: number) {
    let response = await this.sendAsync<any>({
      url: `/api/MarketCoupons/list?type=${type}&userId=${uId}`
    })
    return response.data
  }

  //领取优惠券
  async PutMarketCode(userId: number, couponId: number) {
    let response = await this.putFormAsync<ApiStateResult>({
      url: `/api/MarketCode/getnow?userId=${userId}&couponId=${couponId}`
    })
    return response.data
  }
  //领取兑换券
  async PutMarketCodeGetitnow(userId: number, code: string) {
    let response = await this.putFormAsync<ApiStateResult>({
      url: `/api/MarketCode/getitnow?userId=${userId}&code=${code}`
    })
    return response.data
  }
  //根据商品类型获取优惠券列表
  async getMarketCouponsProList(type: number, productId: number, uId: number) {
    let response = await this.sendAsync<any>({
      url: `/api/MarketCoupons/prolist?type=${type}&productId=${productId}&userId=${uId}`
    })
    return response.data
  }

  //获取用户可用优惠券(订单页)
  async getMarketUserList(type: number, productId: number, uId: number, state: number) {
    let response = await this.sendAsync<any>({
      url: `/api/MarketCoupons/userlist?type=${type}&productId=${productId}&userId=${uId}&state=${state}`
    })
    return response.data
  }

  //获取优惠券详情(根据ID)
  async getMarketData(id: number, uId?: number) {
    let response = await this.sendAsync<any>({
      url: `/api/MarketCoupons/data?id=${id}&userId=${uId}`
    })
    return response.data
  }

  //通过兑换码兑换知识产品
  async PostMarketCode(uId: number, key: string) {
    let response = await this.postFormAsync<StateResult<OrderItem>>({
      url: `/api/MarketCode/exchange?uId=${uId}&code=${key}`
    })
    return response.data
  }

  //查询是否有可用的兑换券
  async availableExchange(uId: number, productType: number, productId: number) {
    let response = await this.sendAsync<StateResult>({
      url: `/api/MarketCode/available-exchange?uId=${uId}&productType=${productType}&productId=${productId}`
    })
    return response.data.isSuccess
  }

  //查询我的优惠券列表
  async GetMarketCouponsMinelist(uId: number, type: number) {
    let response = await this.sendAsync<any>({
      url: `/api/MarketCoupons/minelist?userId=${uId}&type=${type}`
    })
    return response.data
  }

  //通过券码获得实体(用于分享弹窗的实体)
  async GetMarketCouponsThedata(code: string) {
    let response = await this.sendAsync<any>({
      url: `/api/MarketCoupons/thedata?code=${code}`
    })
    return response.data;
  }

  //获取小程序码
  async GetUnlimited(userId?: number) {
    let data = this.combin({ index: 2, is_hyaline: true }, { scene: "InviteesId=" + userId });
    let response = await this.sendAsync<any>({
      url: `/api/Account/GetUnlimited`,
      data: data
    })
    return response.data;
  }
  //提交反馈
  async submitFeedback(uId: number, Content: string): Promise<any> {
    let response = await this.postFormAsync<any>({
      url: `/api/ExamApp/feedbackControl?uId=${uId}&&content=${Content}&&type=2&&typeName=授课师资问题&&title=授课师资问题`,

    });
    return response.data;
  }
  //获取反馈
  async mineFeedback(uId: number, PageNumber: number, PageSize: number): Promise<any> {
    let response = await this.sendAsync<any>({
      url: `/api/ExamApp/feedbackControl/mineFeedback`,
      // dataType: "json",
      data: { uId: uId, pageSize: PageSize, ageNumber: PageNumber,desc:true }
    });
    return response.data;
  }
  //获取兑换码详情（订单）
  async GetMarketCouponsExchange(type: number, productId: number, userId: number) {
    let response = await this.sendAsync<any>({
      url: `/api/MarketCoupons/exchange?type=${type}&productId=${productId}&userId=${userId}`
    })
    return response.data;
  }


}