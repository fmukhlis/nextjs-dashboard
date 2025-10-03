import z from "zod";

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
