import React from 'react'
import { connect } from 'react-redux'

import { fetchPostById } from '../actions/posts'

class PostDetail extends React.Component {
  componentDidMount () {
    const {post, match, fetchPostById} = this.props
    if (!post && match && match.params) {
      fetchPostById(Number(match.params.id))
    }
  }

  render () {
    const { post = {} } = this.props
    return (
      <li data-testid="post">{post.name}</li>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const id = Number(ownProps.match.params.id)
  const fromState = state.post && state.post.id === id ? state.post : null
  const fromList = state.posts.find(post => post.id === id)
  return {
    post: fromState || fromList
  }
}

const mapDispatchToProps = { fetchPostById }

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
