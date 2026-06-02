import { prisma } from "../lib/prisma.js";
import { MenuDto } from "../types/menu.js";

export default class MenuRepository {

    public async findById(
        id: number
    ): Promise<MenuDto | null> {

        return await prisma.menu.findUnique({
            where: { id }
        }) as MenuDto | null;
    }
}