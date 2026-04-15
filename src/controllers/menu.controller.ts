import type { Request, Response } from "express";
import Menu from "../models/Menu.js";
import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import BadRequest from "../errors/badRequest.js";

export const getAllMenu = async (req: Request, res: Response) => {
  const menu = await Menu.find({});
  res.status(StatusCodes.OK).json({ data: menu });
};

export const getSingleMenu = async (req: Request, res: Response) => {
  const menuId = req.params.id;
  const menu = await Menu.findById(menuId);

  if (!menu) {
    throw new NotFoundError("Not found");
  }
  res.status(StatusCodes.OK).json({ data: menu });
};

export const createMenu = async (req: Request, res: Response) => {
  const { title } = req.body;
  const imageUrl = req.image?.secure_url;

  if (!imageUrl) {
    throw new BadRequest("Please provide an image");
  }
  const menu = await Menu.create({ title, image: imageUrl });
  res.status(StatusCodes.CREATED).json({ data: menu });
};

export const updateMenu = async (req: Request, res: Response) => {
  const menuId = req.params.id;
  const { title } = req.body;
  const imageUrl = req.image?.secure_url;

  const updateData: { title?: string; image?: string } = {};
  if (title) updateData.title = title;
  if (imageUrl) updateData.image = imageUrl;

  if (Object.keys(updateData).length === 0) {
    throw new BadRequest("Please provide title or image to update");
  }

  const menu = await Menu.findByIdAndUpdate(menuId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!menu) {
    throw new NotFoundError(`No menu found with id: ${menuId}`);
  }

  res.status(StatusCodes.OK).json({ data: menu });
};

export const deleteMenu = async (req: Request, res: Response) => {};
