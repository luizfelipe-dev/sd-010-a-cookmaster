const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connect().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return result.ops[0];
};

const getRecipeById = async (id) => {
  const result = await connect().then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return result;
};

const updateRecipe = async (entries) => {
  await connect().then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(entries.id) }, 
      { $set: { 
        name: entries.name, 
        ingredients: entries.ingredients, 
        preparation: entries.preparation,
      } }));

  return { 
    _id: ObjectId(entries.id),
    name: entries.name,
    ingredients: entries.ingredients,
    preparation: entries.preparation,
    userId: entries.userId,
  };
};

const getRecipes = async () => {
  const result = await connect().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
};
