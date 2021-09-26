const { ObjectId } = require('bson');
const conexao = require('./conexao');

// Conectando receitasModel com usuariosModel
const usuariosModel = require('./usuariosModel');

const cadastrarReceita = async (name, ingredients, preparation, userId) => {
  const db = await conexao();
  
 const cadastrar = await db.collection('recipes')
 .insertOne({ name, ingredients, preparation, userId });

  return { recipe: cadastrar.ops[0] };
};

const listarReceitas = async () => {
  const db = await conexao();
  const receitas = await db.collection('recipes').find({}).toArray();
  return receitas;
};

const listarReceitasPorID = async (id) => {
  // Verificando se o id é válido
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const receita = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return receita;
};

const atualizarReceita = async (id, atualizacao, role, _id) => {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = atualizacao;

  // const infoReceita = await listarReceitasPorID(id);
  const infoUsuario = await usuariosModel.buscarPeloUsuarioID(_id);
  // console.log(infoReceita.userId);
  // console.log(infoUsuario.role);
    
  // if (_id !== infoReceita.userId) console.log('a');
  if (infoUsuario.role === role || role === 'admin') {
    const db = await conexao();
    await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
    return { _id, name, ingredients, preparation, userId: _id };
  }

  return false;
};

// "_id": 615078e9e291645a98c75bf6

module.exports = {
  cadastrarReceita,
  listarReceitas,
  listarReceitasPorID,
  atualizarReceita,
};