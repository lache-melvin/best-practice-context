import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom'
import '@babel/polyfill'

import AddPost from './AddPost'

test('<AddPost> includes name in <li>', async () => {
  renderWithRedux(<AddPost />)
  const post = await screen.findByTestId('addpost')
  expect(post).toBeInTheDocument()
  expect(post).toMatchSnapshot()
})
