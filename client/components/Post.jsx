import React from 'react'

const Post = props => {
  return (
    <li data-testid="post">{props.name}</li>
  )
}

export default Post
