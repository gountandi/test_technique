import InvoiceService from "../services/invoice_service";

describe(
    "InvoiceService",
    () => {

        test(
            "doit calculer correctement un complément",
            async () => {

                const service =
                    new InvoiceService();

                jest
                    .spyOn(
                        service,
                        "getPaidAmount"
                    )
                    .mockResolvedValue(
                        4000
                    );

                const paid =
                    await service
                        .getPaidAmount(
                            1
                        );

                const total =
                    5500;

                const remaining =
                    total - paid;

                expect(
                    remaining
                ).toBe(
                    1500
                );

            }
        );

    }
);