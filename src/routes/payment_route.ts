import { Router } from "express";

import PaymentController from "../controllers/payement_controller";
import { invoiceMiddleware } from "../middlewares/invoice_middleware";

const paymentRouter = Router();

const paymentController =
    new PaymentController();


/**
 * @swagger
 * /payments/invoices/{id}/pay:
 *   post:
 *     summary: Payer une facture
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Paiement effectué avec succès
 */    
paymentRouter.post(
    "/invoices/:id/pay",
    invoiceMiddleware.createInvoice,
    paymentController.payInvoice.bind(
        paymentController
    )
);


/**
 * @swagger
 * /payments/invoices/{id}/payments:
 *   get:
 *     summary: Récupérer les paiements d'une facture
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Liste des paiements pour la facture
*/
paymentRouter.get(
    "/invoices/:id/payments",
    
    paymentController.getPayments.bind(
        paymentController
    )
);

export default paymentRouter;