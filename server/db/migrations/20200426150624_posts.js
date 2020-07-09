const { postSchema } = require('../models/post')

exports.up = (queryInterface) => {
  return queryInterface.createTable('posts', postSchema)
}

exports.down = queryInterface => queryInterface.dropTable('posts')
