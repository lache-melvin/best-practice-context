import { SIGN_IN } from '../actions/auth'

function userReducer (state = {}, action) {
  switch (action.type) {
    case SIGN_IN:
      return action.user
    default:
      return state
  }
}

export default userReducer
