import { prisma } from "../lib/prisma";
import { ClientDto } from "../types/client";

export default class ClientRepository {

    public async findById(
        id: number
    ): Promise<ClientDto | null> {

        return await prisma.client.findUnique({
            where: { id }
        }) as ClientDto | null;
    }
}