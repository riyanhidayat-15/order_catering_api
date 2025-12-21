import User from "../models/user-model.js";

export const createUser = async (data) => {
  return await User.create(data);
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const getUserById = async (id) => {
  return await User.findByPk(id);
};

export const updateUser = async (id, data) => {
  await User.update(data, { where: { id } });
  return getUserById(id);
};

export const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};
