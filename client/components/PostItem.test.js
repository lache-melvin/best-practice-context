import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom/extend-expect'
import '@babel/polyfill'

import PostItem from './PostItem'
import mockPosts from '../testing/mockPosts'

test('<PostItem> includes name in <li>', async () => {
  renderWithRedux(<PostItem post={mockPosts[0]}/>)
  const post = await screen.findByText('mocked post 1')
  expect(post).toBeInTheDocument()
  expect(post).toMatchSnapshot()
})
