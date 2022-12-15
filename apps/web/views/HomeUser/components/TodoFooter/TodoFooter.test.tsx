import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { INITIAL_STATE } from "../../context/constants";
import TodoFooter from "./TodoFooter";

jest.mock("../../hooks/useAppContext", () => {
  return {
    useAppContext: () => ({ ...INITIAL_STATE, remaining: 5 }),
  };
});

describe("TodoFooter test suite", () => {
  it("Shows the right number of remaining elements", () => {
    render(<TodoFooter />);
    screen.getByText("5 remaining");
  });

  it("Shows all active and completed filters", () => {
    render(<TodoFooter />);
    userEvent.click(screen.getByText("All"));
    userEvent.click(screen.getByText("Active"));
    userEvent.click(screen.getByText("Completed"));
  });

  it("Shows clear completed action", () => {
    render(<TodoFooter />);
    userEvent.click(screen.getByText("Clear completed"));
  });
});
