import { z } from "zod";

export const mongoIdSchema = z.object({
  params: z.object({
    id: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: "Invalid MongoDB ObjectId",
    }),
  }),
});

export const createMenuSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title is required and must be at least 3 characters")
      .max(100, "Title must be less than 100 characters"),
  }),
});

export const updateMenuSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters")
      .optional(),
  }),
});
