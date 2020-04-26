import postsReducer from './posts'
import { RECEIVE_POSTS } from '../actions/posts'
import mockPosts from '../testing/mockPosts'

test('postsReducer responds correctly to RECEIVE_POSTS', () => {
  const currentState = []
  const action = {
    type: RECEIVE_POSTS,
    posts: mockPosts
  }

  const newState = postsReducer(currentState, action)

  expect(newState).toHaveLength(3)
  expect(newState).not.toBe(currentState)
})

test('postsReducer responds correctly to unknown action type', () => {
  const currentState = []
  const action = {
    type: 'UNKNOWN_TYPE'
  }

  const newState = postsReducer(currentState, action)

  expect(newState).toHaveLength(0)
  expect(newState).toBe(currentState)
})
