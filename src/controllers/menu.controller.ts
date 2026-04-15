import type { Request, Response } from "express";
import Menu from "../models/Menu.js";
import { StatusCodes } from "http-status-codes";

export const getAllMenu = async (req: Request, res: Response) => {
  const menu = await Menu.find({});
  res.status(StatusCodes.OK).json({ data: menu });
};

export const getSingleMenu = async (req: Request, res: Response) => {};

export const createMenu = async (req: Request, res: Response) => {};

export const updateMenu = async (req: Request, res: Response) => {};

export const deleteMenu = async (req: Request, res: Response) => {};
