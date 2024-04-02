import asyncHandler from "express-async-handler";
import BotMessage from "../mongodb/models/botMessageModel.js";

// @desc Create Bot Message
export const CreateBotMessage = asyncHandler(
  async (sender, receiver, message_id, body, first_timer_id) => {
    try {
      // Create message
      const message = new BotMessage({
        sender,
        receiver,
        message_id,
        body,
        first_timer_id,
      });

      await message.save();

      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// @desc find previous message
export const prevBotMessage = asyncHandler(async (senderId, receiverId) => {
  try {
    let prevMessage = await BotMessage.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: -1 });

    return prevMessage;
  } catch (error) {
    throw new Error(error.message);
  }
});
