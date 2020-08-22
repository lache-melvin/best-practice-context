import { getPosts, getPostById, addPost } from "../api";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts: posts,
  };
}

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post: post,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return getPosts()
      .then((posts) => {
        dispatch(receivePosts(posts));
        return posts;
      })
      .catch((err) => {
        console.error("fetchPosts action error:", err);
        throw err;
      });
  };
}

export function fetchPostById(id) {
  return (dispatch) => {
    return getPostById(id)
      .then((post) => {
        dispatch(receivePost(post));
        return post;
      })
      .catch((err) => {
        console.error("fetchPostById action error:", err);
        throw err;
      });
  };
}

export function savePost(post) {
  return (dispatch) => {
    return addPost(post)
      .then((added) => {
        dispatch(receivePost(added));
        return added;
      })
      .catch((err) => {
        console.error("savePost action error:", err);
        throw err;
      });
  };
}
