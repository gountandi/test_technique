export interface RestaurantDto {
id: number;

name: string;

}

export interface CreateRestaurantDto {
name: string;
}

export interface UpdateRestaurantDto {
name?: string;
}
