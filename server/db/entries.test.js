// disable false positive warning in eslint-plugin-security
/* eslint-disable security/detect-non-literal-fs-filename */

const { Entry } = require("./models");
const { findEntryById, listEntries, addEntry } = require("./entries");
const { ENTRY_ID_NOT_FOUND, AUTHOR_ID_NOT_PROVIDED } = require("../errors");

jest.mock("./models", () => ({
  Entry: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));

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
  {
    id: 3,
    authorId: 2,
    name: "mocked entry 3",
    link: "https://mocked.link.com/3",
    description: "mocked description 3",
  },
];

describe("listEntries()", () => {
  it("returns entries", () => {
    Entry.findAll.mockImplementation(() => Promise.resolve(mockEntries));
    return listEntries().then((entries) => {
      return expect(entries).toHaveLength(3);
    });
  });
});

describe("findEntryById()", () => {
  it("returns the correct entry", () => {
    const id = 2;

    Entry.findByPk.mockImplementation((entryId) => {
      return Promise.resolve(mockEntries.find((entry) => entry.id === entryId));
    });

    return findEntryById(id).then((entry) => {
      return expect(entry.name).toBe("mocked entry 2");
    });
  });

  it("throws an error if the id does not exist", () => {
    expect.assertions(1);

    Entry.findByPk.mockImplementation(() => {
      return Promise.resolve(null);
    });

    return findEntryById(99999).catch((err) => {
      expect(err.message).toMatch(ENTRY_ID_NOT_FOUND);
    });
  });
});

describe("addEntry()", () => {
  it("adds and returns the new entry", () => {
    const authorId = 1;
    const newEntry = {
      name: "added name",
      link: "http://added.link.com",
      description: "added description",
    };

    Entry.create.mockImplementation((entryToAdd) =>
      Promise.resolve({ id: 4, ...entryToAdd })
    );

    return addEntry(newEntry, authorId).then((entry) => {
      expect(entry.id).toBe(4);
      expect(entry.authorId).toBe(1);
      expect(entry.name).toBe("added name");
      expect(entry.link).toBe("http://added.link.com");
      return expect(entry.description).toBe("added description");
    });
  });

  it("throws an error if the author id is not found", () => {
    expect.assertions(1);

    const authorId = 99999;
    const newEntry = {
      name: "added name",
      link: "http://added.link.com",
      description: "added description",
    };

    Entry.create.mockImplementation(() => {
      const errMsg = "Error: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed";
      const error = new Error(errMsg);
      error.name = "SequelizeForeignKeyConstraintError";
      return Promise.reject(error);
    });

    return addEntry(newEntry, authorId).catch((err) => {
      expect(err.message).toMatch(AUTHOR_ID_NOT_PROVIDED);
    });
  });
});
