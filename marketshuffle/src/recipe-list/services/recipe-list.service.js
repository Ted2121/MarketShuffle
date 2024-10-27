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

export const addRecipeList = async (recipeList) => {
    const url = `${baseUrl}api/recipelists`;
    const body = JSON.stringify(recipeList);
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

export async function deleteRecipeListById(id) {
    const url = `${baseUrl}api/recipelists/${id}`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "DELETE", headers });

    if (!response.ok) {
        const errorMessage = `Failed to delete row: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return true;
}