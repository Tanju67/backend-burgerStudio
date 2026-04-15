import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    price: z
      .string()
      .transform((val) => Number(val)) // Sayıya çevir
      .pipe(z.number().positive("Price must be a positive number")),
  }),
});

export const updateProductSchema = z.object({
  body: z
    .object({
      title: z.string().min(3).max(100).optional(),
      description: z.string().min(10).optional(),
      price: z
        .string()
        .transform((val) => Number(val))
        .pipe(z.number().positive())
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Please provide at least one field to update",
    }),
});
