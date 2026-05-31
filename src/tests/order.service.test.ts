import OrderService from "../services/order_service";

describe(
    "OrderService",
    () => {

        test(
            "doit refuser l'ajout d'un article sur une commande terminée",
            async () => {

                const service =
                    new OrderService();

                jest
                    .spyOn(
                        service["orderRepository"],
                        "findById"
                    )
                    .mockResolvedValue({
                        id: 1,
                        status: "COMPLETED",
                        total: 5000,
                        paymentMode:
                            "MOBILE_MONEY"
                    } as any);

                await expect(
                    service.addItem(
                        1,
                        1,
                        2
                    )
                ).rejects.toThrow(
                    "Commande déjà terminée"
                );

            }
        );

    }
);