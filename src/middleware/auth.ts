import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

import { UnauthenticatedError, UnauthorizedError } from "../errors/index.js";

// Role constants to avoid typos
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  TEST_ADMIN: "test-admin",
} as const;

interface JwtPayload {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

export const checkAuth = async (
  req: Request & { userData?: JwtPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication invalid: No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token || !process.env.JWT_SECRET) {
      return res.status(401).json({
        message: "Authentication invalid: Token expired or invalid",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    if (decoded && decoded.userId && decoded.role) {
      req.userData = {
        userId: decoded.userId,
        fullName: decoded.fullName,
        email: decoded.email,
        role: decoded.role,
      };
      return next(); // Başarılıysa devam et
    } else {
      return res.status(401).json({
        message: "Authentication invalid: Token expired or tampered",
      });
    }
  } catch (error) {
    // JWT Verify hatası (expired, invalid vb.) buraya düşer
    return res.status(401).json({
      message: "Authentication invalid: Token expired or invalid",
    });
  }
};

/**
 * Checks if the user's role is included in the allowed roles.
 */
export const authorizePermission = (...roles: string[]) => {
  return (
    req: Request & { userData?: JwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.userData || !roles.includes(req.userData.role)) {
      throw new UnauthorizedError(
        "Unauthorized: You do not have permission to access this route",
      );
    }
    next();
  };
};

/**
 * Restricts 'test-admin' from performing mutations (POST, PUT, PATCH, DELETE).
 * They are only allowed to perform GET requests.
 */
export const restrictTestAdmin = (
  req: Request & { userData?: JwtPayload },
  res: Response,
  next: NextFunction,
) => {
  if (req.userData?.role === ROLES.TEST_ADMIN && req.method !== "GET") {
    throw new UnauthorizedError(
      "Read-Only Mode: Test admin accounts are not allowed to modify data",
    );
  }
  next();
};
