export const saveRecipe = (recipe) => {
    localStorage.setItem("recipe", recipe)
}

export const clearRecipe = () => {
    localStorage.clear("recipe")
}