import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Homepage", () => {
  it("renders a logo image", () => {
    render(<Home />);
    const logoImage = screen.getByRole("img", { name: /next.js logo/i });
    expect(logoImage).toBeInTheDocument();
  });
});
