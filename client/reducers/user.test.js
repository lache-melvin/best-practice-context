import userReducer from './user'
import { SIGN_IN } from '../actions/auth'

test('userReducer responds correctly to SIGN_IN', () => {
  const currentState = { username: 'testuser' }
  const action = {
    type: SIGN_IN,
    user: { id: 3, username: 'testuser3' }
  }

  const newState = userReducer(currentState, action)

  expect(newState.id).toBe(action.user.id)
  expect(newState.username).toBe(action.user.username)
  expect(newState).not.toBe(currentState)
})

test('userReducer responds correctly to unknown action type', () => {
  const currentState = {}
  const action = {
    type: 'UNKNOWN_TYPE'
  }

  const newState = userReducer(currentState, action)

  expect(newState).toBe(currentState)
})
