import cartController from "../controllers/cart-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(authMiddleware);

router.get("/", cartController.getCart);
router.post("/items", cartController.addToCart);
router.put("/items", cartController.updateItem);
router.delete("/items/:menu_id", cartController.removeCartItem);
router.delete("/clear", cartController.clearCart);

export default router;
