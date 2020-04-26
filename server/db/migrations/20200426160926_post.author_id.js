exports.up = knex => {
  return knex.schema.table('posts', table => {
    table.integer('author_id').references('users.id')
  })
}

exports.down = knex => {
  return knex.schema.table('posts', table => {
    table.dropColumn('author_id')
  })
}
