import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../testing/utils";
import "@testing-library/jest-dom";

import Posts from "./Posts";
import { getPosts } from "../api";
import mockPosts from "../testing/mockPosts";

jest.mock("../api", () => ({
  getPosts: jest.fn(),
}));

test("<Posts> shows posts from API", async () => {
  getPosts.mockImplementation(() => Promise.resolve(mockPosts));

  renderWithRedux(<Posts />, { initialState: { posts: mockPosts } });
  const posts = await screen.findAllByTestId("post");
  expect(posts).toHaveLength(3);
  expect(posts[1]).not.toHaveTextContent("1");
  expect(posts[1]).toHaveTextContent("2");
  expect(posts[1]).not.toHaveTextContent("3");
});
