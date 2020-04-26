import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import '@babel/polyfill'

import Post from './Post'

test('<Post> includes name in <li>', async () => {
  const testName = "test name"
  render(<Post name={testName} />)
  const post = await screen.findByText(testName)
  expect(post).toBeInTheDocument()
  expect(post).toMatchSnapshot()
})
