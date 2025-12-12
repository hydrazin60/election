import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.string().lowercase().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().optional(),
});

export const registerRequestSchema = z.object({
  email: z.string().lowercase().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  full_name: z.string().min(2, "Full name must be at least 2 characters long"),
  phone: z.string().optional(),
  role: z.enum(["employ", "admin"]).default("employ"),
  location: z
    .object({
      province: z.string().optional(),
      district: z.string().optional(),
      municipality: z.string().optional(),
      wardNumber: z.string().optional(),
      pollingCenter: z.string().optional(),
    })
    .optional(),
});

export const signInSchema = z.object({
  identifier: z.string().min(3, "Enter email or phone number"),
  password: loginRequestSchema.shape.password,
});

export type SignInFormData = z.infer<typeof signInSchema>;
