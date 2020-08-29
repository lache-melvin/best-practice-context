const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    static associate(models) {
      const { Entry, User } = models;
      Entry.belongsTo(User, { as: "author" });
    }
  }

  Entry.init(
    {
      name: DataTypes.STRING,
      link: DataTypes.STRING,
      description: DataTypes.STRING(1024),
    },
    {
      sequelize,
      modelName: "Entry",
    }
  );

  return Entry;
};
