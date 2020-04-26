const now = new Date()

exports.seed = (knex) => {
  // Inserts seed entries
  return knex('posts').insert([
    {
      id: 1,
      name: 'post 1',
      author_id: 1,
      link: 'https://link.com/1',
      description: 'description 1',
      created: now.setDate(now.getDate()-2),
      updated: now.setDate(now.getDate()-2)
    }, {
      id: 2,
      author_id: 2,
      name: 'post 2',
      link: 'https://link.com/2',
      description: 'description 2',
      created: now.setDate(now.getDate()-1),
      updated: now.setDate(now.getDate()-1)
    }, {
      id: 3,
      author_id: 2,
      name: 'post 3',
      link: 'https://link.com/3',
      description: 'description 3',
      created: now.valueOf(),
      updated: now.valueOf()
    }
  ])
}
