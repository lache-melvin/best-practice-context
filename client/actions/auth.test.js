import { SIGN_IN, signedIn } from "./auth";

jest.mock("../api");

test("signedIn() returns the correct action", () => {
  const token = {
    id: 11,
    username: "testusername",
    password: "testpassword",
  };

  const action = signedIn(token);

  expect(action.type).toBe(SIGN_IN);
  expect(action.user.id).toBe(token.id);
  expect(action.user.username).toBe(token.username);
  expect(action.user.password).toBeUndefined();
});
