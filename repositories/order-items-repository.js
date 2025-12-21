import OrderItems from "../models/order-items-model.js";

const createOrderItems = async (data) => {
  return await OrderItems.create(data);
};

const createManyOrderItems = async (items) => {
  return await OrderItems.bulkCreate(items);
};

const findOrderItemsByOrderId = async (orderId) => {
  return await OrderItems.findAll({
    where: { order_id: orderId },
  });
};

const deleteByOrderId = async (orderId) => {
  return await OrderItems.destroy({ where: { order_id: orderId } });
};

export default {
  createOrderItems,
  createManyOrderItems,
  findOrderItemsByOrderId,
  deleteByOrderId,
};
