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
  return db('posts')
    .insert(post)
    .then(ids => {
      post.id = ids[0]
      return {...post}
    })
}
