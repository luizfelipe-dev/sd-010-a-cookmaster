const { Router } = require('express');
const createUser = require('./controllers/usersController');
const login = require('./controllers/loginController');
const validateUser = require('./validations/userValidation');
const validateRecipes = require('./validations/recipesValidation');
const validateJWT = require('./auth/validateJWT');
const { 
  createRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
} = require('./controllers/recipesController');

const routes = Router();

routes.post('/users', validateUser, createUser); // requisito 1
routes.post('/login', login); // requisito 2
routes.post('/recipes', validateRecipes, validateJWT, createRecipes); // requisito 3
routes.get('/recipes', getAllRecipes); // requisito 4
routes.get('/recipes/:id', getRecipesById); // requisito 5
routes.put('/recipes/:id', validateJWT, updateRecipesById); // requisito 7
routes.delete('/recipes/:id', validateJWT, deleteRecipesById); // requisito 7

module.exports = routes;
