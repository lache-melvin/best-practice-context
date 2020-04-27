require('dotenv').config()
const request = require('supertest')

const server = require('../server')

jest.mock('../db/posts.js')
jest.mock('../db/users.js')

test('GET /api/v1/posts returns posts', () => {
  return request(server)
    .get('/api/v1/posts')
    .then(res => {
      expect(res.body).toHaveLength(3)
      expect(res.body[0].name).toMatch('mocked')
      expect(res.body[1].link).toMatch('mocked')
      expect(res.body[2].description).toMatch('mocked')
    })
})

test('GET /api/v1/posts/2 returns a post', () => {
  return request(server)
    .get('/api/v1/posts/2')
    .then(res => {
      const {name, link, description} = res.body
      expect(name).toMatch('mocked')
      expect(link).toMatch('mocked')
      expect(description).toMatch('mocked')
    })
})

test('POST /api/v1/posts adds and returns a post', () => {
  const newPost = {
    authorId: 2,
    name: 'new post',
    link: 'http://should.work.com',
    description: 'new description',
  }

  return getTestToken(server).then(token => {
    return request(server)
      .post('/api/v1/posts')
      .send(newPost)
      .set('Authorization', `BEARER ${token}`)
      .then(res => {
        const {name, link, description} = res.body
        expect(name).toMatch(newPost.name)
        expect(link).toMatch(newPost.link)
        expect(description).toMatch(newPost.description)
      })
  })
})

test('POST /api/v1/posts fails with no auth token', () => {
  const newPost = {
    authorId: 2,
    name: 'new unauthenticated post',
    link: 'http://should.not.work',
    description: 'should not work anyway',
  }

  return request(server)
    .post('/api/v1/posts')
    .send(newPost)
    .expect(401) // unauthorized
    .then(res => res)
})

function getTestToken (srv) {
  return request(srv)
    .post('/api/v1/auth/register')
    .send({username: 'test', password: 'test'})
    .then(res => res.body.token)
}
