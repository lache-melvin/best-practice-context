import React from 'react'
import { connect } from 'react-redux'

import Post from './Post'
import { fetchPosts } from '../actions/posts'

class Posts extends React.Component {
  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {
    const {posts} = this.props
    return (
      <>
        <h2>Posts</h2>
        <ul>
        {
          posts.map(post => <Post key={post.id} {...post} />)
        }
        </ul>
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
