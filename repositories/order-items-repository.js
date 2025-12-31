import OrderItems from "../models/order-items-model.js";

export const createOrderItems = async (data, options = {}) => {
  return await OrderItems.create(data, options);
};

export const createManyOrderItems = async (items, options = {}) => {
  return await OrderItems.bulkCreate(items, {
    ...options,
    validate: true,
  });
};

export const findOrderItemsByOrderId = async (orderId) => {
  return await OrderItems.findAll({
    where: { order_id: orderId },
  });
};

export const deleteByOrderId = async (orderId, options = {}) => {
  return await OrderItems.destroy({
    where: { order_id: orderId },
    ...options,
  });
};
