import { z } from "zod";

const objectIdSelection = z
  .string()
  .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
    message: "Invalid ID format",
  });

export const createOrderSchema = z.object({
  body: z.object({
    orderItems: z
      .array(
        z.object({
          product: objectIdSelection,
          amount: z
            .number("Amount is required")
            .positive("Amount must be greater than 0"),
          price: z
            .number("Price is required")
            .positive("Price must be greater than 0"),
        }),
      )
      .nonempty("Order items cannot be empty"),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z
      .string()
      .refine(
        (val) =>
          ["preparing", "out_for_delivery", "delivered", "cancelled"].includes(
            val,
          ),
        { message: "Invalid status value" },
      ),
  }),
});

export const updateUserAddressSchema = z.object({
  body: z.object({
    street: z.string().min(2, "Street is too short"),
    houseNumber: z.string().min(1, "House number is required"),
    postalCode: z.string().min(3, "Invalid postal code"),
    city: z.string().min(1, "City is is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
  }),
});
