import { prisma } from "../lib/prisma.js";
import { RestaurantDto } from "../types/restaurant.js";

export default class RestaurantRepository {

    public async findById(
        id: number
    ): Promise<RestaurantDto | null> {

        return await prisma.restaurant.findUnique({
            where: { id }
        }) as RestaurantDto | null;
    }
}