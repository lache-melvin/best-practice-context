import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom/extend-expect'
import '@babel/polyfill'

import Posts from './Posts'
import mockPosts from '../testing/mockPosts'

jest.mock('../api')

test('<Posts> shows posts from API', async () => {
  renderWithRedux(<Posts />, { initialState: { posts: mockPosts } })
  const posts = await screen.findAllByTestId('post')
  expect(posts).toHaveLength(3)
  expect(posts[1]).not.toHaveTextContent('1')
  expect(posts[1]).toHaveTextContent('2')
  expect(posts[1]).not.toHaveTextContent('3')
})
