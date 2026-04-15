import type { Request, Response } from "express";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, UnauthenticatedError } from "../errors/index.js";

export const register = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  const isFirstAccount = (await User.countDocuments()) === 0;

  let role: "user" | "admin" | "test-admin" = "user";

  if (isFirstAccount) {
    role = "admin";
  } else if (email === "test-admin@mail.com") {
    role = "test-admin";
  }

  const user = await User.create({ fullName, email, password, role });

  const userObject = user.toObject();
  const { password: _, ...info } = userObject;

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    data: info,
    token,
    message: "User created successfully",
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const userObject = user.toObject();
  const { password: _, ...info } = userObject;

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ data: info, token, message: "User logged in successfully" });
};

export const getCurrentUser = async (req: Request, res: Response) => {};
