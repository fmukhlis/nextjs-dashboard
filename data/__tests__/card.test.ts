import { __mock__ } from "@neondatabase/serverless";
import { getCardData } from "../card";
import { formatCurrency } from "@/lib/utils";
import { getCardDataDTO } from "@/data/card-dto";

jest.mock("@neondatabase/serverless", () => {
  const mockedNeon = jest.fn();
  return {
    __esModule: true,
    neon: () => mockedNeon,
    __mock__: { mockedNeon },
  };
});

describe("Get Card Data", () => {
  it("returns data correctly", async () => {
    const mockInvoiceCount = [{ count: 10 }];
    const mockCustomerCount = [{ count: 5 }];
    const mockInvoiceStatus = [{ paid: 10000, pending: 10000 }];

    __mock__.mockedNeon
      .mockResolvedValueOnce(mockInvoiceCount)
      .mockResolvedValueOnce(mockCustomerCount)
      .mockResolvedValueOnce(mockInvoiceStatus)
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce(mockInvoiceCount)
      .mockResolvedValueOnce(mockCustomerCount)
      .mockResolvedValueOnce(mockInvoiceStatus)
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([{}]);

    // DAL
    const expectedDal = {
      numberOfCustomers: mockCustomerCount[0].count,
      numberOfInvoices: mockInvoiceCount[0].count,
      totalPaidInvoices: formatCurrency(mockInvoiceStatus[0].paid),
      totalPendingInvoices: formatCurrency(mockInvoiceStatus[0].pending),
    };
    const expectedFallbackDal = {
      numberOfCustomers: 0,
      numberOfInvoices: 0,
      totalPaidInvoices: "$0.00",
      totalPendingInvoices: "$0.00",
    };

    const dal = await getCardData();
    const fallbackDal = await getCardData();

    expect(dal).toEqual(expectedDal);
    expect(fallbackDal).toEqual(expectedFallbackDal);

    // DTO
    const expectedDto = expectedDal;
    const expectedFallbackDto = expectedFallbackDal;

    const dto = await getCardDataDTO();
    const fallbackDto = await getCardDataDTO();

    expect(dto).toEqual(expectedDto);
    expect(fallbackDto).toEqual(expectedFallbackDto);
  });

  it("throws an error", async () => {
    __mock__.mockedNeon.mockRejectedValue("");
    await expect(getCardDataDTO()).rejects.toThrow(
      "Failed to fetch card data.",
    );
  });
});
