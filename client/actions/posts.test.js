import {
  RECEIVE_POSTS,
  receivePosts,
  fetchPosts
} from './posts'

jest.mock('../api')

test('receivePosts() returns the correct action', () => {
  const posts = [{name: 'test1'}, {name: 'test2'}]

  const action = receivePosts(posts)

  expect(action.type).toBe(RECEIVE_POSTS)
  expect(action.posts).toHaveLength(2)
  expect(action.posts[1].name).toBe('test2')
})

test('fetchPosts() dispatches RECEIVE_POSTS action', () => {
  const mockDispatch = jest.fn()
  const action = fetchPosts()

  action(mockDispatch).then(() => {
    expect(mockDispatch.mock.calls).toHaveLength(1)
    expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_POSTS)
    expect(mockDispatch.mock.calls[0][0].posts).toHaveLength(3)
  })
})

