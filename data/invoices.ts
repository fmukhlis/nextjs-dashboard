import "server-only";

import { sql } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import { InvoicesTable, LatestInvoiceRaw } from "@/types/global";

export async function getLatestInvoices() {
  try {
    const data = (await sql`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`) as LatestInvoiceRaw[];

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch {
    throw new Error("Failed to fetch the latest invoices.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function getFilteredInvoices(query: string, currentPage: number) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const data = (await sql`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `) as InvoicesTable[];
    return data;
  } catch {
    throw new Error("Failed to fetch invoices.");
  }
}

export async function getInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch {
    throw new Error("Failed to fetch total number of invoices.");
  }
}
