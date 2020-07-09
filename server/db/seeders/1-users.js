const { generateHash } = require('authenticare/server')

exports.up = (queryInterface) => {
  return Promise.all([
    generateHash('jess'),
    generateHash('jules')
  ])
    .then(([jessHash, julesHash]) =>
      queryInterface.bulkInsert('users', [
        { id: 1, username: 'jess', hash: jessHash },
        { id: 2, username: 'jules', hash: julesHash }
      ])
    )
}

exports.down = (queryInterface) => queryInterface.bulkDelete('users')
