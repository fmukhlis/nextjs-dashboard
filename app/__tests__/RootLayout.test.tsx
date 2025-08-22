import RootLayout from "../layout";
import { renderToString } from "react-dom/server";

describe("RootLayout", () => {
  it("renders children properly", () => {
    const html = renderToString(
      <RootLayout>
        <div>Children</div>
      </RootLayout>,
    );
    expect(html).toContain("Children");
  });
});
