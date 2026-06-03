import { Request, Response, NextFunction } from "express";
import InvoiceService from "../services/invoice_service.js";

export default class InvoiceController {
    constructor(private readonly invoiceService = new InvoiceService()) {}

    // ✅ Mise à jour de la facture après modification de la commande
    public updateInvoiceAmount = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const orderId = Number(req.params.orderId);
            const { total } = req.body; // seul le total est nécessaire

            await this.invoiceService.updateInvoiceAmount(orderId, total);

            const invoice = await this.invoiceService.getInvoiceByOrderId(orderId);
            res.status(200).json({ message: "Facture mise à jour", invoice });
        } catch (error) {
            next(error);
        }
    };
}