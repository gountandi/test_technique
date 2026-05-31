import PaymentRepository
    from "../repositories/payment_repository";

import InvoiceRepository
    from "../repositories/invoice_repository";

export default class PaymentService {

    constructor(
        private readonly paymentRepository =
            new PaymentRepository(),

        private readonly invoiceRepository =
            new InvoiceRepository()
    ) {}

    public async payInvoice(
        invoiceId: number
    ) {

        const invoice =
            await this.invoiceRepository
                .findById(
                    invoiceId
                );

        if (
            invoice.status ===
            "PAID"
        ) {

            throw new Error(
                "Facture déjà payée"
            );

        }

        await this.paymentRepository
            .create({
                invoiceId,
                amount:
                    invoice.amount
            });

        return this.invoiceRepository
            .markAsPaid(
                invoiceId
            );
    }

    public async getPayments(
        invoiceId: number
    ) {

        return this.paymentRepository
            .findByInvoiceId(
                invoiceId
            );
    }
}