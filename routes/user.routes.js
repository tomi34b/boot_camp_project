import express from "express";
import { adminAuth } from "../middlewares/auth.js";
import {
  registerUserValidation,
  loginUserValidation,
} from "../middlewares/validations/formVAlidations.js";
import {
  createAdminUser,
  loginAdminUser,
  getMe,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUserValidation, createAdminUser);
router.post("/login", loginUserValidation, loginAdminUser);
router.get("/me", adminAuth, getMe);

export default router;
