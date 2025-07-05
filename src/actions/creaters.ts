import axios from "axios";
import { config } from "../config/config";
import type { ArtStylesDto, CategoryDto, GameDto, PerspectiveDto, SagaDto } from "../types/dtos";

const baseUrl = `${config.apiUrl}/sagas`;

export const createArt = async (dto: ArtStylesDto) => {
    const response = await axios.post(`${baseUrl}/artstyle`, dto, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true, 
        method: 'POST',
    })

    if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
}

export const createCategory = async (dto: CategoryDto) => {
    const response = await axios.post(`${baseUrl}/category`, dto, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true, 
        method: 'POST',
    });

    if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
}

export const createGame = async (gameData: GameDto, file: File) => {
    try {
        const formData = new FormData();

        // Agregar el archivo
        formData.append('file', file);

        // Agregar los datos del juego
        formData.append('gameData', JSON.stringify(gameData));

        const response = await axios.post(`${baseUrl}/game`, formData, {
            withCredentials: true,
            method: 'POST',
        })

        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const createPerspectives = async (dto: PerspectiveDto) => {
    const response = await axios.post(`${baseUrl}/perspective`, dto, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
        method: 'POST',    
    })

    if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
}

export const createSaga = async (sagaData: SagaDto, file: File) => {
    try {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('sagaData', JSON.stringify(sagaData));

        const response = await axios.post(`${baseUrl}/saga`, formData, {
            withCredentials: true,
            method: 'POST',
        });

        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.data;
    } catch (error) {
        console.error('Error in createSaga:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}