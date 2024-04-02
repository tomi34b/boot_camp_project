import express from "express";
import {
  messageBotResponse,
  sendWhatsappMessage,
  handleMessageStatus,
} from "../controllers/webhookController.js";

const router = express.Router();

router.post("/message_bot", messageBotResponse);

// router.post("/outbound", sendWhatsappMessage);

router.post("/status", handleMessageStatus);

export default router;
