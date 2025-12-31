import express from "express";
import { createOrderSchema } from "../validations/order-validations.js";
import orderController from "../controllers/order-controller.js";
import validate from "../middleware/validator.js";

const router = express.Router();

router.post("/", validate(createOrderSchema), async (req, res, next) => {
  console.time("🔥-ORDERS-TOTAL");
  console.log("🚀 POST /orders HIT!");

  try {
    const result = await orderController.create(req, res, next);
    console.timeEnd("🔥-ORDERS-TOTAL");
    res.json(result);
  } catch (error) {
    console.error("💥 ERROR:", error.message);
    console.timeEnd("🔥-ORDERS-TOTAL");
    res.status(500).json({ error: error.message });
  }
});
router.get("/", orderController.findAll);

export default router;
