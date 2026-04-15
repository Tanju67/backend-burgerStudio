import express from "express";
import {
  getAllMenu,
  getSingleMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../controllers/menu.controller.js";
import { checkAuth, restrictTestAdmin } from "../middleware/auth.js";
import { authorizePermission } from "../middleware/auth.js";
import upload from "../middleware/uploadMiddleware.js";
import optimizeImage from "../middleware/optimizeImage.js";
import uploadToCloudinary from "../middleware/uploadToCloudinary.js";

const router = express.Router();

router.get("/", getAllMenu);

router.get("/:id", getSingleMenu);

router.use(checkAuth, authorizePermission("admin", "test-admin"));

router.post(
  "/",
  restrictTestAdmin,
  upload.single("image"),
  optimizeImage,
  uploadToCloudinary,
  createMenu,
);

router.patch(
  "/:id",
  restrictTestAdmin,
  upload.single("image"),
  optimizeImage,
  uploadToCloudinary,
  updateMenu,
);

router.delete("/:id", restrictTestAdmin, deleteMenu);

export default router;
