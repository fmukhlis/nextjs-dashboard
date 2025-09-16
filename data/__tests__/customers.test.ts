jest.mock("@neondatabase/serverless", () => {
  const mockedNeon = jest.fn();
  return {
    __esModule: true,
    neon: () => mockedNeon,
    __mock__: { mockedNeon },
  };
});

import { __mock__ } from "@neondatabase/serverless";
import { getCustomers } from "../customers";
import { getCustomersDTO } from "../customers-dto";

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
    __mock__.mockedNeon.mockResolvedValue(mockData);

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
    __mock__.mockedNeon.mockRejectedValue("");
    await expect(getCustomers()).rejects.toThrow(
      "Failed to fetch all customers.",
    );
  });
});
