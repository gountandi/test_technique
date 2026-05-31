export interface MenuDto {
id: number;

name: string;

price: number;

restaurantId: number;

}

export interface CreateMenuDto {
name: string;

price: number;

restaurantId: number;

}

export interface UpdateMenuDto {
name?: string;

price?: number;

}
