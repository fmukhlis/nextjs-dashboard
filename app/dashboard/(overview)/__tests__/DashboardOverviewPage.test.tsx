import { render, screen } from "@testing-library/react";
import DashboardOverview from "../page";

jest.mock("@/components/dashboard/(async)/cards");
jest.mock("@/components/dashboard/(async)/revenue-chart");
jest.mock("@/components/dashboard/(async)/latest-invoices");

describe("DashboardOverview", () => {
  it('renders an h1 with text "Dashboard"', () => {
    render(<DashboardOverview />);
    const h1 = screen.getByRole("heading", { level: 1, name: /Dashboard/i });
    expect(h1).toBeInTheDocument();
  });

  // Snapshot
  it("renders DashboardOverview unchanged", () => {
    const { container } = render(<DashboardOverview />);
    expect(container).toMatchSnapshot();
  });
});
