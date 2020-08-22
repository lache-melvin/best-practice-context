export const SIGN_IN = "SIGN_IN";

export function signedIn(token) {
  const { id, username } = token;
  return {
    type: SIGN_IN,
    user: { id, username },
  };
}
