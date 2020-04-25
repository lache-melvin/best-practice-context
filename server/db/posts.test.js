const db = require('./posts')

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

test('getPosts() returns posts', () => {
  return db.getPosts(testDb)
    .then(posts => {
      expect(posts).toHaveLength(3)
    })
})
