import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "../data";
import { __mock__ } from "@neondatabase/serverless";
import { formatCurrency } from "../utils";

jest.mock("@neondatabase/serverless", () => {
  const mockedNeon = jest.fn();
  return {
    __esModule: true,
    neon: () => mockedNeon,
    __mock__: { mockedNeon },
  };
});

describe("fetchRevenue()", () => {
  it("returns data", async () => {
    const mockData = [
      {
        month: "Januari",
        revenue: 10000,
      },
    ];
    __mock__.mockedNeon.mockResolvedValue(mockData);
    const result = await fetchRevenue();
    expect(result).toEqual(mockData);
  });

  it("throws an error", async () => {
    __mock__.mockedNeon.mockRejectedValue("");
    await expect(fetchRevenue()).rejects.toThrow(
      "Failed to fetch revenue data.",
    );
  });
});

describe("fetchLatestInvoices()", () => {
  it("returns data with amount formatted as a string", async () => {
    const mockData = [
      {
        id: "1",
        name: "John",
        image_url: "john.png",
        email: "john@example.com",
        amount: 1,
      },
    ];
    __mock__.mockedNeon.mockResolvedValue(mockData);
    const result = await fetchLatestInvoices();
    expect(result).toEqual([
      { ...mockData[0], amount: formatCurrency(mockData[0].amount) },
    ]);
  });

  it("throws an error", async () => {
    __mock__.mockedNeon.mockRejectedValue("");
    await expect(fetchLatestInvoices()).rejects.toThrow(
      "Failed to fetch the latest invoices.",
    );
  });
});

describe("fetchCardData()", () => {
  it("returns card data", async () => {
    const mockInvoiceCount = [{ count: 10 }];
    const mockCustomerCount = [{ count: 5 }];
    const mockInvoiceStatus = [{ paid: 10000, pending: 10000 }];

    __mock__.mockedNeon
      .mockResolvedValueOnce(mockInvoiceCount)
      .mockResolvedValueOnce(mockCustomerCount)
      .mockResolvedValueOnce(mockInvoiceStatus)
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([{}]);

    const result = await fetchCardData();
    const fallbackResult = await fetchCardData();

    expect(result).toEqual({
      numberOfCustomers: mockCustomerCount[0].count,
      numberOfInvoices: mockInvoiceCount[0].count,
      totalPaidInvoices: formatCurrency(mockInvoiceStatus[0].paid),
      totalPendingInvoices: formatCurrency(mockInvoiceStatus[0].pending),
    });

    expect(fallbackResult).toEqual({
      numberOfCustomers: 0,
      numberOfInvoices: 0,
      totalPaidInvoices: "$0.00",
      totalPendingInvoices: "$0.00",
    });
  });

  // it("returns");

  it("throws an error", async () => {
    __mock__.mockedNeon.mockRejectedValue("");
    await expect(fetchCardData()).rejects.toThrow("Failed to fetch card data.");
  });
});
