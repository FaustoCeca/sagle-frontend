import { config } from "../config/config"
import type { Saga } from "../types/game";
import type { UserDB } from "../types/user";

interface VoteGameResponse {
    message: string;
    success: boolean;
    user: UserDB;
    sagle: Saga
}

export const voteGame = async (gameId: number): Promise<VoteGameResponse> => {
    const url = `${config.apiUrl}/sagle/vote`;

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ gameId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error voting for game: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('Vote response:', data);
    return data;
}