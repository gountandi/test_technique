import Joi from "joi";

export const createInvoiceSchema =
    Joi.object({

        orderId: Joi.number()
            .required(),

        amount: Joi.number()
            .positive()
            .required(),

        paymentMode: Joi.string()
            .valid(
                "CASH",
                "MOBILE_MONEY"
            )
            .required()

    });