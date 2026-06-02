import { prisma } from "../lib/prisma.js";

import {
    CreateInvoiceDto,
    InvoiceDto,
    UpdateInvoiceDto
} from "../types/invoice.js";

import ResourceNotFoundError from "../types/errors.js";

export default class InvoiceRepository {

    public async create(
        data: CreateInvoiceDto
    ): Promise<InvoiceDto> {

        const invoice = await prisma.invoice.create({
            data
        });

        return invoice as InvoiceDto;
    }

    public async findById(
        id: number
    ): Promise<InvoiceDto> {

        const invoice = await prisma.invoice.findUnique({
            where: { id }
        });

        if (!invoice) {
            throw new ResourceNotFoundError(
                `Facture ${id} introuvable`
            );
        }

        return invoice as InvoiceDto;
    }

    public async findByOrderId(
        orderId: number
    ): Promise<InvoiceDto[]> {

        const invoices = await prisma.invoice.findMany({
            where: {
                orderId
            }
        });

        return invoices as InvoiceDto[];
    }

    public async update(
        id: number,
        data: UpdateInvoiceDto
    ): Promise<InvoiceDto> {

        const invoice = await prisma.invoice.update({
            where: { id },
            data: {
                status: data.status
            }
        });

        return invoice as InvoiceDto;
    }

    public async markAsPaid(
        id: number
    ): Promise<InvoiceDto> {

        const invoice = await prisma.invoice.update({
            where: { id },
            data: {
                status: "PAID"
            }
        });

        return invoice as InvoiceDto;
    }
}