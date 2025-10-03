import { sql } from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createInvoice, deleteInvoice, updateInvoice } from "../actions";

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
  const mockFormData = new FormData();

  mockFormData.set("amount", "100");
  mockFormData.set("status", "pending");
  mockFormData.set("customerId", "1");

  it("creates invoice successfully and navigates back to the invoices page", async () => {
    await createInvoice({}, mockFormData);

    expect(sql).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
    expect(redirect).toHaveBeenCalledWith("/dashboard/invoices");
  });

  it("returns validation errors if the value doesn't match the schema", async () => {
    const { errors } = await createInvoice({}, new FormData());

    expect(errors).toHaveProperty("status");
    expect(errors).toHaveProperty("amount");
    expect(errors).toHaveProperty("customerId");
  });

  it("handles error gracefully", async () => {
    jest.isolateModules(async () => {
      jest.mock("@/data/invoices/create-invoice", () => {
        const originalModule = jest.requireActual(
          "@/data/invoices/create-invoice",
        );
        return {
          __esModule: true,
          ...originalModule,
          createInvoiceDAL: jest.fn().mockRejectedValue(""),
        };
      });

      const { createInvoice } = require("../actions");

      await createInvoice({}, mockFormData);

      expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
      expect(redirect).toHaveBeenCalledWith("/dashboard/invoices");
    });
  });
});

describe("updateInvoice(invoiceId, formData)", () => {
  const mockFormData = new FormData();

  mockFormData.set("amount", "100");
  mockFormData.set("status", "pending");
  mockFormData.set("customerId", "1");

  it("update invoice successfully and navigates back to the invoices page", async () => {
    await updateInvoice("1", {}, mockFormData);

    expect(sql).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
    expect(redirect).toHaveBeenCalledWith("/dashboard/invoices");
  });

  it("returns validation errors if the value doesn't match the schema", async () => {
    const { errors } = await updateInvoice("1", {}, new FormData());

    expect(errors).toHaveProperty("status");
    expect(errors).toHaveProperty("amount");
    expect(errors).toHaveProperty("customerId");
  });

  it("handles error gracefully", async () => {
    jest.isolateModules(async () => {
      jest.mock("@/data/invoices/update-invoice", () => {
        const originalModule = jest.requireActual(
          "@/data/invoices/update-invoice",
        );
        return {
          __esModule: true,
          ...originalModule,
          updateInvoiceDAL: jest.fn().mockRejectedValue(""),
        };
      });

      const { updateInvoice } = require("../actions");

      await updateInvoice("1", {}, mockFormData);

      expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
      expect(redirect).toHaveBeenCalledWith("/dashboard/invoices");
    });
  });
});

describe("deleteInvoice(invoiceId)", () => {
  it("delete invoice successfully and rerender the invoices page", async () => {
    await deleteInvoice("1");

    expect(sql).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
  });

  it("handles error gracefully", async () => {
    jest.isolateModules(async () => {
      jest.mock("@/data/invoices/delete-invoice", () => {
        const originalModule = jest.requireActual(
          "@/data/invoices/delete-invoice",
        );
        return {
          __esModule: true,
          ...originalModule,
          deleteInvoiceDAL: jest.fn().mockRejectedValue(""),
        };
      });

      const { deleteInvoice } = require("../actions");

      await deleteInvoice("1");

      expect(revalidatePath).toHaveBeenCalledWith("/dashboard/invoices");
    });
  });
});
