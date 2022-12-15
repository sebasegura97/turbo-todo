import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { INITIAL_STATE } from "../../context/constants";
import TodoInput from "./TodoInput";

jest.mock("../../hooks/useAppContext", () => {
  return {
    useAppContext: () => ({ ...INITIAL_STATE }),
  };
});

describe("TodoInput test suite", () => {
  it("Render the todo input with a checkbox", () => {
    render(<TodoInput />);
    screen.getByPlaceholderText("Create a new todo");
    screen.getByTestId<HTMLInputElement>("todo-input-checkbox");
  });

  it("The user can write inside the text input, after enter the input is cleaned", async () => {
    render(<TodoInput />);
    const input =
      screen.getByPlaceholderText<HTMLInputElement>("Create a new todo");
    await userEvent.click(input);
    await userEvent.keyboard("Escribiendo una tarea");

    expect(input.value).toBe("Escribiendo una tarea");
    await userEvent.keyboard("Escribiendo una tarea");

    await userEvent.keyboard("{enter}");
    expect(input.value).toBe("");
  });

  it("The checkbox toggle active state", async () => {
    render(<TodoInput />);
    const checkbox = screen.getByTestId<HTMLInputElement>(
      "todo-input-checkbox"
    );

    expect(checkbox.checked).toBeFalsy();
    await userEvent.click(screen.getByTestId("todo-input-checkbox"));
    expect(checkbox.checked).toBeTruthy();
  });
});
