import axios from "axios";
import { config } from "../config/config";
import type { GameDto, SagaDto } from "../types/dtos";

const baseUrl = `${config.apiUrl}/sagas`;

export const updateSaga = async (sagaId: number, sagaData: SagaDto, file?: File | null) => {
    try {
        const formData = new FormData();

        if (file) {
            formData.append('file', file);
        }

        formData.append('sagaData', JSON.stringify(sagaData));

        const response = await axios.put(`${baseUrl}/${sagaId}`, formData, {
            withCredentials: true,
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error updating saga:', error);
        throw error;
    }
}

export const updateGame = async (gameId: number, gameData: GameDto, file?: File | null) => {
    try {
        const formData = new FormData();

        if (file) {
            formData.append('file', file);
        }

        formData.append('gameData', JSON.stringify(gameData));

        const response = await axios.put(`${baseUrl}/games/${gameId}`, formData, {
            withCredentials: true,
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error updating game:', error);
        throw error;
    }
}