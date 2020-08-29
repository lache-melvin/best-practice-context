const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      const { Entry, User } = models;
      User.hasMany(Entry, { foreignKey: "authorId" });
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
