import { prisma } from "../lib/prisma.js";

import {
    CreateOrderDto,
    OrderDto,
    UpdateOrderDto
} from "../types/order.js";

import ResourceNotFoundError from "../types/errors.js";

export default class OrderRepository {

    public async create(
        data: CreateOrderDto
    ): Promise<OrderDto> {

        const order = await prisma.order.create({
            data: {
                clientId: data.clientId,
                restaurantId: data.restaurantId,
                paymentMode: data.paymentMode,
            } 
        });

        return order as OrderDto;
    }

    public async findById(
        id: number
    ): Promise<OrderDto> {

        const order = await prisma.order.findUnique({
            where: { id }
        });

        if (!order) {
            throw new ResourceNotFoundError(
                `Commande ${id} introuvable`
            );
        }

        return order as OrderDto;
    }

    public async findByIdWithDetails(
        id: number
    ) {

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: true,
                invoices: {
                    include: {
                        payments: true
                    }
                }
            }
        });

        if (!order) {
            throw new ResourceNotFoundError(
                `Commande ${id} introuvable`
            );
        }

        return order;
    }

    public async update(
        id: number,
        data: UpdateOrderDto
    ): Promise<OrderDto> {

        const order = await prisma.order.update({
            where: { id },
            data: {
                status: data.status,
                total: data.total
            }
        });

        return order as OrderDto;
    }

    public async updateTotal(
        id: number,
        total: number
    ): Promise<OrderDto> {

        const order = await prisma.order.update({
            where: { id },
            data: { total }
        });

        return order as OrderDto;
    }

    public async complete(
        id: number
    ): Promise<OrderDto> {

        const order = await prisma.order.update({
            where: { id },
            data: {
                status: "COMPLETED"
            }
        });

        return order as OrderDto;
    }

    public async delete(
        id: number
    ): Promise<void> {

        await prisma.order.delete({
            where: { id }
        });
    }
}