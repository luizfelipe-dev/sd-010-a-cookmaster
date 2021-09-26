const recipeService = require('../services/recipeService');

const getRecipes = async (req, res) => {
    const result = await recipeService.getRecipes();
    return res.status(200).send(result);
};

const gettingOneRecipe = async (req, res) => {
    const { id } = req.params;
    const result = await recipeService.gettingOneRecipe(id);
    if (result.message) return res.status(result.status).json({ message: result.message });
    return res.status(200).json(result);
};

module.exports = {
    getRecipes,
    gettingOneRecipe,
};
