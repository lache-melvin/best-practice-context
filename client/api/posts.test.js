import { makeAddPost, makeGetPosts, makeGetPostById } from "./posts";

import mockPosts from "../testing/mockPosts";

test("getPosts returns the correct body", async () => {
  const consume = jest.fn(() => Promise.resolve(mockPosts));
  const getPosts = makeGetPosts(consume);

  const posts = await getPosts();

  expect(posts).toHaveLength(3);
});

test("getPostById returns the correct body", async () => {
  const consume = jest.fn(() => Promise.resolve(mockPosts[1]));
  const getPostById = makeGetPostById(consume);

  const post = await getPostById(2);

  expect(post.id).toBe(2);
  expect(post.name).toBe("mocked post 2");
  expect(post.link).toBe("https://mocked.link.com/2");
  expect(post.description).toBe("mocked description 2");
});

test("addPost returns the post with its new id", async () => {
  function mockConsume(url, options) {
    expect(url).toBe("/posts");
    expect(options.method).toBe("post");
    return Promise.resolve({ id: 4, ...options.data });
  }

  const consume = jest.fn(mockConsume);
  const getAuthHeader = jest.fn(() => ({ Authorization: "test_auth_token" }));
  const addPost = makeAddPost(consume, getAuthHeader);
  const now = new Date();
  const post = {
    name: "mocked post 4",
    link: "https://mocked.link.com/4",
    description: "mocked description 4",
    created: now.setDate(now.getDate() - 2),
    updated: now.setDate(now.getDate() - 2),
  };

  const addedPost = await addPost(post);

  expect(addedPost.id).toBe(4);
  expect(addedPost.name).toBe("mocked post 4");
  expect(addedPost.link).toBe("https://mocked.link.com/4");
  expect(getAuthHeader.mock.calls).toHaveLength(1);
});
