const {
  createUser,
  userExists,
  getUserByName
} = require('./users')

const Connection = require('./connection')

const testDb = Connection()

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

test('createUser() creates a user', () => {
  const user = { username: 'newuser', password: 'password' }
  return createUser(user, testDb)
    .then(ids => {
      expect(ids[0]).toBe(3)
    })
})

test('userExists() returns true for an existing user', () => {
  const username = 'jess'
  return userExists(username, testDb)
    .then(exists => {
      expect(exists).toBeTruthy()
    })
})

test('userExists() returns false when user does not exist', () => {
  const username = 'unknown'
  return userExists(username, testDb)
    .then(exists => {
      expect(exists).toBeFalsy()
    })
})

test('getUserByName() returns the user with the username', () => {
  const username = 'jules'
  return getUserByName(username, testDb)
    .then(user => {
      expect(user.username).toBe(username)
    })
})
