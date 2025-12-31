import db from "../config/database.js";
import orderRepository from "../repositories/order-repository.js";
import { createManyOrderItems } from "../repositories/order-items-repository.js";
import menuRepository from "../repositories/menu-repository.js";
import { Transaction } from "sequelize";

const orderService = {
  async create(payload) {
    const {
      customer_name,
      whatsapp,
      address,
      delivery_date,
      delivery_time,
      delivery_type,
      payment_method,
      items,
    } = payload;

    const menuIds = items.map((item) => item.menu_id);
    const menus = await menuRepository.getByIds(menuIds);

    const menuMap = {};
    menus.forEach((menu) => (menuMap[menu.id] = menu));

    let totalPrice = 0;
    const orderItemsData = [];

    for (const item of items) {
      const menu = menuMap[item.menu_id];
      if (!menu) {
        throw new Error(`Menu dengan ID ${item.menu_id} tidak ditemukan`);
      }

      const itemTotal = menu.price * item.quantity;
      totalPrice += itemTotal;

      orderItemsData.push({
        menu_id: item.menu_id,
        quantity: item.quantity,
        price: menu.price,
        notes: item.notes || "",
      });
    }

    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const t = await db.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const order = await orderRepository.create(
        {
          customer_name,
          whatsapp,
          address,
          delivery_date,
          delivery_time,
          delivery_type,
          payment_method,
          total_price: totalPrice,
          order_number: null,
        },
        { transaction: t }
      );

      const orderNumber = `FIN-${date}-${String(order.id).padStart(6, "0")}`;
      order.order_number = orderNumber;
      await order.save({ transaction: t });

      orderItemsData.forEach((item) => {
        item.order_id = order.id;
      });

      await createManyOrderItems(orderItemsData, { transaction: t });

      await t.commit();

      return {
        id: order.id,
        order_number: orderNumber,
        customer_name,
        whatsapp,
        address,
        delivery_date,
        delivery_time,
        delivery_type,
        payment_method,
        total_price: totalPrice,
        items: orderItemsData,
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async findAll() {
    return await orderRepository.findAll();
  },
};

export default orderService;
