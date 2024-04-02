import asyncHandler from "express-async-handler";
import Twilio from "twilio";
import * as dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountAuth = process.env.TWILIO_ACCOUNT_AUTH;

const client = new Twilio(accountSid, accountAuth);

export const SendWhatsappMessage = asyncHandler(async (from, to, body) => {
  try {
    const message = await client.messages.create({
      from: from ?? process.env.TWILIO_WHATSAPP_NUMBER,
      to,
      body,
    });
    return message.sid; // Return the message_id (SID)
  } catch (error) {
    throw error;
  }
});
