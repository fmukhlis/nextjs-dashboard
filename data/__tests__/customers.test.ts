jest.mock("@/lib/db");

import { __mock__ } from "@neondatabase/serverless";
import { getCustomers } from "../customers";
import { getCustomersDTO } from "../customers-dto";
import { sql } from "@/lib/db";

describe("Get Customers", () => {
  it("returns data correctly", async () => {
    const mockData = [
      {
        id: "1",
        name: "John Doe",
      },
      {
        id: "2",
        name: "Alice",
      },
    ];
    (sql as unknown as jest.Mock).mockResolvedValue(mockData);

    // DAL
    const expectedDal = mockData;
    const dal = await getCustomers();
    expect(dal).toEqual(expectedDal);

    // DTO
    const expectedDto = expectedDal;
    const dto = await getCustomersDTO();
    expect(dto).toEqual(expectedDto);
  });

  it("throws an error", async () => {
    (sql as unknown as jest.Mock).mockRejectedValue("");
    await expect(getCustomers()).rejects.toThrow(
      "Failed to fetch all customers.",
    );
  });
});
