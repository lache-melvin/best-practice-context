import React from 'react'
import { register, isAuthenticated } from 'authenticare/client'

import config from '../config'

class Register extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  handleClick = () => {
    const {username, password} = this.state
    register({ username, password }, {
      baseUrl: config.baseApiUrl
    })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
      })
  }

  render () {
    const {username, password} = this.state
    return (
      <>
        <h2>Register</h2>
        <div>
          <div>Username:</div>
          <input name='username'
            value={username}
            onChange={this.handleChange} />

          <div>Password:</div>
          <input name='password' type='password'
            value={password}
            onChange={this.handleChange} />

          <button type='button' onClick={this.handleClick}>Register</button>
        </div>
      </>
    )
  }
}

export default Register
