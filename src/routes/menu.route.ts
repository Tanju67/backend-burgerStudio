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
import validate from "../middleware/validateResource.js";
import {
  createMenuSchema,
  mongoIdSchema,
  updateMenuSchema,
} from "../schemas/menu.schema.js";

const router = express.Router();

router.get("/", getAllMenu);

router.get("/:id", getSingleMenu);

router.use(checkAuth, authorizePermission("admin", "test-admin"));

router.post(
  "/",
  restrictTestAdmin,
  upload.single("image"),
  validate(createMenuSchema),
  optimizeImage,
  uploadToCloudinary,
  createMenu,
);

router.patch(
  "/:id",
  restrictTestAdmin,
  validate(mongoIdSchema),
  upload.single("image"),
  validate(updateMenuSchema),
  optimizeImage,
  uploadToCloudinary,
  updateMenu,
);

router.delete("/:id", restrictTestAdmin, validate(mongoIdSchema), deleteMenu);

export default router;
