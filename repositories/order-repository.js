import OrderItems from "../models/order-items-model.js";
import Order from "../models/order-model.js";

const orderRepository = {
  create(data, options = {}) {
    return Order.create(data, options);
  },

  findAll() {
    return Order.findAll({ include: OrderItems });
  },

  findById(id) {
    return Order.findByPk(id, { include: OrderItems });
  },

  update(id, data, options = {}) {
    return Order.update(data, { where: { id }, ...options }).then(() =>
      this.findById(id, { include: OrderItems, ...options })
    );
  },

  delete(id) {
    return Order.destroy({ where: { id } });
  },
};

export default orderRepository;
