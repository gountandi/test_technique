import { Router } from "express";

import orderRouter from "./oder_route.js";
import invoiceRouter from "./invoice_route.js";
import paymentRouter from "./payment_route.js";

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