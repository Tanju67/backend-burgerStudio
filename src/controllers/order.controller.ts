import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BadRequest from "../errors/badRequest.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

export const updateOrderAddress = async (req: Request, res: Response) => {
  if (!req.userData) {
    throw new UnauthenticatedError("User not authenticated");
  }
  const userId = req.userData.userId;

  const { street, houseNumber, city, postalCode, phoneNumber } = req.body;

  const updatedData = {
    street,
    houseNumber,
    city,
    postalCode,
    phoneNumber,
  };

  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  }).select("-password");

  res.status(StatusCodes.OK).json({
    success: true,
    data: updatedUser,
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({})
    .populate(
      "customerId",
      "fullName street houseNumber city postalCode phoneNumber",
    )
    .populate("orderItems.product")
    .sort("-createdAt");
  res
    .status(StatusCodes.OK)
    .json({ data: orders, count: orders.length, success: true });
};

export const getAllUserOrders = async (req: Request, res: Response) => {
  if (!req.userData) {
    throw new UnauthenticatedError("User not authenticated");
  }
  const userId = req.userData.userId;
  const orders = await Order.find({ customerId: userId })
    .populate("customerId", "-password")
    .populate("orderItems.product")
    .sort("-createdAt");
  res
    .status(StatusCodes.OK)
    .json({ data: orders, count: orders.length, success: true });
};

export const getUserAddress = async (req: Request, res: Response) => {
  if (!req.userData) {
    throw new UnauthenticatedError("User not authenticated");
  }
  const userId = req.userData.userId;
  const user = await User.findById(userId).select(
    "street houseNumber city postalCode phoneNumber",
  );

  res.status(StatusCodes.OK).json({ data: user, success: true });
};

export const createOrder = async (req: Request, res: Response) => {
  if (!req.userData) {
    throw new UnauthenticatedError("User not authenticated");
  }
  const userId = req.userData.userId;
  const { orderItems } = req.body;
  if (!orderItems || orderItems.length === 0) {
    throw new BadRequest("Order items cannot be empty");
  }
  const order = await Order.create({ customerId: userId, orderItems });
  res.status(StatusCodes.CREATED).json({ data: order, success: true });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true },
  );
  res.status(StatusCodes.OK).json({ data: order, success: true });
};
