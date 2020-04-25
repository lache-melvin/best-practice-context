import { getPosts } from '../api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts
  }
}

export function fetchPosts () {
  return dispatch => {
    getPosts()
      .then(posts => {
        dispatch(receivePosts(posts))
      })
      .catch(err => {
        console.error('fetchPosts action error:', err)
      })
  }
}
