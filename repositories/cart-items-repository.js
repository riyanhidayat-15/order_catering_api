import { CartItems, Menu } from "../models/index-model.js";

const cartItemsRepository = {
  findByCartId(cart_id) {
    return CartItems.findAll({
      where: { cart_id },
      include: Menu,
    });
  },

  findOne(cart_id, menu_id) {
    return CartItems.findOne({
      where: { cart_id, menu_id },
    });
  },
  create(data, options = {}) {
    return CartItems.create(data, options);
  },

  updateQuantity(id, quantity, options = {}) {
    return CartItems.update(
      { quantity },
      {
        where: { id },
        ...options,
      }
    );
  },
  delete(id, options = {}) {
    return CartItems.destroy({
      where: { id },
      ...options,
    });
  },
  deleteByCartId(cart_id, options = {}) {
    return CartItems.destroy({
      where: { cart_id },
      ...options,
    });
  },
};

export default cartItemsRepository;
