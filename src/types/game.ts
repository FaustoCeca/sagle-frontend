
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

export type FieldState = "correct" | "partial" | "incorrect";
export type ArrowDirection = "up" | "down" | null;

export interface AttemptField {
    value: string;
    state: FieldState;
    arrow?: ArrowDirection;
}

/**
 * Per-field comparison of a guessed saga against the Sagle, computed on the
 * backend (BUG-03). The client never receives the Sagle itself.
 */
export interface AttemptResult {
    sagaId: number;
    title: string;
    imageUrl: string;
    categories: AttemptField;
    games: AttemptField;
    firstGame: AttemptField;
    lastGame: AttemptField;
    perspectives: AttemptField;
    artStyles: AttemptField;
    multiplayer: AttemptField;
}