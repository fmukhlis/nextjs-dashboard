// DB
export type InvoiceRaw = {
  id: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
  customer_id: string;
};

// Processed (to be used in App)
export type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
  customer_id: string;
};

// Processed (to be used as request's payload)
export type CreateInvoiceRecord = {
  date: string;
  status: "pending" | "paid";
  customerId: string;
  amountInCents: number;
};

// Processed (to be used as request's payload)
export type UpdateInvoiceRecord = {
  id: string;
  status: "pending" | "paid";
  customerId: string;
  amountInCents: number;
};
