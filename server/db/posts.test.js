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

test('getPostById() returns the correct post', () => {
  const id = 2
  return db.getPostById(id, testDb)
    .then(post => {
      expect(post.name).toBe('post 2')
    })
})

test('addPost() adds and returns the new post', () => {
  const newPost = {
    name: 'added name',
    link: 'http://added.link.com',
    description: 'added description',
    authorId: 2
  }
  return db.addPost(newPost, testDb)
    .then(post => {
      expect(post.authorId).toBe(2)
      expect(post.id).toBeGreaterThan(3)
      expect(post.name).toBe('added name')
      expect(post.link).toBe('http://added.link.com')
      expect(post.description).toBe('added description')
    })
    .then(() => db.getPosts(testDb))
    .then(posts => {
      expect(posts).toHaveLength(4)
    })
})
