import asyncHandler from "express-async-handler";
import FirstTimer from "../mongodb/models/firstTimerModel.js";

// @desc Get all first timers
// @route GET /api/v1/first_timers
// @access Private
export const getAllFirstTimers = asyncHandler(async (req, res) => {
  try {
    const firstTimers = await FirstTimer.find().sort({ createdAt: -1 });
    res.status(200).json({ firstTimers, success: true });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
