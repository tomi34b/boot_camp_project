import asyncHandler from "express-async-handler";
import BotMessage from "../mongodb/models/botMessageModel.js";
import FirstTimer from "../mongodb/models/firstTimerModel.js";

// @desc Create first timer
export const createFirstTimer = asyncHandler(async (data) => {
  try {
    const result = new FirstTimer(data);

    await result.save();

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc update first timer
export const updateFirstTimer = asyncHandler(async (id, data) => {
  try {
    const result = await FirstTimer.findByIdAndUpdate(id, data, { new: true });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
});
