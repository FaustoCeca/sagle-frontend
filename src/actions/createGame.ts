import { config } from "../config/config";
import type { GameDto } from "../types/dtos";

export const createGame = async (gameData: GameDto, file: File) => {
    try {
        const url = `${config.apiUrl}/sagas/game`;
        const formData = new FormData();

        // Agregar el archivo
        formData.append('file', file);

        // Agregar los datos del juego
        formData.append('gameData', JSON.stringify(gameData));

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error creating game');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}