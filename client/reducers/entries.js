import { RECEIVE_ENTRIES } from "../actions/entries";

function entriesReducer(state = [], action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return action.entries || [];
    default:
      return state;
  }
}

export default entriesReducer;
