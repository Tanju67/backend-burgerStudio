import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import Product from "../models/Product.js";

export const getAllMenuProduct = async (req: Request, res: Response) => {
  const { id: menuId } = req.params as { id: string };
  const products = await Product.find({ menu: menuId }).populate("menu").lean();
  res.status(StatusCodes.OK).json({
    success: true,
    count: products.length,
    data: products,
  });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const product = await Product.findById(id).populate("menu").lean();

  if (!product) {
    throw new NotFoundError(` No product found with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: product,
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, description, price } = req.body;
  const { id: menuId } = req.params as { id: string };
  const image = req.image?.secure_url;
  const product = await Product.create({
    title,
    description,
    price,
    image,
    menu: menuId,
  });
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const updateData = { ...req.body };

  if (req.image) {
    updateData.image = req.image.secure_url;
  }
  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`No product found with id: ${id}`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: product,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    throw new NotFoundError(`No product found with id: ${id}`);
  }
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Product deleted successfully",
  });
};
