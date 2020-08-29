const makeGetEntryById = require("./getEntryById");
const { ENTRY_ID_NOT_FOUND } = require("../errors");

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

describe("GET /api/v1/entries/2", () => {
  it("returns a entry", () => {
    const request = { params: { id: 2 } };
    const mockFindEntryById = () => Promise.resolve(mockEntries[1]);
    const getEntryById = makeGetEntryById(mockFindEntryById);

    return getEntryById(request).then((response) => {
      const { name, link, description } = response.body;
      expect(name).toMatch("mocked entry 2");
      expect(link).toMatch("https://mocked.link.com/2");
      expect(description).toMatch("mocked description 2");
      return null;
    });
  });

  it("returns a 404 if entry id is not found", () => {
    const request = { params: { id: 999 } };

    const mockFindEntryById = () =>
      Promise.reject({
        code: 404,
        message: ENTRY_ID_NOT_FOUND,
      });
    const logger = {
      error: jest.fn(),
    };

    const getEntryById = makeGetEntryById(
      mockFindEntryById,
      { ENTRY_ID_NOT_FOUND },
      logger
    );

    return getEntryById(request).then((response) => {
      const [error] = response.body.errors;
      expect(error.title).toMatch(ENTRY_ID_NOT_FOUND);
      expect(logger.error).toHaveBeenCalledTimes(1);
      return null;
    });
  });

  it("returns a 500 if entry cannot be retrieved", () => {
    const request = { params: { id: 999 } };

    const mockFindEntryById = () =>
      Promise.reject({
        message: "Unexpected error",
      });
    const logger = {
      error: jest.fn(),
    };

    const getEntryById = makeGetEntryById(
      mockFindEntryById,
      { ENTRY_ID_NOT_FOUND },
      logger
    );

    return getEntryById(request).then((response) => {
      const [error] = response.body.errors;
      expect(error.title).toMatch("error occurred");
      expect(logger.error).toHaveBeenCalledTimes(1);
      return null;
    });
  });
});
