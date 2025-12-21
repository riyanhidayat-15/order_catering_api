import orderRepository from "../repositories/order-repository.js";

const orderService = {
  async create(payload) {
    const t = await db.transaction();
    try {
      const { customerName, whatsapp, address } = payload;
      const order = await orderRepository.create(
        {
          customer_name: customerName,
          whatsapp,
          address,
        },
        { transaction: t }
      );

      const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const orderNumber = `FIN-${date}-${String(order.id).padStart(6, "0")}`;

      const updateOrder = await orderRepository.update(
        order.id,
        {
          order_number: orderNumber,
        },
        { transaction: t }
      );

      await t.commit();
      return updateOrder;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },
};

export default orderService;
