const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      const { Post, User } = models;
      User.hasMany(Post, { foreignKey: "authorId" });
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      hash: DataTypes.STRING.BINARY,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
