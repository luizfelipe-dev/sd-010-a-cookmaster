const recipeModel = require('../models/recipeModel');

const notFoundMessage = 'recipe not found';

const createRecipe = async (newRecipe) => {
  // console.log(error);
  const recipe = await recipeModel.createRecipe(newRecipe);

  return recipe;
};

const getRecipes = async () => {
  const recipes = await recipeModel.getRecipes();

  return recipes;
};

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);

  if (!recipe) return { code: 404, message: notFoundMessage };

  return recipe;
};

const editRecipe = async (newData) => {
  const edited = await recipeModel.editRecipe(newData);

  if (!edited) return { code: 404, message: notFoundMessage };

  return edited;
};

const vaporizeRecipe = async (id) => {
  const deleted = await recipeModel.vaporizeRecipe(id);

  if (!deleted) return { code: 404, message: notFoundMessage };

  return deleted;
};

module.exports = {
  createRecipe,
  getRecipes,
  getById,
  editRecipe,
  vaporizeRecipe,
};