import orderService from "../services/order-service.js";

const orderController = {
  async create(req, res) {
    try {
      const order = await orderService.create(req.body);
      res.status(201).json({
        message: "Success create order",
        data: order,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default orderController;
