const Sequelize = require('sequelize')

const { makeUser } = require('../models/user')

function makePostSchema (user) {
  return {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    description: Sequelize.DataTypes.STRING(1024),
    author_id: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: user,
        key: 'id'
      }
    }
  }
}

function makePost (connection) {
  const User = makeUser(connection)
  const postSchema = makePostSchema(User)
  connection.define('Post', postSchema)
}

module.exports = {
  makePostSchema,
  makePost
}
