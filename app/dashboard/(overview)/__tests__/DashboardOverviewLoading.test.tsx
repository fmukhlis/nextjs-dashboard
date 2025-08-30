import { render } from "@testing-library/react";
import OverviewLoading from "../loading";

describe("DashboardOverviewLoading", () => {
  // Snapshot
  it("renders DashboardOverviewLoading unchanged", () => {
    const { container } = render(<OverviewLoading />);
    expect(container).toMatchSnapshot();
  });
});
