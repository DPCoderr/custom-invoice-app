import z from "zod";

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .min(6)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/\d/)
    .regex(/[^a-zA-Z0-9]/),
});

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    email: z.email().trim(),
    password: z
      .string()
      .min(6)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/\d/)
      .regex(/[^a-zA-Z0-9]/),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
