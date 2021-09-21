const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userId = _id;
  const { error, recipe } = await recipesService
  .createRecipe(name, ingredients, preparation, userId);
  if (error) return res.status(error.status).json({ message: error.message });
  return res.status(201).json({ recipe });
};

const getAllRecipes = async (req, res) => {
  const recipes = await recipesService.getAllRecipes();
  return res.status(200).json(recipes);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};