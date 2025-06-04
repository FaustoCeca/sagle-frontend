import { config } from "../config/config"

export const winSagle = async (): Promise<{message: string, success: boolean}> => {
    const url = `${config.apiUrl}/sagle/win-sagle`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error winning Sagle:', error);
        throw error;
    }
}