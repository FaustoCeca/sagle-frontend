import { config } from "../config/config"
import axios from "axios";

const url = `${config.apiUrl}/users/session`;

export const createSession = async () => {
    const response = await axios.post(url, {}, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true // This is important to send cookies
    });

    if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
}

export const getCurrentSession = async () => {
    const response = await axios.get(url, {
        withCredentials: true,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
}