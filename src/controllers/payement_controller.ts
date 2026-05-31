import {
    Request,
    Response,
    NextFunction
} from "express";

import PaymentService
    from "../services/payment_service";

export default class PaymentController {

    constructor(
        private readonly paymentService =
            new PaymentService()
    ) {}

    public payInvoice = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            const invoiceId =
                Number(req.params.id);

            const payment =
                await this.paymentService
                    .payInvoice(
                        invoiceId
                    );

            res.status(200).json(payment);

        } catch (error) {

            next(error);

        }
    };

    public getPayments = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        try {

            const invoiceId =
                Number(req.params.id);

            const payments =
                await this.paymentService
                    .getPayments(
                        invoiceId
                    );

            res.status(200).json(payments);

        } catch (error) {

            next(error);

        }
    };

}