import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { savePost } from '../actions/posts'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

class AddPost extends React.Component {
  state = {
    name: '',
    link: ''
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleAdd = e => {
    this.props.savePost({
      authorId: this.props.userId,
      ...this.state
    }).then(saved => {
      this.props.history.push(`/post/${saved.id}`)
    })
  }

  render () {
    const { name, link } = this.state
    return (
      <>
        <h2>Add New Post</h2>
        <IfAuthenticated>
          <div>
            <div>Name:</div>
            <input name='name' value={name}
              onChange={this.handleChange} />

            <div>Link:</div>
            <input name='link' value={link}
              onChange={this.handleChange} />

            <button type='button' onClick={this.handleAdd}>Add this post</button>
          </div>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <div>You must <Link to="/signin">sign in</Link> to add new posts.</div>
        </IfNotAuthenticated>
      </>
    )
  }
}

function mapStateToProps (state) {
  return { userId: state.user.id }
}

const mapDispatchToProps = { savePost }

export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
