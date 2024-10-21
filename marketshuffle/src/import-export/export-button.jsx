import React from 'react';
import { Button } from "@mui/material";

const exportLocalStorageToJson = () => {
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageData[key] = value;
    }
    return JSON.stringify(localStorageData, null, 2); // Convert to JSON with indentation for readability
};

const downloadLocalStorageAsJson = () => {
    const jsonData = exportLocalStorageToJson();
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "localStorageData.json"; // The name of the downloaded file
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export default function ExportButton() {

    return (
        <Button
            variant="outlined"
            onClick={downloadLocalStorageAsJson}
        >
            Export Data
        </Button>
    );
}