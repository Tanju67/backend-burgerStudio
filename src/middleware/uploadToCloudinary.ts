import type { Request, Response, NextFunction } from "express";
import { uploadImage } from "../services/cloudinaryServices.js";

const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return next();

    const result = await uploadImage(req.file.buffer);

    req.image = result;

    next();
  } catch (error) {
    next(error);
  }
};

export default uploadToCloudinary;