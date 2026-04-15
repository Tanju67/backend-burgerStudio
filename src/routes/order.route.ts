import express from "express";
import {
  createOrder,
  getAllOrders,
  getAllUserOrders,
  getUserAddress,
  updateOrderAddress,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import {
  authorizePermission,
  checkAuth,
  restrictTestAdmin,
} from "../middleware/auth.js";
import validate from "../middleware/validateResource.js";
import {
  createOrderSchema,
  updateOrderStatusSchema,
  updateUserAddressSchema,
} from "../schemas/order.schema.js";
import { mongoIdSchema } from "../schemas/menu.schema.js";

const router = express.Router();

router.use(checkAuth);

router.get(
  "/",
  restrictTestAdmin,
  authorizePermission("admin", "test-admin"),
  getAllOrders,
);

router.get("/my-orders", getAllUserOrders);

router.get("/my-address", getUserAddress);

router.post("/", validate(createOrderSchema), createOrder);

router.patch("/address", validate(updateUserAddressSchema), updateOrderAddress);

router.patch(
  "/:id/status",
  restrictTestAdmin,
  authorizePermission("admin", "test-admin"),
  validate(mongoIdSchema),
  validate(updateOrderStatusSchema),
  updateOrderStatus,
);

export default router;
