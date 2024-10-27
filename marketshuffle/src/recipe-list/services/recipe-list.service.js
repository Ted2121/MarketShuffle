import { baseUrl } from "../../utility/serverAddress";

export const getAllRecipeListsWithRows = async () => {
    const url = `${baseUrl}api/recipelists/`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
        const errorMessage = `Failed to get recipe lists: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}