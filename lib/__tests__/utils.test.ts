import { formatCurrency, generateYAxis } from "../utils";

describe("formatCurrency()", () => {
  it("returns formatted amount correctly", () => {
    expect(formatCurrency(1000)).toMatch(/^\$\d+.\d{2}$/);
  });
});

describe("generateYAxis()", () => {
  it("returns Y-Axis labels and top label correctly", () => {
    const mockRevenue = [
      {
        month: "January",
        revenue: 1780,
      },
    ];
    expect(generateYAxis(mockRevenue)).toEqual({
      yAxisLabels: ["$2K", "$1K", "$0K"],
      topLabel: 2000,
    });
  });
});
