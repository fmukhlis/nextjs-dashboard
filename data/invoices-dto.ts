import {
  getFilteredInvoices,
  getInvoiceById,
  getInvoicesPages,
  getLatestInvoices,
} from "./invoices";

export async function getLatestInvoicesDTO() {
  const latestInvoices = await getLatestInvoices();
  return latestInvoices;
}

export async function getFilteredInvoicesDTO(
  query: string,
  currentPage: number,
) {
  const filteredInvoices = await getFilteredInvoices(query, currentPage);
  return filteredInvoices;
}

export async function getInvoicesPagesDTO(query: string) {
  const invoicesPages = await getInvoicesPages(query);
  return invoicesPages;
}

export async function getInvoiceByIdDTO(id: string) {
  const invoice = await getInvoiceById(id);
  return invoice;
}

export const mockedFilteredInvoices = {
  johnDoe: {
    amount: 500,
    customer_id: "1",
    date: "2025-09-011",
    email: "john@example.com",
    id: "1",
    image_url: "customers/michael-novotny.png",
    name: "John Doe",
    status: "paid",
  } as Awaited<ReturnType<typeof getFilteredInvoicesDTO>>[number],
  alice: {
    amount: 710,
    customer_id: "2",
    date: "2025-08-07",
    email: "alice@example.com",
    id: "2",
    image_url: "customers/evil-rabbit.png",
    name: "Alice",
    status: "pending",
  } as Awaited<ReturnType<typeof getFilteredInvoicesDTO>>[number],
};
