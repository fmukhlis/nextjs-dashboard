import { getCustomers } from "./customers";

export async function getCustomersDTO() {
  const customers = await getCustomers();
  return customers;
}

export const mockedCustomers = {
  johnDoe: {
    id: "1",
    name: "John Doe",
  } as Awaited<ReturnType<typeof getCustomersDTO>>[number],
  alice: {
    id: "2",
    name: "Alice",
  } as Awaited<ReturnType<typeof getCustomersDTO>>[number],
};
