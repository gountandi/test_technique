import { Router } from "express";

import InvoiceController from "../controllers/invoice_controller.js";
import { invoiceMiddleware } from "../middlewares/invoice_middleware.js";

const invoiceRouter = Router();

const invoiceController =
    new InvoiceController();


   
invoiceRouter.post(
    "/orders/:orderId",
    invoiceMiddleware.createInvoice,
    invoiceController.createComplementInvoice.bind(
        invoiceController
    )
);

export default invoiceRouter;