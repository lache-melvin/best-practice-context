exports.up = (knex) => {
  return knex.schema.createTable('posts', table => {
    table.increments().primary()
    table.string('name')
    table.string('link')
    table.string('description')
    table.integer('created')
    table.integer('updated')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('posts')
}
