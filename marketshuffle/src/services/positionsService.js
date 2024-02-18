import { baseUrl } from '../utility/serverAddress';

export async function getAllPositionsByItemId(id) {
    const url = `${baseUrl}api/itemPosition/allForItem/${id}`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
        const errorMessage = `Failed to get positions for item: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }
    return await response.json();
}

export async function createPositionForItem(itemPositionDto) {
    const url = `${baseUrl}api/itemPosition`;
    const body = JSON.stringify(itemPositionDto);
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "POST", body, headers });

    if (!response.ok) {
        const errorMessage = `Failed to create position: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return response.text();
}