import { makeRegisterUser, makeSignInUser } from "./users";

describe("registerUser", () => {
  it("calls signedIn and redirects on register success", () => {
    const userData = { username: "test user", password: "test password" };
    let history = [];
    const signedIn = jest.fn();
    const register = jest.fn(() => Promise.resolve());
    const isAuthenticated = jest.fn(() => true);

    return registerUser(
      userData,
      history,
      signedIn,
      register,
      isAuthenticated
    ).then(() => {
      expect(register).toHaveBeenCalled();
      expect(isAuthenticated).toHaveBeenCalled();
      expect(signedIn).toHaveBeenCalled();
      expect(history).toHaveLength(1);
      return null;
    });
  });

  it("returns null if authentication fails", () => {
    const userData = { username: "test user", password: "test password" };
    let history = [];
    const signedIn = jest.fn();
    const register = jest.fn(() => Promise.resolve());
    const isAuthenticated = jest.fn(() => false);

    return registerUser(
      userData,
      history,
      signedIn,
      register,
      isAuthenticated
    ).then((res) => {
      expect(register).toHaveBeenCalled();
      expect(isAuthenticated).toHaveBeenCalled();
      expect(signedIn).not.toHaveBeenCalled();
      expect(history).toHaveLength(0);
      expect(res).toBeNull();
      return null;
    });
  });
});

describe("signInUser", () => {
  it("calls signedIn and redirects on register success", () => {
    const userData = { username: "test user", password: "test password" };
    let history = [];
    const signedIn = jest.fn();
    const signIn = jest.fn(() => Promise.resolve());
    const isAuthenticated = jest.fn(() => true);

    return registerUser(
      userData,
      history,
      signedIn,
      signIn,
      isAuthenticated
    ).then(() => {
      expect(signIn).toHaveBeenCalled();
      expect(isAuthenticated).toHaveBeenCalled();
      expect(signedIn).toHaveBeenCalled();
      expect(history).toHaveLength(1);
      return null;
    });
  });

  it("returns null if authentication fails", () => {
    const userData = { username: "test user", password: "test password" };
    let history = [];
    const signedIn = jest.fn();
    const signIn = jest.fn(() => Promise.resolve());
    const isAuthenticated = jest.fn(() => false);

    return registerUser(
      userData,
      history,
      signedIn,
      signIn,
      isAuthenticated
    ).then((res) => {
      expect(signIn).toHaveBeenCalled();
      expect(isAuthenticated).toHaveBeenCalled();
      expect(signedIn).not.toHaveBeenCalled();
      expect(history).toHaveLength(0);
      expect(res).toBeNull();
      return null;
    });
  });
});
