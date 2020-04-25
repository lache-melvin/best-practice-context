const express = require('express')

const router = express.Router()

module.exports = router

const now = new Date()

const posts = [
  {
    name: 'post 1',
    link: 'https://link.com/1',
    description: 'description 1',
    created: now.setDate(now.getDate()-2),
    updated: now.setDate(now.getDate()-2)
  }, {
    name: 'post 2',
    link: 'https://link.com/2',
    description: 'description 2',
    created: now.setDate(now.getDate()-1),
    updated: now.setDate(now.getDate()-1)
  }, {
    name: 'post 3',
    link: 'https://link.com/3',
    description: 'description 3',
    created: now.valueOf(),
    updated: now.valueOf()
  }
]

// GET /api/v1/posts
router.get('/', (req, res) => {
  res.json(posts)
})
