const rescue = require('express-rescue');
const recipeService = require('../services/recipeService');

const insertRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const { _id: userId } = req.payload;
  const recipe = await recipeService.createRecipe(name, ingredients, preparation, userId);
  if (recipe.err) {
    return res.status(recipe.err.status).json({ message: recipe.err.message });
  }
  res.status(201).json({ recipe });
});

const getAllRecipes = rescue(async (req, res) => {
  const recipes = await recipeService.getAllRecipes();
  res.status(200).json(recipes);
});

module.exports = {
  insertRecipe,
  getAllRecipes,
};