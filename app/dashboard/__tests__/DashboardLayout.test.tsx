import { render, screen } from "@testing-library/react";
import DashboarLayout from "../layout";

const DummyChild = () => <div>Dummy Child</div>;

describe("DashboardLayout", () => {
  it("renders the SideNav", () => {
    render(
      <DashboarLayout>
        <DummyChild />
      </DashboarLayout>,
    );
    const acmeLogo = screen.getByText(/Acme/i);
    expect(acmeLogo).toBeInTheDocument();
  });

  it("renders children properly", () => {
    render(
      <DashboarLayout>
        <DummyChild />
      </DashboarLayout>,
    );
    const dummyChild = screen.getByText(/Dummy Child/i);
    expect(dummyChild).toBeInTheDocument();
  });

  // Snapshot
  it("renders DashboardLayout unchanged", () => {
    const { container } = render(
      <DashboarLayout>
        <DummyChild />
      </DashboarLayout>,
    );
    expect(container).toMatchSnapshot();
  });
});
