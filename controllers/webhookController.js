import asyncHandler from "express-async-handler";
import { SendWhatsappMessage } from "../services/sendMessageService.js";
import {
  prevBotMessage,
  CreateBotMessage,
} from "../services/botMessageService.js";
import {
  createFirstTimer,
  updateFirstTimer,
} from "../services/firstTimerService.js";
import {
  prompts,
  aboutUsMethod,
  gender,
  modeOfContact,
  yesOrNo,
} from "../utils/data.js";

// @desc Analyse Response data from Whatsapp message bot
// @route POST /api/v1/webhook/message_bot
// @access Public
export const messageBotResponse = asyncHandler(async (req, res) => {
  try {
    console.log("INBOUND MESSAGE", req.body);

    const {
      From, // whatsapp:+2347082632448
      To, // whatsapp:+14155238886
      Body,
      MessageSid, // SM51cc82df0248bdf8bbc4f5be3aefbf05
    } = req.body;

    const senderId = To; // senderWhatsappNo
    const receiverId = From; // recieverWhatsappNo
    const messageBody = Body; // body of the message;
    const messageId = MessageSid; // id of the message;

    const prevMessage = await prevBotMessage(senderId, receiverId);
    console.log(prevMessage);
    // handle case where the user wants to exit the bot
    if (messageBody.toLowerCase() === "exit") {
      // send prompt 1
      const message_Id = await SendWhatsappMessage(
        senderId,
        receiverId,
        prompts["Prompt 1"]
      );

      // store the bot message
      return CreateBotMessage(receiverId, senderId, message_Id, "Prompt 1");
    }

    if (prevMessage) {
      const prevBody = prevMessage.body;
      const prevCaseId = prevMessage.first_timer_id ?? null;

      // store the recieved message
      const receiverMessage = CreateBotMessage(
        senderId,
        receiverId,
        messageId,
        messageBody,
        prevCaseId
      );

      // handle case when the previous messaage isn't a prompt
      if (!prevBody.includes("Prompt")) {
        // send prompt 1
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 1"]
        );

        // store the bot message
        return CreateBotMessage(receiverId, senderId, message_Id, "Prompt 1");
      }

      if (prevBody == "Prompt 1") {
        // create new first timer
        const newFirstTimerData = { fullname: messageBody };
        const result = await createFirstTimer(newFirstTimerData);

        // send prompt 2
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 2"]
        );

        //save prompt 2 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 2",
          result._id
        );
      } else if (prevBody == "Prompt 2") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 3 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 2 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 2"]);

          //save prompt 2 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 2",
            prevCaseId
          );
        } else {
          // update the case
          let newData = { gender: gender[messageBody] };
          console.log(prevCaseId, newData);
          await updateFirstTimer(prevCaseId, newData);
          // send prompt 3
          const message_Id = await SendWhatsappMessage(
            senderId,
            receiverId,
            prompts["Prompt 3"]
          );

          //save prompt 3 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 3",
            prevCaseId
          );
        }
      } else if (prevBody == "Prompt 3") {
        // update the case
        let newData = { address: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 3
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 4"]
        );

        //save prompt 4 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 4",
          prevCaseId
        );
      } else if (prevBody == "Prompt 4") {
        // update the case
        let newData = { post_code: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 5
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 5"]
        );

        //save prompt 5 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 5",
          prevCaseId
        );
      } else if (prevBody == "Prompt 5") {
        // update the case
        let newData = { mobile_number: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 6
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 6"]
        );

        //save prompt 6 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 6",
          prevCaseId
        );
      } else if (prevBody == "Prompt 6") {
        // update the case
        let newData = { home_number: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 7
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 7"]
        );

        //save prompt 7 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 7",
          prevCaseId
        );
      } else if (prevBody == "Prompt 7") {
        // update the case
        let newData = { email: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 8
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 8"]
        );

        //save prompt 8 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 8",
          prevCaseId
        );
      } else if (prevBody == "Prompt 8") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 2 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 8 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 8"]);

          //save prompt 8 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 8",
            prevCaseId
          );
        } else {
          // update the case
          let newData = { worshipped_with_us: yesOrNo[messageBody] };

          await updateFirstTimer(prevCaseId, newData);
          if (parsedMessageBody == 1) {
            // send prompt 9
            const message_Id = await SendWhatsappMessage(
              senderId,
              receiverId,
              prompts["Prompt 9"]
            );

            //save prompt 9 as bot message
            return CreateBotMessage(
              receiverId,
              senderId,
              message_Id,
              "Prompt 9",
              prevCaseId
            );
          } else {
            // send prompt 11
            const message_Id = await SendWhatsappMessage(
              senderId,
              receiverId,
              prompts["Prompt 11"]
            );

            //save prompt 11 as bot message
            return CreateBotMessage(
              receiverId,
              senderId,
              message_Id,
              "Prompt 11",
              prevCaseId
            );
          }
        }
      } else if (prevBody == "Prompt 9") {
        // update the case
        let newData = { worship_date: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 10
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 10"]
        );

        //save prompt 10 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 10",
          prevCaseId
        );
      } else if (prevBody == "Prompt 10") {
        // update the case
        let newData = { worship_location: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 11
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 11"]
        );

        //save prompt 11 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 11",
          prevCaseId
        );
      } else if (prevBody == "Prompt 11") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 2 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 8 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 11"]);

          //save prompt 11 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 11",
            prevCaseId
          );
        } else {
          // update the case
          let newData = { join_us: yesOrNo[messageBody] };

          await updateFirstTimer(prevCaseId, newData);
          // send prompt 12
          const message_Id = await SendWhatsappMessage(
            senderId,
            receiverId,
            prompts["Prompt 12"]
          );

          //save prompt 12 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 12",
            prevCaseId
          );
        }
      } else if (prevBody == "Prompt 12") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 2 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 12 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 12"]);

          //save prompt 12 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 12",
            prevCaseId
          );
        } else {
          // update the case
          let newData = { live_or_work_here: yesOrNo[messageBody] };

          await updateFirstTimer(prevCaseId, newData);
          // send prompt 13
          const message_Id = await SendWhatsappMessage(
            senderId,
            receiverId,
            prompts["Prompt 13"]
          );

          //save prompt 13 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 13",
            prevCaseId
          );
        }
      } else if (prevBody == "Prompt 13") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 6 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 8 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 13"]);

          //save prompt 8 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 13",
            prevCaseId
          );
        } else {
          // update the case
          let newData = { about_us_method: aboutUsMethod[messageBody] };

          await updateFirstTimer(prevCaseId, newData);
          if (parsedMessageBody == 6) {
            // send prompt 14
            const message_Id = await SendWhatsappMessage(
              senderId,
              receiverId,
              prompts["Prompt 14"]
            );

            //save prompt 14 as bot message
            return CreateBotMessage(
              receiverId,
              senderId,
              message_Id,
              "Prompt 14",
              prevCaseId
            );
          } else {
            // send prompt 15
            const message_Id = await SendWhatsappMessage(
              senderId,
              receiverId,
              prompts["Prompt 15"]
            );

            //save prompt 15 as bot message
            return CreateBotMessage(
              receiverId,
              senderId,
              message_Id,
              "Prompt 15",
              prevCaseId
            );
          }
        }
      } else if (prevBody == "Prompt 14") {
        // update the case
        let newData = { other_about_us_method: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 15
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 15"]
        );

        //save prompt 15 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 15",
          prevCaseId
        );
      } else if (prevBody == "Prompt 15") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 2 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 15 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 15"]);

          //save prompt 11 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 15",
            prevCaseId
          );
        } else {
          // update the case
          let newData = { attended_foundation_school: yesOrNo[messageBody] };

          await updateFirstTimer(prevCaseId, newData);
          // send prompt 16
          const message_Id = await SendWhatsappMessage(
            senderId,
            receiverId,
            prompts["Prompt 16"]
          );

          //save prompt 16 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 16",
            prevCaseId
          );
        }
      } else if (prevBody == "Prompt 16") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 2 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 16 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 16"]);

          //save prompt 16 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 16",
            prevCaseId
          );
        } else {
          // update the case
          let newData = {
            attended_word_of_faith_bible_school: yesOrNo[messageBody],
          };

          await updateFirstTimer(prevCaseId, newData);
          if (parsedMessageBody == 1) {
            // send prompt 17
            const message_Id = await SendWhatsappMessage(
              senderId,
              receiverId,
              prompts["Prompt 17"]
            );

            //save prompt 17 as bot message
            return CreateBotMessage(
              receiverId,
              senderId,
              message_Id,
              "Prompt 17",
              prevCaseId
            );
          } else {
            // send prompt 18
            const message_Id = await SendWhatsappMessage(
              senderId,
              receiverId,
              prompts["Prompt 18"]
            );

            //save prompt 18 as bot message
            return CreateBotMessage(
              receiverId,
              senderId,
              message_Id,
              "Prompt 18",
              prevCaseId
            );
          }
        }
      } else if (prevBody == "Prompt 17") {
        // update the case
        let newData = { highest_level: messageBody };

        await updateFirstTimer(prevCaseId, newData);

        // send prompt 18
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 18"]
        );

        //save prompt 18 as bot message
        return CreateBotMessage(
          receiverId,
          senderId,
          message_Id,
          "Prompt 18",
          prevCaseId
        );
      } else if (prevBody == "Prompt 18") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 2 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 18 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 18"]);

          //save prompt 11 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 18",
            prevCaseId
          );
        } else {
          // update the case
          let newData = { baptised: yesOrNo[messageBody] };

          await updateFirstTimer(prevCaseId, newData);
          // send prompt 19
          const message_Id = await SendWhatsappMessage(
            senderId,
            receiverId,
            prompts["Prompt 19"]
          );

          //save prompt 19 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 19",
            prevCaseId
          );
        }
      } else if (prevBody == "Prompt 19") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 4 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 19 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 19"]);

          //save prompt 19 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 19",
            prevCaseId
          );
        } else {
          // update the case
          let newData = { mode_of_contact: modeOfContact[messageBody] };

          await updateFirstTimer(prevCaseId, newData);

          // send prompt 20
          const message_Id = await SendWhatsappMessage(
            senderId,
            receiverId,
            prompts["Prompt 20"]
          );

          //save prompt 20 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 20",
            prevCaseId
          );
        }
      } else if (prevBody == "Prompt 20") {
        const parsedMessageBody = parseInt(messageBody);
        if (
          isNaN(parsedMessageBody) ||
          parsedMessageBody > 2 ||
          parsedMessageBody < 1
        ) {
          // send Invalid message
          await SendWhatsappMessage(
            senderId,
            receiverId,
            "The response you provided is invalid"
          );

          // send prompt 20 again
          await SendWhatsappMessage(senderId, receiverId, prompts["Prompt 20"]);

          //save prompt 20 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 20",
            prevCaseId
          );
        } else {
          // update the case
          let newData = {
            do_not_contact: yesOrNo[messageBody],
          };

          await updateFirstTimer(prevCaseId, newData);
          // send prompt 21
          const message_Id = await SendWhatsappMessage(
            senderId,
            receiverId,
            prompts["Prompt 21"]
          );

          //save prompt 21 as bot message
          return CreateBotMessage(
            receiverId,
            senderId,
            message_Id,
            "Prompt 21",
            prevCaseId
          );
        }
      } else {
        // send prompt 1
        const message_Id = await SendWhatsappMessage(
          senderId,
          receiverId,
          prompts["Prompt 1"]
        );

        // store the bot message
        CreateBotMessage(receiverId, senderId, message_Id, "Prompt 1");
      }
    } else {
      // send prompt 1
      const message_Id = await SendWhatsappMessage(
        senderId,
        receiverId,
        prompts["Prompt 1"]
      );

      // store the bot message
      CreateBotMessage(receiverId, senderId, message_Id, "Prompt 1");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const sendWhatsappMessage = asyncHandler(async (req, res) => {
  try {
    const {
      from, // whatsapp:+14155238886
      to, // whatsapp:+2347082632448
      body, // Hello world!
    } = req.body;

    if (!to || !body) {
      throw new Error("Missing some required fields");
    }

    const message = await SendWhatsappMessage(from, to, body);
    console.log("OUTBound", message);

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export const handleMessageStatus = asyncHandler(async (req, res) => {
  try {
    const message_status = req.body;
    console.log("MESSAGE STATUS", message_status);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
