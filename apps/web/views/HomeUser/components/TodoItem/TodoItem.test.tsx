import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { INITIAL_STATE } from "../../context/constants";
import TodoItem from "./TodoItem";

jest.mock("../../hooks/useAppContext", () => {
  return {
    useAppContext: () => ({ ...INITIAL_STATE }),
  };
});

const todoMock = {
  id: "1",
  deletedAt: null,
  done: false,
  task: "My first task",
};

describe("TodoItem test suite", () => {
  it("Render the todo item and show the done checkbox", () => {
    render(<TodoItem todo={todoMock} />);

    screen.getByText("My first task");

    const checkbox = screen.getByTestId<HTMLInputElement>(
      "checkbox-task-completed"
    );
    expect(checkbox.checked).toBeFalsy();
    userEvent.click(screen.getByTestId("checkbox-task-completed"));
  });
});
