import request from 'superagent'

export function getPosts () {
  return request('/api/v1/posts')
    .then(res => {
      return res.body
    })
}
