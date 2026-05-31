import { prisma } from "../lib/prisma";

import {
    CreatePaymentDto,
    PaymentDto
} from "../types/payement";

export default class PaymentRepository {

    public async create(
        data: CreatePaymentDto
    ): Promise<PaymentDto> {

        const payment = await prisma.payment.create({
            data
        });

        return payment as PaymentDto;
    }

    public async findByInvoiceId(
        invoiceId: number
    ): Promise<PaymentDto[]> {

        const payments = await prisma.payment.findMany({
            where: {
                invoiceId
            }
        });

        return payments as PaymentDto[];
    }

    public async findAll(): Promise<PaymentDto[]> {

        const payments = await prisma.payment.findMany();

        return payments as PaymentDto[];
    }
}