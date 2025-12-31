import { Order, OrderItems } from "../models/index-model.js";
const orderRepository = {
  create(data, options = {}) {
    console.log("🏪 ORDER REPO HIT!"); // ← INI HARUS MUNCUL!

    return Order.create(data, options);
  },

  findAll() {
    return Order.findAll({ include: OrderItems });
  },

  findById(id, options = {}) {
    return Order.findByPk(id, {
      include: OrderItems,
      ...options,
    });
  },

  update(id, data, options = {}) {
    return Order.update(data, { where: { id }, ...options }).then(() =>
      this.findById(id, options)
    );
  },

  delete(id) {
    return Order.destroy({ where: { id } });
  },
};

export default orderRepository;
