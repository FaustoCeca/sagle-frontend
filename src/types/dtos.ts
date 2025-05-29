export interface SagaDto {
    title: string;
    imageUrl: any;
    categories: number[];
    perspectives: number[];
    artStyles: number[];
    hasMultiplayer: string;
    link: string;
}

export interface CategoryDto {
    name: string;
}

export interface GameDto {
    title: string;
    birthYear: number;
    imageUrl: any;
    saga: any;
    steamLink?: string;
}

export interface PerspectiveDto {
    name: string;
}

export interface ArtStylesDto {
    name: string;
}