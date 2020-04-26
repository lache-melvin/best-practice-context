const express = require('express')
const { getTokenDecoder } = require('authenticare/server')

const db = require('../db/posts')

const router = express.Router()

module.exports = router

// GET /api/v1/posts
router.get('/', (req, res) => {
  db.getPosts()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
      res.sendStatus(500)
    })
})

// GET /api/v1/posts/3
router.get('/:id', (req, res) => {
  db.getPostById(Number(req.params.id))
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
      res.sendStatus(500)
    })
})

// POST /api/v1/posts
router.post('/', getTokenDecoder(), (req, res) => {
  db.addPost(req.body)
    .then(post => {
      res.json(post)
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err)
      res.sendStatus(500)
    })
})
