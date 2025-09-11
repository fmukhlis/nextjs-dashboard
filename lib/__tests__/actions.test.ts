import { revalidatePath } from "next/cache";
import { createInvoice } from "../actions";
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

describe("createInvoice(formData)", () => {
  it("validate the input, perform a db query, call revalidatePath and redirect correctly", async () => {
    const mockFormData = new FormData();

    mockFormData.set("amount", "100");
    mockFormData.set("customerId", "1");
    mockFormData.set("status", "pending");

    await createInvoice(mockFormData);

    expect(sql).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
    expect(redirect).toHaveBeenCalledWith("/dashboard/invoices");
  });
});
