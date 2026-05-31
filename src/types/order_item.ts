export interface OrderItemDto {
id: number;

orderId: number;

menuId: number;

quantity: number;

price: number;

}

export interface CreateOrderItemDto {
orderId: number;

menuId: number;

quantity: number;

}

export interface UpdateOrderItemDto {
quantity: number;
}
