import axios from "axios";
import { config } from "../config/config"

export const getHint = async () => {
    try {
        const url = `${config.apiUrl}/hint`;

        const response = await axios.get(url, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            throw new Error(`Error fetching hint: ${response.statusText}`);
        }

        return response.data;
    } catch (error) {
        console.error("Error in getHint:", error);
        throw new Error("Failed to fetch hint");
    }
}