declare interface OrderRequestDto {
    orderId?: string;
    couponId?: number;
    remarks?: string;
    fullPrice?: number;
    totalPrice?: number;
    isNeedInvoice: boolean;
    invoiceType: number;
    invoiceName: string;
    taxCode: string;
    invoiceTel: string;
    province: string | null;
    city: string | null;
    address: string;
    orderItems: OrderItem[]|null;
    IsAllowPresent : boolean;
    marketingCouponId?:number;
    marketingExchangeId?:number;
}

/**
 * 订单
 */
declare interface OrderDto {
    orderId: string;
    userName: string;
    userId: number;
    couponId: number;
    fullPrice: number;
    totalPrice: number;
    orderTime: Date | string;
    orderFinishTime: Date | string;
    paymentType: number;
    paymentAuthorityOrderId: string;
    paymentAuthorityOrderState: string;
    remarks: string;
    isNeedInvoice: boolean;
    invoiceType: number;
    invoiceName: string;
    taxCode: string;
    invoiceTel: string;
    province: string;
    city: string;
    address: string;
    isProcessed: boolean;
    status: number;
    orderItems: OrderItem[];
    IsAllowPresent:boolean;
    marketingCouponId?:number;
    marketingExchangeId?:number;
}
declare interface OrderItem {
    itemId: number;
    itemType: number;
    itemName: string;
    itemImg: string;
    itemPrice: number;
    summary: string;
    keCheng: KeChengDto;
    tags: string[];
}

// declare interface PrePayReaponseDto {
//     appId: string;
//     timeStamp: string;
//     nonceStr: string;
//     package: string;
//     signType: string;
//     paySign: string
// }

declare interface PaymentState{
    isSuccess:boolean;
    result:string;
}