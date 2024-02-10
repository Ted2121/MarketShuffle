import {baseUrl} from '../utility/serverAddress';


export async function setIsFavorite(id, value) {
    const url = `${baseUrl}api/item/${id}`;
    const body = JSON.stringify(value);
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "PUT", body, headers });

    if (!response.ok) {
        throw new Error(`Failed to set favorite to: ${value}`);
    }
}

export async function createItem(item) {
    const url = `${baseUrl}api/item/${id}`;
    const body = JSON.stringify(value);
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "POST", body, headers });

    if (!response.ok) {
        throw new Error(`Failed to set favorite to: ${value}`);
    }

    return response;
}