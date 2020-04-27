import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom/extend-expect'
import '@babel/polyfill'

import AddPost from './AddPost'

test('<AddPost> includes name in <li>', async () => {
  const initialEntries = ['/post/2']
  renderWithRedux(<AddPost />)
  const post = await screen.findByTestId('addpost')
  expect(post).toBeInTheDocument()
  expect(post).toMatchSnapshot()
})
