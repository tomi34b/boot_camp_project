import mongoose from "mongoose";

const { Schema, model } = mongoose;

const botMessageSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message_id: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    first_timer_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("BotMessage", botMessageSchema);
