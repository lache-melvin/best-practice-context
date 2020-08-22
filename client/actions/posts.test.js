import {
  RECEIVE_POSTS,
  receivePosts,
  RECEIVE_POST,
  receivePost,
  savePost,
  fetchPosts,
  fetchPostById,
} from "./posts";

import { getPosts, getPostById, addPost } from "../api";

import mockPosts from "../testing/mockPosts";

jest.mock("../api", () => ({
  getPosts: jest.fn(),
  getPostById: jest.fn(),
  addPost: jest.fn(),
}));

test("receivePosts() returns the correct action", () => {
  const posts = [{ name: "test1" }, { name: "test2" }];

  const action = receivePosts(posts);

  expect(action.type).toBe(RECEIVE_POSTS);
  expect(action.posts).toHaveLength(2);
  expect(action.posts[1].name).toBe("test2");
});

test("receivePost() returns the correct action", () => {
  const post = { name: "test1" };

  const action = receivePost(post);

  expect(action.type).toBe(RECEIVE_POST);
  expect(action.post.name).toBe(post.name);
});

test("fetchPosts() dispatches RECEIVE_POSTS action", () => {
  const mockDispatch = jest.fn();
  getPosts.mockImplementation(() => Promise.resolve(mockPosts));

  const action = fetchPosts();

  return action(mockDispatch).then(() => {
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_POSTS);
    return expect(mockDispatch.mock.calls[0][0].posts).toHaveLength(3);
  });
});

test("fetchPostById() dispatches RECEIVE_POST action", () => {
  const mockDispatch = jest.fn();
  getPostById.mockImplementation(() => Promise.resolve(mockPosts[0]));

  const action = fetchPostById(1);

  return action(mockDispatch).then(() => {
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_POST);
    return expect(mockDispatch.mock.calls[0][0].post.name).toBe(
      "mocked post 1"
    );
  });
});

test("savePost() dispatches RECEIVE_POST action", () => {
  const mockDispatch = jest.fn();
  addPost.mockImplementation((post) => Promise.resolve({ id: 3, ...post }));
  const post = { name: "test1" };

  const action = savePost(post);

  return action(mockDispatch).then(() => {
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_POST);
    return expect(mockDispatch.mock.calls[0][0].post.name).toBe(post.name);
  });
});
