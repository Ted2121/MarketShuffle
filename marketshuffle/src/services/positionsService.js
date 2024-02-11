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
