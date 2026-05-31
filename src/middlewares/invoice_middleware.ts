import {
    Request,
    Response,
    NextFunction
} from "express";

import {
    createInvoiceSchema,
} from "../validators/invoice_validator";
import { validateSchema } from "../validators/order_validator";

class InvoiceMiddleware {

    public createInvoice(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        validateSchema(
            createInvoiceSchema,
            req.body
        );

        next();
    }

}

export const invoiceMiddleware =
    new InvoiceMiddleware();