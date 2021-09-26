const { sign } = require('jsonwebtoken');
const userModel = require('../model/userModel');
const { SECRET, jwtConfig } = require('../util/util');

const addUser = async (name, email, password) => {
  const user = await userModel.findByEmail(email);

  if (!name || !password) return { status: 400, message: 'Invalid entries. Try again.' };
  if (user) return { status: 409, message: 'Email already registered' };

  const { password: _, ...addedUser } = await userModel.addUser(name, email, password);

  return addedUser;
};

const findAll = async () => {
  const users = await userModel.findAll();

  return users;
};

const findByEmail = async (email) => {
  const user = await userModel.findByEmail(email);
  return user;
};

const login = async (email, password) => {
  if (!email || !password) return { status: 401, message: 'All fields must be filled' };
  const user = await userModel.findByEmail(email);
  if (!user) {
    return { status: 401, message: 'Incorrect username or password' };
  }

  const token = sign({ user }, SECRET, jwtConfig);
  return { token };
};

module.exports = {
  addUser,
  findAll,
  findByEmail,
  login,
};