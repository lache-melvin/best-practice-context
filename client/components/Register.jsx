import React from 'react'
import { connect } from 'react-redux'
import { register, isAuthenticated } from 'authenticare/client'

import { signedIn } from '../actions/auth'

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
      .then(token => {
        if (isAuthenticated()) {
          this.props.signedIn(token)
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

const mapDispatchToProps = { signedIn }

export default connect(null, mapDispatchToProps)(Register)
