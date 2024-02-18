import { baseUrl } from "../utility/serverAddress";

export async function createRecipe(recipe) {
    const url = `${baseUrl}api/recipeItem`;
    const body = JSON.stringify(recipe);
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "POST", body, headers });

    if (!response.ok) {
        const errorMessage = `Failed to create recipe: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return true;
}

export async function getRecipeByParentId(id) {
    const url = `${baseUrl}api/recipeItem/parent/${id}`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
        const errorMessage = `Failed to create recipe: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}