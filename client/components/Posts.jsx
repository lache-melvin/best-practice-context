import React from 'react'
import { connect } from 'react-redux'

import { fetchPosts } from '../actions/posts'

class Posts extends React.Component {
  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {
    const {posts} = this.props
    return (
      <>
        <div>Posts</div>
        {
          posts.map(post =>
            <li key={post.id}>
              {post.name}
            </li>
          )
        }
      </>
    )
  }
}

function mapStateToProps (state) {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = {
  fetchPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
