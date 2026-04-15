import type { Request, Response } from "express";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, UnauthenticatedError } from "../errors/index.js";

export const register = async (req: Request, res: Response) => {};

export const login = async (req: Request, res: Response) => {};

export const getCurrentUser = async (req: Request, res: Response) => {};
