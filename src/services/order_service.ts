import OrderRepository from "../repositories/order_repository.js";
import OrderItemRepository from "../repositories/order_item_repository.js";
import MenuRepository from "../repositories/menu_repository.js";
import InvoiceService from "./invoice_service.js";
import { CreateOrderDto } from "../types/order.js";
import ResourceNotFoundError from "../types/errors.js";

export default class OrderService {
    constructor(
        private readonly orderRepository = new OrderRepository(),
        private readonly orderItemRepository = new OrderItemRepository(),
        private readonly menuRepository = new MenuRepository(),
        private readonly invoiceService = new InvoiceService()
    ) {}

    public async createOrder(data: CreateOrderDto) {
        const order = await this.orderRepository.create({
            clientId: data.clientId,
            restaurantId: data.restaurantId,
            paymentMode: data.paymentMode
        });

        let total = 0;
        for (const item of (data.items ?? [])) {
            const menu = await this.menuRepository.findById(item.menuId);
            if (!menu) throw new ResourceNotFoundError(`Menu ${item.menuId} introuvable`);
            total += menu.price * item.quantity;
            await this.orderItemRepository.create({
                orderId: order.id,
                menuId: item.menuId,
                quantity: item.quantity
            });
        }

        await this.orderRepository.updateTotal(order.id, total);
        await this.invoiceService.createInvoice(order.id, total, order.paymentMode);
        return this.orderRepository.findByIdWithDetails(order.id);
    }

    public async getOrderById(orderId: number) {
        return this.orderRepository.findByIdWithDetails(orderId);
    }

    public async addItem(orderId: number, menuId: number, quantity: number) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) throw new ResourceNotFoundError(`Commande ${orderId} introuvable`);
        if (order.status === "COMPLETED") throw new Error("Commande déjà terminée");

        const menu = await this.menuRepository.findById(menuId);
        if (!menu) throw new ResourceNotFoundError(`Menu ${menuId} introuvable`);

        const existingItem = await this.orderItemRepository.findByOrderAndMenu(orderId, menuId);
        if (existingItem) {
            await this.orderItemRepository.updateQuantity(existingItem.id, {
                quantity: existingItem.quantity + quantity
            });
        } else {
            await this.orderItemRepository.create({ orderId, menuId, quantity });
        }

        const total = await this.recalculateTotal(orderId);
        // ✅ Mise à jour automatique de la facture (pas de nouvelle facture)
        await this.invoiceService.updateInvoiceAmount(orderId, total);
        return this.getOrderById(orderId);
    }

    public async updateItemQuantity(itemId: number, quantity: number) {
        const item = await this.orderItemRepository.updateQuantity(itemId, { quantity });
        const newTotal = await this.recalculateTotal(item.orderId);
        await this.invoiceService.updateInvoiceAmount(item.orderId, newTotal);
        return item;
    }

    public async deleteItem(itemId: number, orderId: number) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) throw new ResourceNotFoundError(`Commande ${orderId} introuvable`);
        if (order.status === "COMPLETED") throw new Error("Commande terminée");

        await this.orderItemRepository.delete(itemId);
        const total = await this.recalculateTotal(orderId);
        await this.invoiceService.updateInvoiceAmount(orderId, total);
        return { message: "Article supprimé avec succès", total };
    }

    public async recalculateTotal(orderId: number): Promise<number> {
        const items = await this.orderItemRepository.findByOrderId(orderId);
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        await this.orderRepository.updateTotal(orderId, total);
        return total;
    }

    public async completeOrder(orderId: number) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) throw new ResourceNotFoundError(`Commande ${orderId} introuvable`);
        if (order.paymentMode === "MOBILE_MONEY") {
            const paid = await this.invoiceService.getPaidAmount(orderId);
            if (paid < order.total) throw new Error("Paiement incomplet");
        }
        return this.orderRepository.complete(orderId);
    }
}