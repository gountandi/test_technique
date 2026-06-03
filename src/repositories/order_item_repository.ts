import { prisma } from "../lib/prisma.js";
import {
    CreateOrderItemDto,
    OrderItemDto,
    UpdateOrderItemDto
} from "../types/order_item.js";
import ResourceNotFoundError from "../types/errors.js";

export default class OrderItemRepository {

    public async create(data: CreateOrderItemDto): Promise<OrderItemDto> {
        const menu = await prisma.menu.findUnique({
            where: { id: data.menuId }
        });
        if (!menu) {
            throw new ResourceNotFoundError(`Menu ${data.menuId} introuvable`);
        }

        // ✅ Correction : on stocke le prix unitaire
        const item = await prisma.orderItem.create({
            data: {
                orderId: data.orderId,
                menuId: data.menuId,
                quantity: data.quantity,
                price: menu.price       // prix unitaire
            }
        });
        return item as OrderItemDto;
    }

    // ... les autres méthodes restent identiques
    public async findByOrderId(orderId: number): Promise<OrderItemDto[]> {
        const items = await prisma.orderItem.findMany({ where: { orderId } });
        return items as OrderItemDto[];
    }

    public async updateQuantity(id: number, data: UpdateOrderItemDto): Promise<OrderItemDto> {
        const item = await prisma.orderItem.update({ where: { id }, data });
        return item as OrderItemDto;
    }

    public async delete(id: number): Promise<void> {
        await prisma.orderItem.delete({ where: { id } });
    }

    public async findByOrderAndMenu(orderId: number, menuId: number): Promise<OrderItemDto | null> {
        return prisma.orderItem.findFirst({
            where: { orderId, menuId }
        });
    }
}