import { prisma } from "../lib/prisma.js";
import { ClientDto } from "../types/client.js";

export default class ClientRepository {

    public async findById(
        id: number
    ): Promise<ClientDto | null> {

        return await prisma.client.findUnique({
            where: { id }
        }) as ClientDto | null;
    }
}