const { generateHash } = require('authenticare/server')

module.exports = {
  createUser,
  userExists,
  getUserByName
}

const users = [
  {
    id: 1,
    username: 'jae'
  }, {
    id: 2,
    username: 'jess'
  }, {
    id: 3,
    username: 'jules'
  }
]

Promise.all([
  generateHash('jae'),
  generateHash('jess'),
  generateHash('jules')
])
  .then(([jaeHash, jessHash, julesHash]) => {
    users[0].hash = jaeHash
    users[1].hash = jessHash
    users[2].hash = julesHash
  })

function createUser (user) {
  const newId = users.length + 1 // yea, yeah, i know
  return generateHash(user.password)
    .then(hash => {
      const newUser = {
        ...user,
        id: newId,
        hash: hash
      }
      delete newUser.password
      users.push(newUser)
      return [newId]
    })
}

function userExists (username) {
  return Promise.resolve(users.some(u => u.username === username))
}

function getUserByName (username) {
  return Promise.resolve(users.find(u => u.username === username))
}
