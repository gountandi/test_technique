import { Router } from "express";

import orderRouter from "./oder_route";
import invoiceRouter from "./invoice_route";
import paymentRouter from "./payment_route";

const router = Router();

router.use(
    "/orders",
    orderRouter
);

router.use(
    "/invoices",
    invoiceRouter
);

router.use(
    "/payments",
    paymentRouter
);

export default router;