import { combineReducers } from "redux";

import entries from "./entries";
import entry from "./entry";
import user from "./user";

export default combineReducers({
  entries,
  entry,
  user,
});
