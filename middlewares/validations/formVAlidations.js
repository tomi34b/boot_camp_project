import { body, validationResult } from "express-validator";

export const registerUserValidation = [
  [
    body("fullname").notEmpty().withMessage(" Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
];

export const loginUserValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
