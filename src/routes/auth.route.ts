import express from "express";
import {
  getCurrentUser,
  login,
  register,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/auth.js";
import validate from "../middleware/validateResource.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.get("/current", checkAuth, getCurrentUser);

export default router;
