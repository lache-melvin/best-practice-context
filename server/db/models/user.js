const { DataTypes } = require('sequelize')

const userSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false

  },
  hash: {
    type: DataTypes.STRING.BINARY,
    allowNull: false
  }
}

function makeUser (connection) {
  connection.define('User', userSchema)
}

module.exports = {
  userSchema,
  makeUser
}
