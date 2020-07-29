const now = new Date()
const dates = { createdAt: now, updatedAt: now }

exports.up = queryInterface => {
  return queryInterface.bulkInsert('posts', [
    Object.assign({
      id: 1,
      authorId: 1,
      name: 'post 1',
      link: 'https://link.com/1',
      description: 'description 1'
    }, dates),
    Object.assign({
      id: 2,
      authorId: 2,
      name: 'post 2',
      link: 'https://link.com/2',
      description: 'description 2'
    }, dates),
    Object.assign({
      id: 3,
      authorId: 2,
      name: 'post 3',
      link: 'https://link.com/3',
      description: 'description 3'
    }, dates)
  ])
}

exports.down = queryInterface => queryInterface.bulkDelete('posts')
