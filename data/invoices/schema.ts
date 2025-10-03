import z from "zod";

export const FormSchema = z.object({
  id: z.string(),
  date: z.string(),
  amount: z.coerce
    .number<number>()
    .gt(0, { error: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    error: "Please select an invoice status",
  }),
  customerId: z.string({ error: "Please select a customer." }),
});
