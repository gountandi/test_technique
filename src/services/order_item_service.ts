import OrderItemRepository from "../repositories/order_item_repository";

export default class OrderItemService {

    constructor(
        private readonly orderItemRepository =
            new OrderItemRepository()
    ) {}

    public async calculateOrderTotal(
        orderId: number
    ): Promise<number> {

        const items =
            await this.orderItemRepository.findByOrderId(
                orderId
            );

        return items.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );
    }
}