const { ObjectId } = require('bson');
const getConnection = require('./connection');

const collectionName = 'recipes';

const register = async (name, ingredients, preparation) => {
    const db = await getConnection(); 
    const result = await db.collection(collectionName)
    .insertOne({ name, ingredients, preparation });
    return { _id: result.insertedId, name, ingredients, preparation };
  };

const getAllProducts = async () => {
  const db = await getConnection(); 
  const products = await db.collection(collectionName).find({}).toArray();
  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await getConnection(); 
  const recipe = await db.collection(collectionName).findOne({ _id: ObjectId(id) });
  return recipe;
};
const update = async (name, ingredients, preparation) => {
  const db = await getConnection();
  await db.collection(collectionName)
      .updateOne({ name }, { $set: { name, ingredients, preparation } });
  return { name, ingredients, preparation };
};

  module.exports = {
    register,
    getAllProducts,
    getById,
    update,
  }; 