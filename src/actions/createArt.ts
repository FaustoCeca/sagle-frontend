import { config } from "../config/config"
import type { ArtStylesDto } from "../types/dtos";

export const createArt = async (dto: ArtStylesDto) => {
    const url = `${config.apiUrl}/sagas/artstyle`;

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