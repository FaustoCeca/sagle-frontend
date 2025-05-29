import { config } from "../config/config";
import type { SagaDto } from "../types/dtos";

export const createSaga = async (sagaData: SagaDto, file: File) => {
    try {
        const url = `${config.apiUrl}/sagas/saga`;
        const formData = new FormData();

        // console.log('Creating saga with data:', JSON.stringify(sagaData, null, 2));
        // console.log('File to upload:', file);
        formData.append('file', file);
        formData.append('sagaData', JSON.stringify(sagaData));

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        
        if (!response.ok) {
            throw new Error('Error creating saga');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error in createSaga:', error);
        throw error; // Re-throw the error for further handling if needed
    }
}