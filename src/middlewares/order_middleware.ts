import {
    Request,
    Response,
    NextFunction
} from "express";

import {
    createOrderSchema,
    addItemSchema,
    updateItemSchema,
    validateSchema
} from "../validators/order_validator";

class OrderMiddleware {

    public createOrder(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        validateSchema(
            createOrderSchema,
            req.body
        );

        next();
    }

    public addItem(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        validateSchema(
            addItemSchema,
            req.body
        );

        next();
    }

    public updateItem(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        validateSchema(
            updateItemSchema,
            req.body
        );

        next();
    }

}

export const orderMiddleware =
    new OrderMiddleware();