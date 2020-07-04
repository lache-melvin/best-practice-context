import axios from 'axios'
import { getAuthorizationHeader } from 'authenticare/client'

import { makeGetPosts, makeGetPostById, makeAddPost } from './posts'

const baseUrl = '/api/v1'

export const getPosts = makeGetPosts(consume)
export const getPostById = makeGetPostById(consume)
export const addPost = makeAddPost(consume, getAuthorizationHeader)

function consume (url, config = {}) {
  const request = {
    url: baseUrl + url,
    method: (config.method) || 'get',
    headers: {
      Accept: 'application/json'
    }
  }

  if (config.data) {
    request.data = config.data
  }

  if (config.auth) {
    request.headers.Authorization = config.auth
  }

  return axios(request)
    .then(res => res)
    .catch(err => {
      throw err
    })
}
