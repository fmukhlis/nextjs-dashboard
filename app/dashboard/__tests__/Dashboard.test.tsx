import { render, screen } from "@testing-library/react";
import Dashboard from "../page";

describe("DashboardPage", () => {
  it('renders "Dashboard Page" text', () => {
    render(<Dashboard />);
    const dashboardPageText = screen.getByText(/Dashboard Page/i);
    expect(dashboardPageText).toBeInTheDocument();
  });

  // Snapshot
  it("renders DashboardPage unchanged", () => {
    const { container } = render(<Dashboard />);
    expect(container).toMatchSnapshot();
  });
});
