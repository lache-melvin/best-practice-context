exports.up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('Posts', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(1024)
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        key: 'id',
        model: { tableName: 'users' }
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  })
}

exports.down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('Posts')
}
