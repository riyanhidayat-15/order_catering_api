import { register, login } from "../controllers/user-controller.js";
import validate from "../middleware/validator.js";
import express from "express";
import {
  loginSchema,
  registerSchema,
} from "../validations/user-validations.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
