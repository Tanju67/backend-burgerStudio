import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import NotFoundError from "../errors/not-found.js";
import Product from "../models/Product.js";

export const getAllMenuProduct = async (req: Request, res: Response) => {
  const { menuId } = req.params as { menuId: string };
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

export const createProduct = async (req: Request, res: Response) => {};

export const updateProduct = async (req: Request, res: Response) => {};

export const deleteProduct = async (req: Request, res: Response) => {};
