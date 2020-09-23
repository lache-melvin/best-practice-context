import { useContext } from "react";

import { UserContext } from "./UserContext";

const useUserContext = () => {
  const [userState, setUserState] = useContext(UserContext);

  const signedIn = (token) => {
    const { id, username } = token;
    const user = { id, username };
    setUserState(user);
  };

  return {
    signedIn,
    userState,
  };
};

export default useUserContext;
