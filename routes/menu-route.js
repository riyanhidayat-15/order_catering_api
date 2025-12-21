import menuController from "../controllers/menu-controller.js";
import menuValidation from "../validations/menu-validations.js";
import { upload } from "../middleware/multer.js";
import express from "express";

const router = express.Router();

router.post(
  "/",
  upload.array("images", 5),
  menuValidation.createMenuSchema,
  menuController.createMenuController
);
router.get("/", menuController.getMenusController);
router.get("/:id", menuController.detailMenuController);
router.patch(
  "/:id",
  menuValidation.createMenuSchema,
  menuController.updateMenuController
);
router.delete("/:id", menuController.deleteMenuController);

export default router;
