// app.js from Day 20 (week 4) Hackathon - Friday 10th December.

import express from "express";
// import Router from "express-promise-router";

import * as recipes from "./models/recipes.js";
import { po, ps } from "./models/utils.js";

/*
DONE recipes.getRecipes(); //return an array of all recipes

DONE recipes.getRecipeByID(req.params.id); //return the particular recipe we are looking for

recipes.createRecipe(recipeObj); //add a recipe to the collection and return the new recipe

recipes.updateRecipeByID(req.params.id); // replace the recipe at a certain ID with an updated version and return the new recipe

recipes.deleteRecipeByID(req.params.id); //remove the specific recipe from the collection, and return the deleted recipe
*/

import { html } from "./config.js";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

/** DO NOT CHANGE THIS ROUTE - it serves our front-end */
app.get("/", function (req, res) {
    res.sendFile(html);
});

/** YOUR ROUTES GO HERE */

//GET	 | /recipes | all recipes	 | { success: Boolean, payload: recipe array }
app.get("/recipes", (req, res) => {
    ps(`app.js: you've reached GET /recipes. `);
    const allRecipes = recipes.getRecipes(); //return an array of all recipes
    res.json({
        success: true,
        payload: allRecipes,
    });
});

// GET	|   /recipes/<recipe_id>		| recipes with a particular id if it exists	 |  success: Boolean, payload: recipe }
app.get(`/recipes/:id`, (req, res) => {
    ps(`app.js: youve reached GET /recipes/${recipeID}`);

    const recipeID = req.params.id;
    const chosenRecipe = recipes.getRecipeByID(recipeID);

    res.json({
        success: true,
        payload: chosenRecipe,
    });
});

// POST	 | /recipes	 | { body }	 | create a new recipe	| { success: Boolean, payload: recipe }
app.post(`/recipes`, (req, res) => {
    ps(`app.js: youve reached  POST /recipes`);
    po(req.body);

    const newRecipe = recipes.createRecipe(req.body); //add a recipe to the collection and return the new recipe
    res.json({
        success: true,
        payload: newRecipe,
    });
});

//PUT	/recipes/<recipe_id>	{ body }	updated recipe	{ success: Boolean, payload: recipe }

app.put(`/recipes/:id`, (req, res) => {
    ps(`app.js: youve reached  PUT /recipes/${req.params.id}`);

    const updatedRecipe = recipes.updateRecipeByID(req.params.id, req.body);
    res.json({
        success: true,
        payload: updatedRecipe,
    });
});

//DELETE	/recipes/<recipe_id>		recipe deleted	{ success: Boolean, payload: recipe }
//remove the specific recipe from the collection, and return the deleted recipe
app.delete(`/recipes/:id`, (req, res) => {
    ps(`app.js: youve reached  DELETE /recipes/${req.params.id}`);

    const deletedRecipe = recipes.deleteRecipeByID(req.params.id);
    res.json({
        success: true,
        payload: deletedRecipe,
    });
});

/** END OF YOUR ROUTES */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
