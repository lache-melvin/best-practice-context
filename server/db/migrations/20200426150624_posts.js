exports.up = (knex) => {
  return knex.schema.createTable('posts', table => {
    table.increments().primary()
    table.string('name')
    table.string('link')
    table.string('description')
    table.integer('author_id').references('users.id')
    table.datetime('created').defaultTo(knex.fn.now())
    table.datetime('updated').defaultTo(knex.fn.now())
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('posts')
}
