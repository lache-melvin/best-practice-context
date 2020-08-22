import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../testing/utils";

import AddPost from "./AddPost";

test("<AddPost> includes name in <li>", async () => {
  renderWithRedux(<AddPost />);
  const post = await screen.findByTestId("addpost");
  expect(post).toBeInTheDocument();
  expect(post).toMatchSnapshot();
});
