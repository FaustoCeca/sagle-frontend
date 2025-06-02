import { config } from "../config/config";

export const registerUser = async () => {
    const url = `${config.apiUrl}/users/register`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log('User registered successfully:', data);

    return data;
}