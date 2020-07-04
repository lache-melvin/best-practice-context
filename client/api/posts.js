// TODO: Make error logging more robust
// Perhaps by passing a logger into each of these functions

export function makeGetPosts (consume) {
  return async function () {
    try {
      const res = await consume('/posts')
      return res.body
    } catch (err) {
      console.error(err)
    }
  }
}

export function makeGetPostById (consume) {
  return async function (id) {
    try {
      const res = await consume(`/posts/${id}`)
      return res.body
    } catch (err) {
      console.error(err)
    }
  }
}

export function makeAddPost (consume, getAuthHeader) {
  return async function (post) {
    const config = {
      data: post,
      method: 'post',
      ...getAuthHeader()
    }

    try {
      const res = await consume('/posts', config)
      return res.body
    } catch (err) {
      console.error(err)
    }
  }
}
