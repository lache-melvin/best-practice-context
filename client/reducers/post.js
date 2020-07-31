import { RECEIVE_POST } from "../actions/posts";

function postReducer(state = null, action) {
  switch (action.type) {
    case RECEIVE_POST:
      return action.post;
    default:
      return state;
  }
}

export default postReducer;
