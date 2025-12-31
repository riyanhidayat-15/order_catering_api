import menuController from "../controllers/menu-controller.js";
import validate from "../middleware/validator.js";
import { upload } from "../middleware/multer.js";
import express from "express";
import menuSchema from "../validations/menu-validations.js";
const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  validate(menuSchema),
  menuController.createMenuController
);
console.log();
router.get("/", menuController.getMenusController);
router.get("/:id", menuController.detailMenuController);
router.patch("/:id", validate(menuSchema), menuController.updateMenuController);
router.delete("/:id", menuController.deleteMenuController);

export default router;
