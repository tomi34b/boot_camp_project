import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import User from "../mongodb/models/userModel.js";

dotenv.config();

export const adminAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decodeData;
      decodeData = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodeData.user);
      if (!user) {
        res.status(401).json({ message: "User does not exist." });
      }
      req.user = user;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no access token");
  }
});
