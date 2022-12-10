import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../index";

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});

describe("Home", () => {
  it("renders a h1", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: "Hola mundo",
    });

    expect(heading).toBeDefined();
  });
});
