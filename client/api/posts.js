// TODO: Make error logging more robust
// Perhaps by passing a logger into each of these functions

export function makeGetPosts(consume) {
  return async function () {
    try {
      const posts = await consume("/posts");
      return posts;
    } catch (err) {
      console.error(err);
    }
  };
}

export function makeGetPostById(consume) {
  return async function (id) {
    try {
      const post = await consume(`/posts/${id}`);
      return post;
    } catch (err) {
      console.error(err);
    }
  };
}

export function makeAddPost(consume, getAuthHeader) {
  return async function (post) {
    const authHeader = getAuthHeader();
    const bearerToken = authHeader && authHeader.Authorization;
    const config = {
      data: post,
      method: "post",
      token: bearerToken || "",
    };

    try {
      const newPost = await consume("/posts", config);
      return newPost;
    } catch (err) {
      console.error(err);
    }
  };
}
