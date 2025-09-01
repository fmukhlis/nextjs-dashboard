import { render, screen } from "@testing-library/react";
import { CreateInvoice, DeleteInvoice, UpdateInvoice } from "../buttons";

describe("CreateInvoice", () => {
  it("renders link with Create Invoice text", () => {
    render(<CreateInvoice />);
    expect(
      screen.getByRole("link", { name: /Create Invoice/i }),
    ).toHaveAttribute("href", "/dashboard/invoices/create");
  });
});

describe("UpdateInvoice", () => {
  it("renders link with Update Invoice text", () => {
    render(<UpdateInvoice />);
    expect(
      screen.getByRole("link", { name: /Update Invoice/i }),
    ).toHaveAttribute("href", "/dashboard/invoices");
  });
});

describe("DeleteInvoice", () => {
  it("renders button with type submit", () => {
    render(<DeleteInvoice />);
    expect(
      screen.getByRole("button", { name: /Delete Invoice/i }),
    ).toHaveAttribute("type", "submit");
  });
});
