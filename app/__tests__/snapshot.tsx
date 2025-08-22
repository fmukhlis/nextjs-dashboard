import { render } from "@testing-library/react";
import Home from "../page";

it("renders Homepage unchanged", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
