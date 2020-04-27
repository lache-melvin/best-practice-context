import mockPosts from '../testing/mockPosts'

export function getPosts () {
  return Promise.resolve(mockPosts)
}

export function getPostById (id) {
  return Promise.resolve(mockPosts.find(p => p.id === id))
}

export function addPost (post) {
  const newPost = {
    ...post,
    id: post.length + 1, // yea, yeah, i know
    created: new Date(),
    updated: new Date()
  }
  mockPosts.push(newPost)
  return Promise.resolve(newPost)
}
