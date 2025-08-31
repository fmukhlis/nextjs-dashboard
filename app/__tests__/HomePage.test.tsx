import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("HomePage", () => {
  it("renders a login button", () => {
    render(<Home />);
    const loginButton = screen.getByRole("link", { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  });

  // Snapshot
  it("renders HomePage unchanged", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
