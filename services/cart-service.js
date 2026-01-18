import cartRepository from "../repositories/cart-repository.js";
import cartItemsRepository from "../repositories/cart-items-repository.js";
import menuRepository from "../repositories/menu-repository.js";
import db from "../config/database.js";
import { Transaction } from "sequelize";

const cartService = {
  async getCart(user_id) {
    const cart = await cartRepository.getOrCreate(user_id);
    return cart;
  },
  async updateItem(user_id, menu_id, qty, t = null) {
    let localTransaction = false;
    if (!t) {
      t = await db.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });
      localTransaction = true;
    }
    try {
      const cart = await cartRepository.getOrCreate(user_id);
      let cartItem = await cartItemsRepository.findOne(cart.id, menu_id);
      if (!cartItem) {
        throw new Error("Item not found in cart");
      }
      const newQty = cartItem.quantity + qty;
      await cartItemsRepository.updateQuantity(cartItem.id, newQty, {
        transaction: t,
      });
      if (localTransaction) {
        await t.commit();
      }
    } catch (error) {
      if (localTransaction) {
        await t.rollback();
      }
      throw error;
    }
  },
  async addToCart(user_id, menu_id, qty) {
    const t = await db.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const menu = await menuRepository.getById(menu_id);
      if (!menu) {
        throw new Error("Menu item not found");
      }
      const cart = await cartRepository.getOrCreate(user_id);
      let cartItem = await cartItemsRepository.findOne(cart.id, menu_id);
      if (cartItem) {
        await this.updateItem(user_id, menu_id, qty, t);
      } else {
        const data = {
          cart_id: cart.id,
          menu_id,
          quantity: qty,
          price: menu.price,
        };
        await cartItemsRepository.create(data, { transaction: t });
      }
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
  async removeItem(user_id, menu_id) {
    const t = await db.transaction();
    try {
      const cart = await cartRepository.getOrCreate(user_id);
      const cartItem = await cartItemsRepository.findOne(cart.id, menu_id);
      if (!cartItem) {
        throw new Error("Item not found in cart");
      }
      await cartItemsRepository.delete(cartItem.id, { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
  async clearCart(user_id) {
    const t = await db.transaction();
    try {
      const cart = await cartRepository.getOrCreate(user_id);
      await cartItemsRepository.deleteByCartId(cart.id, { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
  async validateCart(user_id) {
    const cart = await cartRepository.getOrCreate(user_id);
    const cartItems = await cartItemsRepository.findByCartId(cart.id);
    if (cartItems.length === 0) {
      throw new Error("Cart is empty");
    }
    for (const item of cartItems) {
      const menu = await menuRepository.getById(item.menu_id);
      if (!menu) {
        throw new Error(`Menu item with id ${item.menu_id} not found`);
      }
      if (menu.is_ready === false) {
        throw new Error(`Menu item ${menu.name} is not available`);
      }
    }
  },
};

export default cartService;
