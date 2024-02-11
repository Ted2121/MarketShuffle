import { baseUrl } from '../utility/serverAddress';


export async function createItem(item) {
    const url = `${baseUrl}api/item`;
    const body = JSON.stringify(item);
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "POST", body, headers });

    if (!response.ok) {
        const errorMessage = `Failed to create item: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.text();
}

export async function setFavorite(id, value) {
    if (!id) {
        throw new Error("The id parameter is required.");
    }

    console.log(value)

    const url = `${baseUrl}api/item/favorite/${id}`;
    const headers = {
        "Content-Type": "application/json"
    };

    const body = JSON.stringify(value);

    const response = await fetch(url, { method: "PUT", body, headers });

    if (!response.ok) {
        const errorMessage = `Failed to create item: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return true;
}


export async function getAllItems() {
    const url = `${baseUrl}api/item/`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
        const errorMessage = `Failed to get items: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export async function getAllItemsByCategory(category) {
    const url = `${baseUrl}api/item/category/${category}`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
        const errorMessage = `Failed to get items: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export async function deleteItemById(id) {
    const url = `${baseUrl}api/item/${id}`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "DELETE", headers });

    if (!response.ok) {
        const errorMessage = `Failed to delete item: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return true;
}

export async function getItemsBySearchString(search) {
    const url = `${baseUrl}api/item/search/${search}`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = search && await fetch(url, { method: "GET", headers });

    if (!response.ok) {
        const errorMessage = `Failed to get items by search string: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}