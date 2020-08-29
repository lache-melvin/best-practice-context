// disable false positive warning in eslint-plugin-security
/* eslint-disable security/detect-non-literal-fs-filename */

const makeGetEntries = require("./getEntries");

const mockEntries = [
  {
    id: 1,
    authorId: 1,
    name: "mocked entry 1",
    link: "https://mocked.link.com/1",
    description: "mocked description 1",
  },
  {
    id: 2,
    authorId: 2,
    name: "mocked entry 2",
    link: "https://mocked.link.com/2",
    description: "mocked description 2",
  },
];

describe("GET /api/v1/entries", () => {
  it("returns an array of entries", () => {
    const mockListEntries = () => Promise.resolve(mockEntries);
    const getEntries = makeGetEntries(mockListEntries);

    return getEntries().then((res) => {
      expect(res.body).toHaveLength(2);
      expect(res.body[0].name).toMatch("mocked entry 1");
      expect(res.body[1].link).toMatch("https://mocked.link.com/2");
      return null;
    });
  });

  it("returns a 500 if there is an error", () => {
    const mockListEntries = () => Promise.reject();
    const logger = { error: jest.fn() };
    const getEntries = makeGetEntries(mockListEntries, logger);

    return getEntries().then((response) => {
      const [error] = response.body.errors;
      expect(error.title).toMatch("error occurred");
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toBe(500);
      return null;
    });
  });
});
