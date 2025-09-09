
export interface Saga {
    id: number;
    title: string;
    isTheSagle: boolean;
    imageUrl: string;
    lastTimeBeingSagle: Date | string   | null;
    wasSagleYesterday: boolean;
    categories: Category[];
    games: Game[];
    perspectives: Perspective[];
    artStyles: ArtStyles[];
    hasMultiplayer: "yes" | "no" | "some";
    link: string;
    createdAt: Date;
}

export interface ArtStyles {
    id: number;
    name: string;
    sagas: Saga[];
}

export interface Perspective {
    id: number;
    name: string;
    sagas: Saga[];
}

export interface Category {
    id: number;
    name: string;
    sagas: Saga[];
}

export interface Game {
    id: number;
    title: string;
    birthYear: number;
    imageUrl: string;
    // saga: Saga;
    sagaId: number;
    votes: number;
    steamLink?: string;
    createdAt: Date;
}

export interface Hint {
    id: number;
    text: string;
    language: "es" | "en" | "fr";
    sagaId: number;
    createdAt: Date;
}