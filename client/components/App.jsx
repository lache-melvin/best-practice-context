import React from 'react'
import { Route } from 'react-router-dom'

import Nav from './Nav'
import Posts from './Posts'
import AddPost from './AddPost'
import PostDetail from './PostDetail'
import Register from './Register'
import SignIn from './SignIn'

function App () {
  return (
    <>
      <Route path="/" component={Nav} />
      <h1>Best Practice</h1>
      <Route exact path="/" component={Posts} />
      <Route path="/add" component={AddPost} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
      <Route path="/post/:id" component={PostDetail} />
    </>
  )
}

export default App
