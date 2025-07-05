import axios from "axios";
import { config } from "../config/config"

const baseUrl = `${config.apiUrl}/sagas`;

export const deleteSaga = async (id: number) => {
    const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) {
        throw new Error(`Error deleting saga with ID ${id}: ${response.statusText}`);
    }

    return response.data;
}

export const deleteGame = async (id: number) => {
    const response = await axios.delete(`${baseUrl}/games/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) {
        throw new Error(`Error deleting game with ID ${id}: ${response.statusText}`);
    }

    return response.data;
}

export const deleteCategory = async (id: number) => {
    const response = await axios.delete(`${baseUrl}/categories/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) {
        throw new Error(`Error deleting category with ID ${id}: ${response.statusText}`);
    }

    return response.data;
}

export const deletePerspective = async (id: number) => {
    const response = await axios.delete(`${baseUrl}/perspectives/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) {
        throw new Error(`Error deleting perspective with ID ${id}: ${response.statusText}`);
    }

    return response.data;
}

export const deleteArtStyle = async (id: number) => {
    const response = await axios.delete(`${baseUrl}/artstyles/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status !== 200) {
        throw new Error(`Error deleting art style with ID ${id}: ${response.statusText}`);
    }

    return response.data;
}