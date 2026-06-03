import { Request, Response, NextFunction } from "express";
import OrderService from "../services/order_service.js";

export default class OrderController {
    constructor(private readonly orderService = new OrderService()) {}

    public createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const order = await this.orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    };

    public getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderId = Number(req.params.id);
            const order = await this.orderService.getOrderById(orderId);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };

    public addItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderId = Number(req.params.id);
            const { menuId, quantity } = req.body;
            const result = await this.orderService.addItem(orderId, menuId, quantity);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public updateItemQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const itemId = Number(req.params.itemId);
            const { quantity } = req.body;
            const result = await this.orderService.updateItemQuantity(itemId, quantity);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public deleteItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const itemId = Number(req.params.itemId);
            const orderId = Number(req.params.orderId);
            const result = await this.orderService.deleteItem(itemId, orderId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public completeOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const orderId = Number(req.params.id);
            const order = await this.orderService.completeOrder(orderId);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };
}