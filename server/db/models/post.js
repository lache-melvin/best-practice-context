const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate (models) {
      const { Post, User } = models
      Post.belongsTo(User, { as: 'author' })
    }
  }

  Post.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING(1024)
  }, {
    sequelize,
    modelName: 'Post'
  })

  return Post
}
