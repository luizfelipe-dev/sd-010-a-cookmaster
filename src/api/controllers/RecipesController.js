const recipeService = require('../services/RecipesService');

const createRecipe = async (req, res) => {
  const { userId } = req;
  const recipeData = req.body;

  const { status, message, recipe } = await recipeService.createRecipe(recipeData, userId);

  if (message) return res.status(status).json({ message });

  res.status(status).json({ recipe });
};

const getAll = async (req, res) => {
  const result = await recipeService.getAll();
  return res.status(200).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await recipeService.getById(id);
  if (!result) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(result);
};

module.exports = {
  createRecipe,
  getAll,
  getById,
};