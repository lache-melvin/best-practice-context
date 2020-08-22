// disable false positive warning in eslint-plugin-security
/* eslint-disable security/detect-non-literal-fs-filename */

const path = require("path");
const request = require("supertest");

require("dotenv").config({ path: path.join(__dirname, "../.env") });

const server = require("../server");
const postDb = require("../db/posts");
const userDb = require("../db/users");

jest.mock("../db/posts.js", () => ({
  getPostById: jest.fn(),
  getPosts: jest.fn(),
  addPost: jest.fn(),
}));

jest.mock("../db/users.js", () => ({
  createUser: jest.fn(),
  userExists: jest.fn(),
  getUserByName: jest.fn(),
}));

const mockPosts = [
  {
    id: 1,
    authorId: 1,
    name: "mocked post 1",
    link: "https://mocked.link.com/1",
    description: "mocked description 1",
  },
  {
    id: 2,
    authorId: 2,
    name: "mocked post 2",
    link: "https://mocked.link.com/2",
    description: "mocked description 2",
  },
];

function getTestToken(srv) {
  return request(srv)
    .post("/api/v1/auth/register")
    .send({ username: "test", password: "test" })
    .then((res) => {
      return res.body.token;
    });
}

describe("GET /api/v1/posts", () => {
  it("returns an array of posts", () => {
    postDb.getPosts.mockImplementation(() => Promise.resolve(mockPosts));

    return request(server)
      .get("/api/v1/posts")
      .then((res) => {
        expect(res.body).toHaveLength(2);
        expect(res.body[0].name).toMatch("mocked post 1");
        expect(res.body[1].link).toMatch("https://mocked.link.com/2");
        return null;
      });
  });
});

describe("GET /api/v1/posts/2", () => {
  it("returns a post", () => {
    postDb.getPostById.mockImplementation((postId) =>
      Promise.resolve(mockPosts.find((post) => post.id === postId))
    );

    return request(server)
      .get("/api/v1/posts/2")
      .then((res) => {
        const { name, link, description } = res.body;
        expect(name).toMatch("mocked post 2");
        expect(link).toMatch("https://mocked.link.com/2");
        expect(description).toMatch("mocked description 2");
        return res;
      });
  });

  it("returns a 404 if id is not found", () => {
    postDb.getPostById.mockImplementation(() => Promise.resolve(null));

    return request(server)
      .get("/api/v1/posts/9999")
      .expect(404)
      .then((res) => {
        const [error] = res.body.errors;
        expect(error.title).toMatch("Post id not found");
        return res;
      });
  });
});

describe("POST /api/v1/posts", () => {
  it("adds and returns a post", () => {
    const newPost = {
      name: "new test post",
      link: "http://should.work.com",
      description: "new description",
    };

    postDb.addPost.mockImplementation((newPost, authorId) =>
      Promise.resolve({ id: 3, authorId, ...newPost })
    );
    userDb.userExists.mockImplementation(() => Promise.resolve(false));
    userDb.getUserByName.mockImplementation(() =>
      Promise.resolve({ id: 3, username: "test", hash: "test-hash" })
    );
    userDb.createUser.mockImplementation(({ username }) =>
      Promise.resolve({
        id: 3,
        username,
        hash: "test-hash",
      })
    );

    return getTestToken(server)
      .then((token) => {
        return request(server)
          .post("/api/v1/posts")
          .send(newPost)
          .set("Authorization", `BEARER ${token}`);
      })
      .then((res) => {
        const { name, link, description } = res.body;
        expect(name).toMatch(newPost.name);
        expect(link).toMatch(newPost.link);
        expect(description).toMatch(newPost.description);
        return res;
      });
  });

  it("returns a 400 if author id is not found", () => {
    const newPost = {
      authorId: 99999,
      name: "new invalid post",
      link: "http://should.not.work",
      description: "should not work anyway",
    };

    // eslint-disable-next-line no-unused-vars
    postDb.addPost.mockImplementation((newPost, authorId) => {
      const error = new Error("Author id does not exist");
      return Promise.reject(error);
    });

    return getTestToken(server)
      .then((token) => {
        return request(server)
          .post("/api/v1/posts")
          .send(newPost)
          .set("Authorization", `BEARER ${token}`)
          .expect(400); // bad request
      })
      .then((res) => {
        expect(res.body.errors[0].title).toMatch("Author id does not exist");
        return res;
      });
  });

  it("returns a 401 if no auth token is sent", () => {
    expect.assertions(0);
    const newPost = {
      authorId: 2,
      name: "new unauthenticated post",
      link: "http://should.not.work",
      description: "should not work anyway",
    };

    postDb.addPost.mockImplementation((newPost, authorId) =>
      Promise.resolve({ id: 3, authorId, ...newPost })
    );
    userDb.userExists.mockImplementation(() => Promise.resolve(false));
    userDb.getUserByName.mockImplementation(() =>
      Promise.resolve({ id: 3, username: "test", hash: "test-hash" })
    );
    userDb.createUser.mockImplementation(({ username }) =>
      Promise.resolve({
        id: 3,
        username,
        hash: "test-hash",
      })
    );

    return request(server)
      .post("/api/v1/posts")
      .send(newPost)
      .expect(401) // unauthorized
      .then((res) => res);
  });
});
