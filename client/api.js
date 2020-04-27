import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'

export function getPosts () {
  return request
    .get('/api/v1/posts')
    .then(res => res.body)
}

export function getPostById (id) {
  return request
    .get(`/api/v1/posts/${id}`)
    .then(res => res.body)
}

export function addPost (post) {
  return request
    .post('/api/v1/posts')
    .set(getAuthorizationHeader())
    .send(post)
    .then(res => res.body)
}
