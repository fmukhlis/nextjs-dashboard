import "server-only";

import { getRevenue } from "./revenue";

export async function getRevenueDTO() {
  {
    const revenue = await getRevenue();
    return revenue;
  }
}
