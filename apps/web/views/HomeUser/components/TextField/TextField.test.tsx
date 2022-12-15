import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TextField from "./TextField";

test("Text Field user input is working", async () => {
  render(<TextField placeholder="Create a new todo" />);

  await userEvent.click(screen.getByPlaceholderText("Create a new todo"));
  await userEvent.keyboard("Test the input");
  screen.getByDisplayValue("Test the input");
});
