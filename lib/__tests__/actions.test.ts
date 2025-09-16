import { revalidatePath } from "next/cache";
import { createInvoice, updateInvoice } from "../actions";
import { sql } from "../db";
import { redirect } from "next/navigation";

jest.mock("@/lib/db", () => {
  return {
    __esModule: true,
    sql: jest.fn(),
  };
});

jest.mock("next/cache", () => {
  return {
    __esModule: true,
    revalidatePath: jest.fn(),
  };
});

jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    redirect: jest.fn(),
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createInvoice(formData)", () => {
  it("create invoice successfully and navigates back to the invoices page", async () => {
    const mockFormData = new FormData();

    mockFormData.set("amount", "100");
    mockFormData.set("status", "pending");
    mockFormData.set("customerId", "1");

    await createInvoice(mockFormData);

    expect(sql).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
    expect(redirect).toHaveBeenCalledWith("/dashboard/invoices");
  });
});

describe("updateInvoice(id, formData)", () => {
  it("update invoice successfully and navigates back to the invoices page", async () => {
    const mockFormData = new FormData();

    mockFormData.set("amount", "100");
    mockFormData.set("status", "pending");
    mockFormData.set("customerId", "1");

    await updateInvoice("1", mockFormData);

    expect(sql).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
    expect(redirect).toHaveBeenCalledWith("/dashboard/invoices");
  });
});
