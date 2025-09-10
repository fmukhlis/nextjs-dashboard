import "server-only";

import { sql } from "@/lib/db";
import { Revenue } from "@/types/global";

export async function getRevenue() {
  try {
    const data = (await sql`SELECT * FROM revenue`) as Revenue[];
    return data;
  } catch {
    throw new Error("Failed to fetch revenue data.");
  }
}
