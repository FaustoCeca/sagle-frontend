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

    // BUG-04: the backend replies 201 to POST /users/session. Accept any 2xx
    // so the first visitor's session is created without a failed attempt.
    if (response.status < 200 || response.status >= 300) {
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

    // BUG-04: the backend replies 201 to POST /users/session. Accept any 2xx
    // so the first visitor's session is created without a failed attempt.
    if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
}