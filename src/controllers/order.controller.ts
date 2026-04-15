import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BadRequest from "../errors/badRequest.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import UnauthenticatedError from "../errors/unauthenticated.js";

export const updateOrderAddress = async (req: Request, res: Response) => {};

export const getAllOrders = async (req: Request, res: Response) => {};

export const getAllUserOrders = async (req: Request, res: Response) => {};

export const getUserAddress = async (req: Request, res: Response) => {};

export const createOrder = async (req: Request, res: Response) => {};

export const updateOrderStatus = async (req: Request, res: Response) => {};
