import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderWithRedux } from '../testing/utils'
import '@testing-library/jest-dom/extend-expect'
import '@babel/polyfill'

import PostDetail from './PostDetail'
import mockPosts from '../testing/mockPosts'

test('<PostDetail> includes name in <li>', async () => {
  const initialState = {
    posts: mockPosts
  }
  const initialEntries = ['/post/2']
  renderWithRedux(
    <PostDetail match={{params: { id: 2 }}}/>,
    {initialState, initialEntries}
  )
  const post = await screen.findByText('mocked post 2')
  expect(post).toBeInTheDocument()
  expect(post).toMatchSnapshot()
})
