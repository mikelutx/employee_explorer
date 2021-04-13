import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { mockEmployeeSearchResult } from "../../mock/mockdata";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import EmployeeList from "./employeeList";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  act(() => {
    render(<EmployeeList employeeList={mockEmployeeSearchResult} />, container);
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("total number of employee matches", () => {
  const cards = document.querySelectorAll(".card");
  expect(cards.length).toBe(mockEmployeeSearchResult.length);
});

test("1st employee name matches", () => {
  const title = document.querySelector(".card-title");
  expect(title?.innerHTML).toBe(mockEmployeeSearchResult[0].name);
});

test("snapshot testing employee list", () => {
  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
