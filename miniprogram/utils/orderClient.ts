import { WebClient } from "./WebClient";
import { setting } from "../setting";

export class OrderClient extends WebClient {

    constructor() {
        super(setting.apiEndPoint)
    }
    /**
     * 获得某个用户的所有订单
     */
    async getMyOrdersAsync(uId?:number): Promise<OrderDto[]> {
        let response = await this.sendAsync<OrderDto[]>({
            url: `/api/ExamApp/mineControl/orders?uId=${uId}`
        });
        return response.data
    }
    /**
     * 获得某个用户的所有订单
     */
    async getorderDetailAsync(uId:number,orderId:string): Promise<any> {
        let response = await this.sendAsync<any>({
            url: `/api/ExamApp/mineControl/orderDetail?uId=${uId}&orderId=${orderId}`
        });
        return response.data.data
    }
    /**
     *  创建订单
     * @param data  页面购买相关数据
     */
    async getBuyingOrderAsync(data: OrderRequestDto,uId?:number): Promise<OrderDto> { 
        let response = await this.sendAsync<OrderDto>({
            url: `/api/ExamApp/ordersControl/me/createorder?uId=${uId}`,
            method: "POST",
            data: data
        })
        return response.data
    }
    /**
     * 修改订单
     */
    async updateOrderAsync(data: OrderRequestDto): Promise<OrderDto> { 
        let response = await this.sendAsync<OrderDto>({
            url: "/api/orders/me/updateorder",
            method: "POST",
            data: data
        })
        return response.data;
    }

    /**
     * 获取为付款的订单
     * @param orderId 订单Id
     */
    async getSingleOrderAsync(orderId: string,uId?:number): Promise<OrderDto> {
        let response = await this.postFormAsync<OrderDto>({
            url: `/api/ExamApp/mineControl/singleorder?uId=${uId}`,
            data: {
                orderId: orderId
            }
        })
        return response.data
    }

    // async prePayWechatAsync(orderId:string,openId:string|null):Promise<PrePayReaponseDto>{
    //     let response = await this.postFormAsync<PrePayReaponseDto>({
    //         url:"/api/Payment/wechatminiapp/prepay",
    //         data:{
    //             orderId:orderId,
    //             openId:openId
    //         }
    //     })
    //     return response.data
    // }

    async Free(orderId: string): Promise<PaymentState> {
        let response = await this.postFormAsync<PaymentState>({
            url: "/api/Payment/pay/free",
            data: {
                orderId: orderId
            }
        })
        return response.data
    }

    async WapPrePayAsync(orderId: string): Promise<PaymentState> {
        let response = await this.postFormAsync<PaymentState>({
            url: "/api/ExamApp/paymentControl/ali/wap/prepay",
            data: {
                orderId: orderId
            }
        })
        return response.data
    }
    async AppPrePayAsync(orderId: string): Promise<PaymentState> {
        let response = await this.postFormAsync<PaymentState>({
            url: "/api/ExamApp/paymentControl/ali/app/prepay",
            data: {
                orderId: orderId
            }
        })
        return response.data
    }

    async getOrderItems(items: { itemId: number, itemType: number }[],uId:number): Promise<OrderItem[]> {
        let response = await this.sendAsync<OrderItem[]>({
            url: "/api/ExamApp/ordersControl/orderItem",
            data: {
                itemstr: JSON.stringify(items),
                uId:uId
            }
        })
        return response.data;
    }

    /**
     * 获得 我的资源 之 优惠券
     */
    async getCoupondAsync() {

    }
}