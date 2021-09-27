const { ObjectId } = require('mongodb');
const connect = require('./connection');

module.exports = {
  async get(id) {
    const db = await connect();
    
    if (!id) return db.collection('recipes').find({}).toArray();
    
    return db.collection('recipes').findOne({ _id: ObjectId(id) });
  },

  async create(recipe, user) {
    const db = await connect();
    const recipeCreated = await db.collection('recipes').insertOne({
      ...recipe,
      userId: user.id,
    });

    return recipeCreated.ops[0];
  },

  async update(id, updatesForRecipe, file) {
    const db = await connect();
    const currentRecipe = await this.get(id);
    const recipeUpdated = { ...currentRecipe, ...updatesForRecipe };
    if (file) recipeUpdated.image = `localhost:3000/src/uploads/${id}.jpeg`;
    await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: recipeUpdated });
    return recipeUpdated;
  },

  async delete(id) {
    const db = await connect();
    return db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  },
};
