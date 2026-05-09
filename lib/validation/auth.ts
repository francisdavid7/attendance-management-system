import z, { email } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is to short"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
