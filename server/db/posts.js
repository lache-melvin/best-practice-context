const Connection = require('./connection')

const connection = Connection()

module.exports = {
  getPostById,
  getPosts,
  addPost
}

function getPosts (db = connection) {
  return db('posts').select()
}

function getPostById (id, db = connection) {
  return db('posts').where('id', id).first()
}

function addPost (post, db = connection) {
  const newPost = {
    name: post.name,
    link: post.link,
    author_id: post.authorId,
    description: post.description
  }
  return db('posts')
    .insert(newPost)
    .then(ids => {
      newPost.id = ids[0]
      newPost.authorId = newPost.author_id
      delete newPost.author_id
      return { ...newPost }
    })
}
