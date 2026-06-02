import Joi from "joi";

import {
    CreateOrderDto,
  
} from "../types/order.js";

import {
    CreateOrderItemDto as AddItemDto,
    UpdateOrderItemDto
} from "../types/order_item.js";
export const createOrderSchema =
    Joi.object<CreateOrderDto>({

        clientId: Joi.number()
            .required(),

        restaurantId: Joi.number()
            .required(),

        paymentMode: Joi.string()
            .valid(
                "CASH",
                "MOBILE_MONEY"
            )
            .required(),

        items: Joi.array()
            .items(

                Joi.object({

                    menuId: Joi.number()
                        .required(),

                    quantity: Joi.number()
                        .min(1)
                        .required()

                })

            )
            .min(1)
            .required()

    });

export const addItemSchema =
    Joi.object<AddItemDto>({

        menuId: Joi.number()
            .required(),

        quantity: Joi.number()
            .min(1)
            .required()

    });

export const updateItemSchema =
    Joi.object<UpdateOrderItemDto>({

        quantity: Joi.number()
            .min(1)
            .required()

    });

export const validateSchema = (
    schema: Joi.ObjectSchema,
    payload: unknown
) => {

    const { error } =
        schema.validate(payload);

    if (error) {

        throw new Error(
            error.details[0].message
        );

    }

};