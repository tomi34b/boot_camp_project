import express from "express";
import { adminAuth } from "../middlewares/auth.js";
import {
  getMembersCount,
  getBaptizedMembersCount,
  getUnBaptizedMembersCount,
  getAdditionalInfo,
  getGenderDistribution,
  getFirstTimersPerMonth,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/members_count", adminAuth, getMembersCount);
router.get("/baptized_members_count", adminAuth, getBaptizedMembersCount);
router.get("/unbaptized_members_count", adminAuth, getUnBaptizedMembersCount);
router.get("/additional_info", adminAuth, getAdditionalInfo);
router.get("/gender_distribution", adminAuth, getGenderDistribution);
router.get("/first_timers_per_month", adminAuth, getFirstTimersPerMonth);

export default router;
