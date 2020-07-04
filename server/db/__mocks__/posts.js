module.exports = {
  addPost,
  getPosts,
  getPostById
}

const now = new Date()

const posts = [
  {
    id: 1,
    authorId: 1,
    name: 'mocked post 1',
    link: 'https://mocked.link.com/1',
    description: 'mocked description 1',
    created: new Date(now.setDate(now.getDate() - 2)),
    updated: new Date(now.setDate(now.getDate() - 2))
  }, {
    id: 2,
    authorId: 2,
    name: 'mocked post 2',
    link: 'https://mocked.link.com/2',
    description: 'mocked description 2',
    created: new Date(now.setDate(now.getDate() - 1)),
    updated: new Date(now.setDate(now.getDate() - 1))
  }, {
    id: 3,
    authorId: 2,
    name: 'mocked post 3',
    link: 'https://mocked.link.com/3',
    description: 'mocked description 3',
    created: new Date(),
    updated: new Date()
  }
]

function getPosts () {
  return Promise.resolve(posts)
}

function getPostById (id) {
  return Promise.resolve(posts.find(p => p.id === id))
}

function addPost (post) {
  return new Promise((resolve, reject) => {
    const newPost = {
      ...post,
      id: posts.length + 1, // yea, yeah, i know
      created: new Date(),
      updated: new Date()
    }
    posts.push({ ...newPost })
    resolve(newPost)
  })
}
