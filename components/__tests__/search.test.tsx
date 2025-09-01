import { render, screen } from "@testing-library/react";
import Search from "../search";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => {
  const originalModule = jest.requireActual("next/navigation");
  return {
    __esModule: true,
    ...originalModule,
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
  };
});

describe("Search", () => {
  const mockedReplace = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ replace: mockedReplace });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (usePathname as jest.Mock).mockReturnValue("/pathname");
    mockedReplace.mockClear();
  });

  // UI
  it("renders search field with empty text when searchParam has no query", () => {
    render(<Search placeholder="Search..." />);
    expect(screen.getByPlaceholderText(/Search.../i)).toHaveValue("");
  });

  it("renders search field with query text from searchParam", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams({ query: "Hello world" }),
    );
    render(<Search placeholder="Search..." />);
    expect(screen.getByPlaceholderText(/Search/i)).toHaveValue("Hello world");
  });

  // Behavior
  it("update input value on typing", async () => {
    const user = userEvent.setup();
    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText(/Search.../i);
    await user.type(input, "Hello world");
    expect(input).toHaveValue("Hello world");
  });

  it('calls replace() with query when \"Enter\" is pressed', async () => {
    const user = userEvent.setup();
    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText(/Search.../i);
    await user.type(input, "Hello world");
    await user.keyboard("{Enter}");
    expect(mockedReplace).toHaveBeenCalledWith(
      "/pathname?page=1&query=Hello+world",
    );
  });

  it('calls replace() without query when \"Enter\" is pressed on empty input', async () => {
    const user = userEvent.setup();
    render(<Search placeholder="Search..." />);
    const input = screen.getByPlaceholderText(/Search.../i);
    input.focus();
    await user.keyboard("{Enter}");
    expect(mockedReplace).toHaveBeenCalledWith("/pathname?page=1");
  });
});
