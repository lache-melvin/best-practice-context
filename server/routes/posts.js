const express = require('express')

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
