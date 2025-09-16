import z from "zod";

export const FormSchema = z.object({
  id: z.string(),
  date: z.string(),
  amount: z.coerce.number<number>(),
  status: z.enum(["pending", "paid"]),
  customerId: z.string(),
});
