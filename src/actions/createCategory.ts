import { config } from "../config/config"
import type { CategoryDto } from "../types/dtos";

export const createCategory = async (dto: CategoryDto) => {
    const url = `${config.apiUrl}/sagas/category`;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}