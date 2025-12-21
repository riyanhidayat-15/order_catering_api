import { register, login } from "../controllers/user-controller.js";
import userValidation from "../validations/user-validations.js";
import express from "express";

const router = express.Router();

router.post("/register", userValidation.register, register);
router.post("/login", userValidation.login, login);

export default router;
