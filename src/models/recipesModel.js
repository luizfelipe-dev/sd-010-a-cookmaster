const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipesSubmit = async ({ name, ingredients, preparation }, userId) => {
    const db = await connection();
    const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    const { insertedId: _id } = newRecipe;
    return { recipe: { name, ingredients, preparation, userId, _id } };
};

const getRecipesModels = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getByIdRecipeModels = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

const editRecipeModels = async (id, edit) => {
  const { name, ingredients, preparation } = edit;
  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  const editedRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return editedRecipe;
};

module.exports = {
  recipesSubmit,
  getRecipesModels,
  getByIdRecipeModels,
  editRecipeModels,
};
