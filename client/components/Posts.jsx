import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PostItem from "./PostItem";
import { fetchPosts } from "../actions/posts";
import { IfAuthenticated } from "./Authenticated";

function Posts(props) {
  // useEffect will perpetually fetch and rerender
  // unless it can monitor state here...
  const [postData] = useState([]);
  useEffect(() => {
    props.fetchPosts();
  }, [postData]);

  const { posts } = props;

  return (
    <>
      <h2>Posts</h2>
      <IfAuthenticated>
        <Link to="/add">Add a post</Link>
      </IfAuthenticated>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
