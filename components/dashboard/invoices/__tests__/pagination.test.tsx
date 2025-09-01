import { render, screen } from "@testing-library/react";
import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "../pagination";

jest.mock("next/navigation", () => {
  const originalModule = jest.requireActual("next/navigation");
  return {
    __esModule: true,
    ...originalModule,
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
  };
});

describe("Pagination", () => {
  const basePath = "/";

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(basePath);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("renders a link for pages and a divs for current page and ellipsis", () => {
    render(<Pagination totalPages={9} />);

    const page2Link = screen.getByRole("link", { name: "2" });
    expect(page2Link).toHaveAttribute("href", `${basePath}?page=2`);

    const page3Link = screen.getByRole("link", { name: "3" });
    expect(page3Link).toHaveAttribute("href", `${basePath}?page=3`);

    const ellipsis = screen.getByText("...");
    expect(ellipsis.tagName).toBe("DIV");

    const currentPage = screen.getByText("1");
    expect(currentPage.tagName).toBe("DIV");
  });

  it("handles edge case: totalPage = 1", () => {
    render(<Pagination totalPages={1} />);

    const currentPage = screen.getByText("1");
    expect(currentPage.tagName).toBe("DIV");

    const ellipsis = screen.queryByText("...");
    expect(ellipsis).not.toBeInTheDocument();
  });

  it("renders next/prev page link when next/prev page are available", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams({ page: "5" }),
    );

    render(<Pagination totalPages={9} />);

    const nextPageLink = screen.getByRole("link", { name: /Next/i });
    expect(nextPageLink).toHaveAttribute("href", `${basePath}?page=6`);

    const prevPageLink = screen.getByRole("link", { name: /Prev/i });
    expect(prevPageLink).toHaveAttribute("href", `${basePath}?page=4`);
  });

  it("renders next/prev page as a div when there is no next/prev page are available", () => {
    render(<Pagination totalPages={1} />);

    const nextPageDiv = screen.getByText("Next");
    expect(nextPageDiv.closest("div, a")?.tagName).toBe("DIV");

    const prevPageDiv = screen.getByText("Prev");
    expect(prevPageDiv.closest("div, a")?.tagName).toBe("DIV");
  });
});
