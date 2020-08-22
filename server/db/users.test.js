const { createUser, userExists, getUserByName } = require("./users");

const { User } = require("./models");

jest.mock("./models", () => ({
  User: {
    count: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

const mockUsers = [
  { id: 1, username: "jess" },
  { id: 2, username: "jules" },
];

describe("createUser()", () => {
  it("creates a user", () => {
    const user = { username: "newuser", password: "password" };

    User.count.mockImplementation(() => Promise.resolve(0));
    User.create.mockImplementation((u) => ({
      id: 3,
      hash: "test-hash",
      username: u.username,
    }));

    return createUser(user).then((user) => {
      expect(user.password).toBeUndefined();
      expect(user.username).toBe("newuser");
      return expect(user.hash).toBe("test-hash");
    });
  });

  it("throws an error if the user already exists", () => {
    const user = { username: "existinguser", password: "password" };

    User.count.mockImplementation(() => Promise.resolve(1));

    return createUser(user).catch((err) => {
      expect(err.message).toMatch("User exists");
    });
  });
});

describe("userExists()", () => {
  it("returns true for an existing user", () => {
    User.count.mockImplementation(() => Promise.resolve(1));

    return userExists("jess").then((exists) => {
      return expect(exists).toBeTruthy();
    });
  });

  it("returns false when a user does not exist", () => {
    User.count.mockImplementation(() => Promise.resolve(0));

    return userExists("sam").then((exists) => {
      return expect(exists).toBeFalsy();
    });
  });
});

describe("getUserByName()", () => {
  it("returns the user with the username", () => {
    expect.assertions(3);
    const username = "jules";

    User.findOne.mockImplementation((options) => {
      const { username } = options.where;
      expect(username).toBe("jules");
      return Promise.resolve(mockUsers.find((u) => u.username === username));
    });

    return getUserByName(username).then((user) => {
      expect(user.id).toBe(2);
      return expect(user.username).toBe(username);
    });
  });

  it("returns null when the username is not found", () => {
    expect.assertions(2);
    const username = "bruno";

    User.findOne.mockImplementation((options) => {
      const { username } = options.where;
      expect(username).toBe("bruno");
      return Promise.resolve(null);
    });

    return getUserByName(username).then((user) => {
      return expect(user).toBeNull();
    });
  });
});
