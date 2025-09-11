export type InvoiceRaw = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: "pending" | "paid";
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: "pending" | "paid";
};

export type CreateInvoiceRecord = {
  customerId: string;
  amount: number;
  date: string;
  status: "pending" | "paid";
};
