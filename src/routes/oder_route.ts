import { Router } from "express";

import OrderController from "../controllers/order_controller";
import { orderMiddleware } from "../middlewares/order_middleware";

const orderRouter = Router();

const orderController =
    new OrderController();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Créer une commande
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             clientId: 1
 *             restaurantId: 1
 *             paymentMode: MOBILE_MONEY
 *             items:
 *               - menuId: 1
 *                 quantity: 2
 *               - menuId: 2
 *                 quantity: 1
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 */
orderRouter.post(
    "/",
    orderMiddleware.createOrder,
    orderController.createOrder.bind(orderController)
);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Récupérer une commande
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Détails de la commande
 */
orderRouter.get(
    "/:id",
    orderController.getOrderById.bind(orderController)
);


/**
 * @swagger
 * /orders/{id}/items:
 *   post:
 *     summary: Ajouter un item à une commande
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             menuId: 1
 *             quantity: 2
 *     responses:
 *       200:
 *         description: Item ajouté à la commande
 *  
 *   
 */
orderRouter.post(
    "/:id/items",
    orderMiddleware.addItem,
    orderController.addItem.bind(orderController)
);



/** 
 * @swagger
 * /orders/items/{itemId}:
 *   patch:
 *     summary: Mettre à jour la quantité d'un item dans une commande
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             quantity: 3
 *     responses:
 *       200:
 *         description: Quantité de l'item mise à jour
 */
orderRouter.patch(
    "/items/:itemId",
    orderMiddleware.updateItem,
    orderController.updateItemQuantity.bind(orderController)
);


/**
 * @swagger
 * /orders/{id}/complete:
 *   post:
 *     summary: Compléter une commande
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Commande complétée avec succès
 */ 
orderRouter.post(
    "/:id/complete",
    orderController.completeOrder.bind(orderController)
);

export default orderRouter;