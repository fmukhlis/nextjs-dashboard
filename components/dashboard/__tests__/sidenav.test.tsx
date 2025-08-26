import { render, screen } from "@testing-library/react";
import SideNav from "../sidenav";

describe("SideNav", () => {
  it("renders AcmeLogo", () => {
    render(<SideNav />);
    const acmeLogo = screen.getByText(/Acme/i);
    expect(acmeLogo).toBeInTheDocument();
  });

  it("renders NavLinks", () => {
    render(<SideNav />);
    const homeLink = screen.getByText(/Home/i);
    const invoicesLink = screen.getByText(/Invoices/i);
    const customersLink = screen.getByText(/Customers/i);
    expect(homeLink).toHaveAttribute("href", "/dashboard");
    expect(invoicesLink).toHaveAttribute("href", "/dashboard/invoices");
    expect(customersLink).toHaveAttribute("href", "/dashboard/customers");
  });

  it("renders sign out button", () => {
    render(<SideNav />);
    const signOutButton = screen.getByRole("button", { name: /Sign Out/i });
    expect(signOutButton).toBeInTheDocument();
  });
});
