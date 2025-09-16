import { sql } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";
import {
  getInvoicesPages,
  getLatestInvoices,
  getFilteredInvoices,
  getInvoiceById,
} from "../invoices";
import {
  getInvoicesPagesDTO,
  getLatestInvoicesDTO,
  getFilteredInvoicesDTO,
  getInvoiceByIdDTO,
} from "../invoices-dto";

jest.mock("@/lib/db", () => {
  return {
    __esModule: true,
    sql: jest.fn(),
  };
});

describe("Get Latest Invoices", () => {
  it("returns data correctly", async () => {
    const mockData = [
      {
        id: "1",
        name: "John",
        image_url: "john.png",
        email: "john@example.com",
        amount: 1,
      },
    ];
    (sql as unknown as jest.Mock).mockResolvedValue(mockData);

    // DAL
    const expectedDal = [
      { ...mockData[0], amount: formatCurrency(mockData[0].amount) },
    ];
    const dal = await getLatestInvoices();
    expect(dal).toEqual(expectedDal);

    // DTO
    const expectedDto = expectedDal;
    const dto = await getLatestInvoicesDTO();
    expect(dto).toEqual(expectedDto);
  });

  it("throws an error", async () => {
    (sql as unknown as jest.Mock).mockRejectedValue("");
    await expect(getLatestInvoices()).rejects.toThrow(
      "Failed to fetch the latest invoices.",
    );
  });
});

describe("Get Filtered Invoices", () => {
  it("returns data correctly", async () => {
    const mockData = [
      {
        id: "1",
        customer_id: "1",
        name: "John",
        email: "john@example.com",
        image_url: "john.png",
        date: "2023-09-10T00:00:00.000Z",
        amount: 10000,
        status: "paid",
      },
    ];
    (sql as unknown as jest.Mock).mockResolvedValue(mockData);

    // DAL
    const expectedDal = mockData;
    const dal = await getFilteredInvoices("", 1);
    expect(dal).toEqual(expectedDal);

    // DTO
    const expectedDto = expectedDal;
    const dto = await getFilteredInvoicesDTO("", 1);
    expect(dto).toEqual(expectedDto);
  });

  it("throws an error", async () => {
    (sql as unknown as jest.Mock).mockRejectedValue("");
    await expect(getFilteredInvoices("", 1)).rejects.toThrow(
      "Failed to fetch invoices.",
    );
  });
});

describe("Get Invoices Pages", () => {
  it("returns data correctly", async () => {
    const mockData = [{ count: 1 }];
    (sql as unknown as jest.Mock).mockResolvedValue(mockData);

    // DAL
    const expectedDal = mockData[0].count;
    const dal = await getInvoicesPages("");
    expect(dal).toEqual(expectedDal);

    // DTO
    const expectedDto = expectedDal;
    const dto = await getInvoicesPagesDTO("");
    expect(dto).toEqual(expectedDto);
  });

  it("throws an error", async () => {
    (sql as unknown as jest.Mock).mockRejectedValue("");
    await expect(getInvoicesPages("")).rejects.toThrow(
      "Failed to fetch total number of invoices.",
    );
  });
});

describe("Get Invoice By Its Id", () => {
  it("returns data correctly", async () => {
    const mockData = [
      {
        id: "1",
        amount: 100,
        status: "pending",
        customer_id: "1",
      },
    ];

    (sql as unknown as jest.Mock).mockResolvedValue(mockData);

    // DAL
    const expectedDal = { ...mockData[0], amount: mockData[0].amount / 100 };
    const dal = await getInvoiceById(mockData[0].id);
    expect(dal).toEqual(expectedDal);

    // DTO
    const expectedDto = expectedDal;
    const dto = await getInvoiceByIdDTO(mockData[0].id);
    expect(dto).toEqual(expectedDto);
  });

  it("throws an error", async () => {
    (sql as unknown as jest.Mock).mockRejectedValue("");
    await expect(getInvoiceById("1")).rejects.toThrow(
      "Failed to fetch invoice.",
    );
  });
});
