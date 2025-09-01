import { render, screen } from "@testing-library/react";
import InvoiceStatus from "../status";

describe("InvoiceStatus", () => {
  it("renders pending status", () => {
    render(<InvoiceStatus status="pending" />);
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });

  it("renders paid status", () => {
    render(<InvoiceStatus status="paid" />);
    expect(screen.getByText(/Paid/i)).toBeInTheDocument();
  });
});
