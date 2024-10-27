import { baseUrl } from "../../utility/serverAddress";

export const getAllRecipeListRows = async () => {
    const url = `${baseUrl}api/recipelistrows/`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
        const errorMessage = `Failed to get recipe list rows: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export const addRecipeListRow = async (recipeRow) => {
    const url = `${baseUrl}api/recipelistrows`;
    const body = JSON.stringify(recipeRow);
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

export async function deletePositionById(id) {
    const url = `${baseUrl}api/recipelistrows/${id}`;
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