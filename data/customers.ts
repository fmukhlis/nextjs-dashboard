import { sql } from "@/lib/db";
import { CustomerField } from "@/types/global";

export async function getCustomers() {
  try {
    const customers = (await sql`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `) as CustomerField[];

    return customers;
  } catch {
    throw new Error("Failed to fetch all customers.");
  }
}
