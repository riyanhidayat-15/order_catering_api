import { Cart, CartItems, Menu } from "../models/index-model.js";

const cartRepository = {
  create(user_id, options = {}) {
    return Cart.create({ user_id }, options);
  },

  findByUserId(user_id, options = {}) {
    return Cart.findOne({
      where: {
        user_id,
      },
      include: {
        model: CartItems,
        include: Menu,
      },
      ...options,
    });
  },

  async getOrCreate(user_id, options = {}) {
    let cart = await this.findByUserId(user_id, options);
    if (!cart) {
      cart = await this.create(user_id, options);
    }

    return cart;
  },

  delete(cart_id) {
    return Cart.destroy({ where: { id: cart_id } });
  },
};

export default cartRepository;
