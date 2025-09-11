import { getCustomers } from "./customers";

export async function getCustomersDTO() {
  const customers = await getCustomers();
  return customers;
}
