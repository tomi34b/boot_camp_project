import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const sendAccessToken = (user) => {
  try {
    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
