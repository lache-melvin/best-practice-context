exports.seed = (knex) => {
  const empty = table =>
    () => knex(table).del()

  return empty('posts')()
  // Chain calls to empty in
  // order as required, e.g.:
  // .then(empty('profiles'))
}
