import { z } from "zod";

export const shortcodeZodSchema = z.object({
  url: z.string().url("Invalid URL"),
  shortcode: z
    .string()
    .min(4, "Shortcode must be at least 4 characters")
    .max(20, "Shortcode can't be more than 20 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Shortcode contains invalid characters")
    .optional(), // <- make shortcode optional
});

