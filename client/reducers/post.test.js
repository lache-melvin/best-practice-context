import postReducer from './post'
import { RECEIVE_POST } from '../actions/posts'
import mockPosts from '../testing/mockPosts'

test('postReducer responds correctly to RECEIVE_POST', () => {
  const currentState = { name: 'current post' }
  const action = {
    type: RECEIVE_POST,
    post: mockPosts[0]
  }

  const newState = postReducer(currentState, action)

  expect(newState.name).toBe('mocked post 1')
  expect(newState).not.toBe(currentState)
})

test('postReducer responds correctly to unknown action type', () => {
  const currentState = {}
  const action = {
    type: 'UNKNOWN_TYPE'
  }

  const newState = postReducer(currentState, action)

  expect(newState).toBe(currentState)
})
