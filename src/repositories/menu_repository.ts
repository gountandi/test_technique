import { prisma } from "../lib/prisma";
import { MenuDto } from "../types/menu";

export default class MenuRepository {

    public async findById(
        id: number
    ): Promise<MenuDto | null> {

        return await prisma.menu.findUnique({
            where: { id }
        }) as MenuDto | null;
    }
}