const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const controllers = require('../controllers');
const upload = require('../middlewares');

router.post('/', rescue(controllers.recipesController.createRecipe));
router.get('/', rescue(controllers.recipesController.getAllRecipes));
router.get('/:id', rescue(controllers.recipesController.getRecipeById));
router.put('/:id', rescue(controllers.recipesController.updateRecipe));
router.put('/:id/image/', upload.single('image'), rescue(controllers.recipesController.addImage));
router.delete('/:id', rescue(controllers.recipesController.deleteRecipe));

module.exports = router;