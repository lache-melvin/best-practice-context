import { RECEIVE_ENTRY } from "../actions/entries";

function entryReducer(state = null, action) {
  switch (action.type) {
    case RECEIVE_ENTRY:
      return action.entry;
    default:
      return state;
  }
}

export default entryReducer;
