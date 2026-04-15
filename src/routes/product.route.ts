import express from "express";

import { checkAuth, restrictTestAdmin } from "../middleware/auth.js";
import { authorizePermission } from "../middleware/auth.js";
import upload from "../middleware/uploadMiddleware.js";
import optimizeImage from "../middleware/optimizeImage.js";
import uploadToCloudinary from "../middleware/uploadToCloudinary.js";
import {
  createProduct,
  deleteProduct,
  getAllMenuProduct,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import validate from "../middleware/validateResource.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";
import { mongoIdSchema } from "../schemas/menu.schema.js";

const router = express.Router();

router.get("/menu/:menuId", getAllMenuProduct);

router.get("/:id", getSingleProduct);

router.use(checkAuth, authorizePermission("admin", "test-admin"));

router.post(
  "/:menuId",
  restrictTestAdmin,
  validate(mongoIdSchema),
  upload.single("image"),
  validate(createProductSchema),
  optimizeImage,
  uploadToCloudinary,
  createProduct,
);

router.patch(
  "/:id",
  restrictTestAdmin,
  validate(mongoIdSchema),
  upload.single("image"),
  validate(updateProductSchema),
  optimizeImage,
  uploadToCloudinary,
  updateProduct,
);

router.delete(
  "/:id",
  restrictTestAdmin,
  validate(mongoIdSchema),
  deleteProduct,
);

export default router;
