import orderService from "../services/order-service.js";

const orderController = {
  async create(req, res) {
    console.log("🛒 CONTROLLER HIT!"); // ← INI HARUS MUNCUL!
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
  async findAll(req, res) {
    try {
      const orders = await orderService.findAll();
      res.status(200).json({
        message: "Success fetch orders",
        data: orders,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default orderController;
