import { render, screen } from "@testing-library/react";
import SideNav from "../sidenav";

describe("SideNav", () => {
  it("renders AcmeLogo", () => {
    render(<SideNav />);
    const acmeLogo = screen.getByText(/Acme/i);
    expect(acmeLogo).toBeInTheDocument();
  });

  it("renders the NavLinks", () => {
    render(<SideNav />);
    const homeLink = screen.getByRole("link", { name: /Home/i });
    expect(homeLink).toHaveAttribute("href", "/dashboard");
  });

  it("renders sign out button", () => {
    render(<SideNav />);
    const signOutButton = screen.getByRole("button", { name: /Sign Out/i });
    expect(signOutButton).toBeInTheDocument();
  });
});
