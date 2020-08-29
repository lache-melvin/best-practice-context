import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchPostById } from "../actions/posts";

function PostDetail(props) {
  useEffect(() => {
    const { post, match, fetchPostById } = props;
    if (!post && match && match.params) {
      fetchPostById(Number(match.params.id));
    }
  });

  const { post = {} } = props;
  return (
    <div data-testid="post">
      <h2>{post.name}</h2>
      <a href={post.link}>{post.link}</a>
      <p>{post.description}</p>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  const id = Number(ownProps.match.params.id);
  const fromState = state.post && state.post.id === id ? state.post : null;
  const fromList = state.posts.find((post) => post.id === id);
  return {
    post: fromState || fromList,
  };
}

const mapDispatchToProps = { fetchPostById };

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
