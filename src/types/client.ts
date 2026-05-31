export interface ClientDto {
id: number;

name: string;

phone?: string;

}

export interface CreateClientDto {
name: string;

phone?: string;

}

export interface UpdateClientDto {
name?: string;

phone?: string;

}
