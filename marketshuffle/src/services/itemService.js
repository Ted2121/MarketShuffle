import {baseUrl} from '../utility/serverAddress';


export async function setIsFavorite(id, value) {
    const url = `${baseUrl}api/v1/items/${id}`;
    const body = JSON.stringify(value);
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "POST", body, headers });

    if (!response.ok) {
        throw new Error(`Failed to set favorite to: ${value}`);
    }
}