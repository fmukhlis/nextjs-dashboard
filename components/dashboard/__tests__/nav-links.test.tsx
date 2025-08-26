import { render, screen } from "@testing-library/react";
import NavLinks from "../nav-links";

describe("NavLinks", () => {
  it("renders all nav links with correct text and href", () => {
    render(<NavLinks />);

    const homeLink = screen.getByRole("link", { name: /Home/i });
    expect(homeLink).toHaveAttribute("href", "/dashboard");

    const invoicesLink = screen.getByRole("link", { name: /Invoices/i });
    expect(invoicesLink).toHaveAttribute("href", "/dashboard/invoices");

    const customersLink = screen.getByRole("link", { name: /Customers/i });
    expect(customersLink).toHaveAttribute("href", "/dashboard/customers");
  });
});
