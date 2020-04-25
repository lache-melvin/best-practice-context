const request = require('supertest')

const server = require('../server')

jest.mock('../db/posts.js')

test('GET /api/v1/posts returns posts', () => {
  request(server)
    .get('/api/v1/posts')
    .then(res => {
      expect(res.body).toHaveLength(3)
      expect(res.body[0].name).toMatch('mocked')
      expect(res.body[1].link).toMatch('mocked')
      expect(res.body[2].description).toMatch('mocked')
    })
})
