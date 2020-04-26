import React from 'react'
import { Route } from 'react-router-dom'

import Nav from './Nav'
import Posts from './Posts'
import SignIn from './SignIn'
import Register from './Register'

function App () {
  return (
    <>
      <Route path="/" component={Nav} />
      <h1>Best Practice</h1>
      <Route exact path="/" component={Posts} />
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
    </>
  )
}

export default App
