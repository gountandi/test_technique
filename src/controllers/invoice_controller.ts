import { Request, Response, NextFunction } from "express";
import InvoiceService from "../services/invoice_service.js";

export default class InvoiceController {
    constructor(private readonly invoiceService = new InvoiceService()) {}

    public createComplementInvoice = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const orderId = Number(req.params.orderId);
            const { total, paymentMode } = req.body;

            const invoice = await this.invoiceService.createComplementInvoice(
                orderId,
                total,
                paymentMode
            );

            res.status(201).json(invoice);
        } catch (error) {
            next(error);
        }
    };
}