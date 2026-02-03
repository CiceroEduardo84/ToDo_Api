import z from "zod";

export const userSchema = z.object({
  name: z.string().trim().min(3),
  email: z
    .string()
    .regex(
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
      "Invalid email address",
    ),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "The password must contain uppercase letters, lowercase letters, numbers and special characters.",
    ),
});

export type UserDataType = z.infer<typeof userSchema>;
