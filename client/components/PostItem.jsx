import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { receivePost } from "../actions/posts";

const PostItem = (props) => {
  const { post, receivePost } = props;
  return (
    <li data-testid="post">
      <Link to={`/post/${post.id}`} onClick={() => receivePost(post)}>
        {post.name}
      </Link>
    </li>
  );
};

const mapDispatchToProps = { receivePost };

export default connect(null, mapDispatchToProps)(PostItem);
