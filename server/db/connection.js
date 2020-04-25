const knex = require('knex')

const config = require('./knexfile')

const nodeEnv = process.env.NODE_ENV || 'development'

module.exports = (env = nodeEnv) => {
  return knex(config[env])
}
