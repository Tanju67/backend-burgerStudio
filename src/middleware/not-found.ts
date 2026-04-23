import type { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  // .send yerine .json kullanıyoruz!
  return res.status(404).json({
    status: "fail",
    message: `Route not found - ${req.originalUrl}`,
  });
};

export default notFound;
