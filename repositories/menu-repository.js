import Menu from "../models/menu-model.js";

const create = async (data) => {
  return await Menu.create(data);
};

const getAll = async () => {
  return await Menu.findAll();
};

const getById = async (id) => {
  return await Menu.findByPk(id);
};

const update = async (id, data) => {
  await Menu.update(data, { where: { id } });
  return await getById(id);
};

const deleteById = async (id) => {
  return await Menu.destroy({ where: { id } });
};

export default {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
