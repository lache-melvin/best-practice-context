const now = new Date()

export default [
  {
    id: 1,
    name: 'mocked post 1',
    link: 'https://mocked.link.com/1',
    description: 'mocked description 1',
    created: now.setDate(now.getDate()-2),
    updated: now.setDate(now.getDate()-2)
  }, {
    id: 2,
    name: 'mocked post 2',
    link: 'https://mocked.link.com/2',
    description: 'mocked description 2',
    created: now.setDate(now.getDate()-1),
    updated: now.setDate(now.getDate()-1)
  }, {
    id: 3,
    name: 'mocked post 3',
    link: 'https://mocked.link.com/3',
    description: 'mocked description 3',
    created: now.valueOf(),
    updated: now.valueOf()
  }
]
