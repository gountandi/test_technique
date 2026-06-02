import InvoiceRepository
    from "../repositories/invoice_repository.js";

import {
    PaymentMode
} from "../types/invoice";

export default class InvoiceService {

    constructor(
        private readonly invoiceRepository =
            new InvoiceRepository()
    ) {}

    public async createInvoice(
        orderId: number,
        amount: number,
        paymentMode: PaymentMode
    ) {

        return this.invoiceRepository.create({
            orderId,
            amount,
            paymentMode
        });
    }

    public async getPaidAmount(
        orderId: number
    ): Promise<number> {

        const invoices =
            await this.invoiceRepository
                .findByOrderId(
                    orderId
                );

        return invoices
            .filter(
                invoice =>
                    invoice.status ===
                    "PAID"
            )
            .reduce(
                (
                    total,
                    invoice
                ) =>
                    total +
                    invoice.amount,
                0
            );
    }

    public async getRemainingAmount(
        orderId: number,
        total: number
    ) {

        const paid =
            await this.getPaidAmount(
                orderId
            );

        return total - paid;
    }

    public async createComplementInvoice(
        orderId: number,
        total: number,
        paymentMode: PaymentMode
    ) {

        const remaining =
            await this.getRemainingAmount(
                orderId,
                total
            );

        if (
            remaining <= 0
        ) {
            return null;
        }

        return this.invoiceRepository.create({
            orderId,
            amount: remaining,
            paymentMode
        });
    }

    public async markAsPaid(
        invoiceId: number
    ) {

        return this.invoiceRepository
            .markAsPaid(
                invoiceId
            );
    }
}