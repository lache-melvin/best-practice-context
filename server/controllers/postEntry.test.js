// disable false positive warning in eslint-plugin-security
/* eslint-disable security/detect-non-literal-fs-filename */

const { AUTHOR_ID_NOT_FOUND, AUTHOR_ID_NOT_PROVIDED } = require("../errors");

const makePostEntry = require("./postEntry");

describe("POST /api/v1/entries", () => {
  it("adds and returns an entry", () => {
    const request = {
      user: { id: 3 },
      body: {
        name: "new test post",
        link: "http://should.work.com",
        description: "new description",
      },
    };

    const mockAddPost = (newPost, authorId) =>
      Promise.resolve({ id: 3, authorId, ...newPost });
    const postEntry = makePostEntry(mockAddPost);

    return postEntry(request).then((response) => {
      const { name, link, description } = response.body;
      expect(name).toMatch(request.body.name);
      expect(link).toMatch(request.body.link);
      expect(description).toMatch(request.body.description);
      return null;
    });
  });

  it("returns a 400 if author id is not found", () => {
    const request = {
      user: { id: 9999 },
      body: {
        name: "new invalid post",
        link: "http://should.not.work",
        description: "should not work anyway",
      },
    };

    const mockAddPost = () =>
      Promise.reject({
        message: AUTHOR_ID_NOT_FOUND,
      });
    const postEntry = makePostEntry(mockAddPost, { AUTHOR_ID_NOT_FOUND });

    return postEntry(request).then((response) => {
      expect(response.body.errors[0].title).toMatch(AUTHOR_ID_NOT_FOUND);
      return null;
    });
  });

  it("returns a 401 if no author ID is provided", () => {
    const request = {
      user: {}, // an intentionally empty user object
      body: {
        name: "new unauthenticated post",
        link: "http://should.not.work",
        description: "should not work anyway",
      },
    };

    const postEntry = makePostEntry(null, { AUTHOR_ID_NOT_PROVIDED });

    return postEntry(request).then((response) => {
      expect(response.body.errors[0].title).toMatch(AUTHOR_ID_NOT_PROVIDED);
      return null;
    });
  });
});
