import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import EmployeeCard from "./employeeCard";
import { mockEmployee } from "../../mock/mockdata";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    render(<EmployeeCard employee={mockEmployee} />, container);
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders employee card", () => {
  const title = document.querySelector(".card-title");
  expect(title?.innerHTML).toBe(mockEmployee.name);
});

test("snapshot testing employee card", () => {
  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
