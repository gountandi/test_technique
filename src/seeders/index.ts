import { prisma } from "../lib/prisma";


async function main() {

    console.log(
        "Suppression des anciennes données..."
    );

    await prisma.payment.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.menu.deleteMany();
    await prisma.client.deleteMany();
    await prisma.restaurant.deleteMany();

    console.log(
        "Création des restaurants..."
    );

    const restaurant1 =
        await prisma.restaurant.create({
            data: {
                name: "Chez Mama Africa"
            }
        });

    const restaurant2 =
        await prisma.restaurant.create({
            data: {
                name: "Le Gourmet Lomé"
            }
        });

    console.log(
        "Création des menus..."
    );

    await prisma.menu.createMany({
        data: [
            {
                name: "Burger",
                price: 3000,
                restaurantId:
                    restaurant1.id
            },
            {
                name: "Jus",
                price: 1000,
                restaurantId:
                    restaurant1.id
            },
            {
                name: "Frites",
                price: 1500,
                restaurantId:
                    restaurant1.id
            },
            {
                name: "Pizza",
                price: 5000,
                restaurantId:
                    restaurant2.id
            },
            {
                name: "Coca",
                price: 1200,
                restaurantId:
                    restaurant2.id
            }
        ]
    });

    console.log(
        "Création des clients..."
    );

    await prisma.client.createMany({
        data: [
            {
                name: "Nabila",
                phone: "90000001"
            },
            {
                name: "Kossi",
                phone: "90000002"
            },
            {
                name: "Afi",
                phone: "90000003"
            }
        ]
    });

    console.log(
        "Seed terminé avec succès."
    );
}

main()
    .catch((error) => {

        console.error(error);

        process.exit(1);

    })
    .finally(async () => {

        await prisma.$disconnect();

    });