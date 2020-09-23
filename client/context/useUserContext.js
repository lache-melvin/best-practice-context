import { useContext } from "react";

import { UserContext } from "./userContext";

const useUserContext = () => {
  const [user, setUser] = useContext(UserContext);

  const applyUser = (token) => {
    const { id, username } = token.dataValues;
    const user = { id, username };
    setUser(user);
  };

  return {
    applyUser,
    user,
  };
};

export default useUserContext;
