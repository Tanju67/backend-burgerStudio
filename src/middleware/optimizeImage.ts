import type { Request, Response, NextFunction } from "express";
import sharp from "sharp";

const optimizeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) return next();

    const optimizedBuffer = await sharp(req.file.buffer)
      .resize(800) // max width
      .jpeg({ quality: 70 }) // compression
      .toBuffer();

    req.file.buffer = optimizedBuffer;

    next();
  } catch (error) {
    next(error);
  }
};

export default optimizeImage;