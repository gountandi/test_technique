import { prisma } from "../lib/prisma";
import { RestaurantDto } from "../types/restaurant";

export default class RestaurantRepository {

    public async findById(
        id: number
    ): Promise<RestaurantDto | null> {

        return await prisma.restaurant.findUnique({
            where: { id }
        }) as RestaurantDto | null;
    }
}