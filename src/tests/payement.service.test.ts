import PaymentService from "../services/payment_service";

describe(
    "PaymentService",
    () => {

        test(
            "ne doit pas permettre le paiement d'une invoice déjà payée",
            async () => {

                const service =
                    new PaymentService();

                jest
                    .spyOn(
                        service["invoiceRepository"],
                        "findById"
                    )
                    .mockResolvedValue({
                        id: 1,
                        amount: 5000,
                        status: "PAID"
                    } as any);

                await expect(
                    service.payInvoice(
                        1
                    )
                ).rejects.toThrow();

            }
        );

    }
);