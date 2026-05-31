
export type PaymentMode = 'CASH' | 'MOBILE_MONEY' ;

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'PROCESSING'  | 'CANCELLED';

export interface OrderDto {
id: number;

clientId: number;

restaurantId: number;

paymentMode: PaymentMode;

status: OrderStatus;

total: number;

createdAt: Date;

updatedAt: Date;

}

export interface UpdateOrderDto {
status?: OrderStatus;


total?: number;


}

export interface CreateOrderLineDto {
    menuId: number;
    quantity: number;
}

export interface CreateOrderDto {
    clientId: number;
    restaurantId: number;
    paymentMode: PaymentMode;

    items: CreateOrderLineDto[];
}