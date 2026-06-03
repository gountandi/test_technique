import InvoiceRepository from "../repositories/invoice_repository.js";
import { PaymentMode } from "../types/invoice";

export default class InvoiceService {
    createComplementInvoice(orderId: number, total: any, paymentMode: any) {
        throw new Error("Method not implemented.");
    }

    constructor(
        private readonly invoiceRepository = new InvoiceRepository()
    ) {}

    public async createInvoice(orderId: number, amount: number, paymentMode: PaymentMode) {
        return this.invoiceRepository.create({ orderId, amount, paymentMode });
    }

    public async getPaidAmount(orderId: number): Promise<number> {
        const invoices = await this.invoiceRepository.findByOrderId(orderId);
        return invoices
            .filter(invoice => invoice.status === "PAID")
            .reduce((total, invoice) => total + invoice.amount, 0);
    }

    public async getRemainingAmount(orderId: number, total: number) {
        const paid = await this.getPaidAmount(orderId);
        return total - paid;
    }

    // ✅ Nouvelle méthode : met à jour la facture active (non payée) avec le nouveau total
    public async updateInvoiceAmount(orderId: number, newAmount: number): Promise<void> {
        const invoices = await this.invoiceRepository.findByOrderId(orderId);
        const activeInvoice = invoices.find(inv => inv.status !== "PAID");

        if (activeInvoice) {
            await this.invoiceRepository.update(activeInvoice.id, {
                amount: newAmount,
                status: "INIT"
            });
        } else {
            // Si aucune facture active (cas extrême, par exemple toutes payées), on crée une nouvelle facture
            // Mais cela ne devrait pas arriver dans le flux normal
            await this.invoiceRepository.create({ orderId, amount: newAmount, paymentMode: "MOBILE_MONEY" });
        }
    }

    // createComplementInvoice peut être conservée mais ne sera plus utilisée dans OrderService
    // public async createComplementInvoice(...) { ... }

    public async markAsPaid(invoiceId: number) {
        return this.invoiceRepository.markAsPaid(invoiceId);
    }

    // dans InvoiceService
    public async getInvoiceByOrderId(orderId: number) {
        const invoices = await this.invoiceRepository.findByOrderId(orderId);
        return invoices.find(inv => inv.status !== "PAID") || null;
    }
}