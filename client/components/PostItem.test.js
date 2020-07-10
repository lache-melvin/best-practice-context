import React from 'react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'

import PostItem from './PostItem'
import mockPosts from '../testing/mockPosts'

test('<PostItem> includes name in <li>', async () => {
  renderWithRedux(<PostItem post={mockPosts[0]}/>)
  const post = await screen.findByText('mocked post 1')
  expect(post).toBeInTheDocument()
  expect(post).toMatchSnapshot()
})
