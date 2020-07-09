const { userSchema } = require('../models/user')

exports.up = (queryInterface) => {
  return queryInterface.createTable('users', userSchema)
}

exports.down = queryInterface => queryInterface.dropTable('users')
