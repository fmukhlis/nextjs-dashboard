jest.mock("@/lib/db");

import { sql } from "@/lib/db";
import { getRevenue } from "../revenue";
import { getRevenueDTO } from "../revenue-dto";

describe("Get Revenue", () => {
  it("returns data correctly", async () => {
    const mockData = [{ month: "Januari", revenue: 10000 }] as Awaited<
      ReturnType<typeof getRevenue>
    >;
    (sql as unknown as jest.Mock).mockResolvedValue(mockData);

    // DAL
    const dal = await getRevenue();
    expect(dal).toEqual(mockData);

    // DTO
    const dto = await getRevenueDTO();
    expect(dto).toEqual(dal);
  });

  it("throws an error", async () => {
    (sql as unknown as jest.Mock).mockRejectedValue("");
    await expect(getRevenue()).rejects.toThrow("Failed to fetch revenue data.");
  });
});
