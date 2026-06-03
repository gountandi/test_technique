import InvoiceRepository from "../repositories/invoice_repository.js";
import { PaymentMode } from "../types/invoice";

export default class InvoiceService {
    constructor(private readonly invoiceRepository = new InvoiceRepository()) {}

    // ✅ Crée une facture initiale
    public async createInvoice(orderId: number, amount: number, paymentMode: PaymentMode) {
        return this.invoiceRepository.create({ orderId, amount, paymentMode });
    }

    // ✅ Facture complémentaire (manuelle, quand tu veux facturer le restant dû)
    public async createComplementInvoice(orderId: number, total: number, paymentMode: PaymentMode) {
        const remaining = await this.getRemainingAmount(orderId, total);
        if (remaining <= 0) return null;
        return this.invoiceRepository.create({ orderId, amount: remaining, paymentMode });
    }

    public async getPaidAmount(orderId: number): Promise<number> {
        const invoices = await this.invoiceRepository.findByOrderId(orderId);
        return invoices
            .filter(inv => inv.status === "PAID")
            .reduce((sum, inv) => sum + inv.amount, 0);
    }

    public async getRemainingAmount(orderId: number, total: number) {
        const paid = await this.getPaidAmount(orderId);
        return total - paid;
    }

    // ✅ Mise à jour automatique du montant de la facture active (pour addItem, updateItemQuantity, deleteItem)
    public async updateInvoiceAmount(orderId: number, newAmount: number): Promise<void> {
        const invoices = await this.invoiceRepository.findByOrderId(orderId);
        const active = invoices.find(inv => inv.status !== "PAID");
        if (active) {
            await this.invoiceRepository.update(active.id, { amount: newAmount });
        } else {
            // S'il n'y a plus de facture non payée (tout est soldé), on crée une nouvelle facture
            await this.invoiceRepository.create({ orderId, amount: newAmount, paymentMode: "MOBILE_MONEY" });
        }
    }

    // Utile pour retrouver la facture active d'une commande
    public async getInvoiceByOrderId(orderId: number) {
        const invoices = await this.invoiceRepository.findByOrderId(orderId);
        return invoices.find(inv => inv.status !== "PAID") || null;
    }

    public async markAsPaid(invoiceId: number) {
        return this.invoiceRepository.markAsPaid(invoiceId);
    }
}