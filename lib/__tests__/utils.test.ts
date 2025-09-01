import {
  formatCurrency,
  formatDateToLocal,
  generatePagination,
  generateYAxis,
} from "../utils";

describe("formatCurrency()", () => {
  it("returns formatted amount correctly", () => {
    expect(formatCurrency(1000)).toMatch(/^\$\d+.\d{2}$/);
  });
});

describe("formatDateToLocal()", () => {
  it("returns formatted local date", () => {
    expect(formatDateToLocal("2023-09-10T00:00:00.000Z")).toMatch(
      /Sep 10, 2023/i,
    );
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

describe("generatePagination()", () => {
  it("returns all page numbers when totalPages is 7 or less", () => {
    const totalPages = 5;
    const currentPage = 1;
    expect(generatePagination(currentPage, totalPages)).toEqual(
      Array.from({ length: totalPages }).map((_, i) => i + 1),
    );
  });

  it("returns start pagination with ellipsis when currentPage <= 3 and totalPages > 7", () => {
    const totalPages = 9;
    const currentPage = 1;
    expect(generatePagination(currentPage, totalPages)).toEqual([
      1,
      2,
      3,
      4,
      "...",
      totalPages - 1,
      totalPages,
    ]);
  });
  it("returns end pagination with ellipsis when currentPage >= totalPages - 2 and totalPages > 7", () => {
    const totalPages = 9;
    const currentPage = totalPages - 1;
    expect(generatePagination(currentPage, totalPages)).toEqual([
      1,
      2,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]);
  });
  it("returns middle pagination with ellipsis on both sides", () => {
    const totalPages = 9;
    const currentPage = 5;
    expect(generatePagination(currentPage, totalPages)).toEqual([
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ]);
  });
});
