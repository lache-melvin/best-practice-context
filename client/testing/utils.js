import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

export const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) => {
  return {
    ...render(
      <Router initialEntries={initialEntries} initialIndex={0}>
        {ui}
      </Router>
    ),
  };
};
