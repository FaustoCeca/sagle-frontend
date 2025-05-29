import { config } from "../config/config"
import type { PerspectiveDto } from "../types/dtos";

export const createPerspectives = async (dto: PerspectiveDto) => {
    const url = `${config.apiUrl}/sagas/perspective`;

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