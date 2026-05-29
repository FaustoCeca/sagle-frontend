import { config } from "../config/config"
import type { AttemptResult } from "../types/game";

export const attempt = async (sagaId: number): Promise<{
    message: string;
    success: boolean;
    haveFoundSagle?: boolean;
    result: AttemptResult;
}> => {
    const url = `${config.apiUrl}/sagle/attempt`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sagaId }),
        credentials: "include", // Include cookies in the request
    });

    if (!response.ok) {
        throw new Error(`Failed to attempt game: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(`Attempt failed: ${data.message}`);
    }

    return {
        message: data.message,
        success: data.success,
        haveFoundSagle: data.haveFoundSagle,
        result: data.result,
    };
}
