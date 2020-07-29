const { getPostById, getPosts, addPost } = require('./posts')

const { Post } = require('./models')

jest.mock('./models', () => ({
  Post: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn()
  }
}))

const mockPosts = [
  {
    id: 1,
    authorId: 1,
    name: 'mocked post 1',
    link: 'https://mocked.link.com/1',
    description: 'mocked description 1'
  }, {
    id: 2,
    authorId: 2,
    name: 'mocked post 2',
    link: 'https://mocked.link.com/2',
    description: 'mocked description 2'
  }, {
    id: 3,
    authorId: 2,
    name: 'mocked post 3',
    link: 'https://mocked.link.com/3',
    description: 'mocked description 3'
  }
]

describe('getPosts()', () => {
  it('returns posts', () => {
    Post.findAll.mockImplementation(() => Promise.resolve(mockPosts))
    return getPosts()
      .then(posts => {
        expect(posts).toHaveLength(3)
      })
  })
})

describe('getPostById()', () => {
  it('returns the correct post', () => {
    const id = 2

    Post.findByPk.mockImplementation((postId) => {
      return Promise.resolve(mockPosts.find(post => post.id === postId))
    })

    return getPostById(id)
      .then(post => {
        expect(post.name).toBe('mocked post 2')
      })
  })

  it('throws an error if the id does not exist', () => {
    expect.assertions(1)

    Post.findByPk.mockImplementation(() => {
      return Promise.resolve(null)
    })

    return getPostById(99999)
      .catch(err => {
        expect(err.message).toMatch('Post id does not exist')
      })
  })
})

describe('addPost()', () => {
  it('adds and returns the new post', () => {
    const authorId = 1
    const newPost = {
      name: 'added name',
      link: 'http://added.link.com',
      description: 'added description'
    }

    Post.create.mockImplementation(postToAdd =>
      Promise.resolve({ id: 4, ...postToAdd })
    )

    return addPost(newPost, authorId)
      .then(post => {
        expect(post.id).toBe(4)
        expect(post.authorId).toBe(1)
        expect(post.name).toBe('added name')
        expect(post.link).toBe('http://added.link.com')
        expect(post.description).toBe('added description')
      })
  })

  it('throws an error if the author id is not found', () => {
    expect.assertions(1)

    const authorId = 99999
    const newPost = {
      name: 'added name',
      link: 'http://added.link.com',
      description: 'added description'
    }

    Post.create.mockImplementation(postToAdd => {
      const errMsg = 'Error: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed'
      const error = new Error(errMsg)
      error.name = 'SequelizeForeignKeyConstraintError'
      return Promise.reject(error)
    })

    return addPost(newPost, authorId)
      .catch(err => {
        expect(err.message).toMatch('Author id does not exist')
      })
  })
})
