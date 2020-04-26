import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostItem from './PostItem'
import { fetchPosts } from '../actions/posts'
import { IfAuthenticated } from './Authenticated'

class Posts extends React.Component {
  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {
    const {posts} = this.props
    return (
      <>
        <h2>Posts</h2>
        <IfAuthenticated>
          <Link to="/add">Add a post</Link>
        </IfAuthenticated>
        <ul>
        {
          posts.map(post => <PostItem key={post.id} post={post} />)
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
