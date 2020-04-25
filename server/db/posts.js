const Connection = require('./connection')

const connection = Connection()

module.exports = {
  getPosts
}

function getPosts (db = connection) {
  return db('posts').select()
}
