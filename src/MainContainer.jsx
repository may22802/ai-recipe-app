import React from "react";
import ClaudeRecipe from "./componenets/ClaudeRecipe";
import IngredientsList from "./componenets/IngredientsList";
import { getRecipeFromMistral } from "../ai";

export default function MainContainer() {

    const [ingredients, setIngredients] = React.useState(
        []
    )

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    const [recipeShown, setRecipeShown] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipeShown(recipeMarkdown)
    }


    function addIngredient(formData) {
        const newIngredient = formData.get('ingredient')
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. Oregano"
                    aria-label="Add Ingredients"
                    name="ingredient"
                />
                <button>Add Ingredient</button>
            </form>
            {ingredients.length > 0 ?
                <IngredientsList ingredientsList={ingredients} getRecipe={getRecipe}/>
                : null
            }
            {
                recipeShown &&
                <ClaudeRecipe recipe={recipeShown} />
            }
        </main>
    )
}