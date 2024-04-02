import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../mongodb/models/userModel.js";
import { sendAccessToken } from "../utils/sendToken.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// @desc Create Admin User
// @route POST /api/v1/user
// @access Private
export const createAdminUser = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password, confirm_password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({
      email,
    });

    if (user) {
      res.status(400);
      throw new Error("User already exists");
    }
    if (password !== confirm_password) {
      res.status(401);
      throw new Error("Password do not match");
    }

    // Create user
    const newUser = new User({
      fullname,
      email,
      password,
    });

    await newUser.save();

    const accessToken = sendAccessToken(newUser._id);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: { newUser, accessToken },
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc Login Admin User
// @route POST /api/v1/user/login
// @access Private
export const loginAdminUser = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
    const passwordMatch = await user.isPasswordMatch(password);
    const accessToken = passwordMatch && sendAccessToken(user._id);
    if (passwordMatch) {
      res.status(200).json({ data: { user, accessToken }, success: true });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc Get My Profile
// @route GET /api/v1/user/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
