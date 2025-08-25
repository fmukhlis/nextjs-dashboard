import { render, screen } from "@testing-library/react";
import AcmeLogo from "../acme-logo";

describe("AcmeLogo", () => {
  it("renders logo text", () => {
    render(<AcmeLogo />);
    const logoText = screen.getByText("Acme");
    expect(logoText).toBeInTheDocument();
  });
});
