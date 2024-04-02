import express from "express";
import { adminAuth } from "../middlewares/auth.js";
import { getAllFirstTimers } from "../controllers/firstTimersController.js";

const router = express.Router();

router.get("/", adminAuth, getAllFirstTimers);

export default router;
