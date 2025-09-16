jest.mock("@neondatabase/serverless", () => {
  const mockedNeon = jest.fn();
  return {
    __esModule: true,
    neon: () => mockedNeon,
    __mock__: { mockedNeon },
  };
});

import { __mock__ } from "@neondatabase/serverless";
import { getRevenue } from "../revenue";
import { getRevenueDTO } from "../revenue-dto";

describe("Get Revenue", () => {
  it("returns data correctly", async () => {
    const mockData = [{ month: "Januari", revenue: 10000 }] as Awaited<
      ReturnType<typeof getRevenue>
    >;
    __mock__.mockedNeon.mockResolvedValue(mockData);

    // DAL
    const dal = await getRevenue();
    expect(dal).toEqual(mockData);

    // DTO
    const dto = await getRevenueDTO();
    expect(dto).toEqual(dal);
  });

  it("throws an error", async () => {
    __mock__.mockedNeon.mockRejectedValue("");
    await expect(getRevenue()).rejects.toThrow("Failed to fetch revenue data.");
  });
});
