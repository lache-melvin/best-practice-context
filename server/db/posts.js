const { Post } = require("./models");

module.exports = {
  getPostById,
  getPosts,
  addPost,
};

function getPosts() {
  return Post.findAll();
}

function getPostById(id) {
  return Post.findByPk(id).then((post) => {
    if (post) return post;
    throw new Error("Post id does not exist");
  });
}

function addPost(post, authorId) {
  const { name, link, description } = post;
  return Post.create({ name, link, description, authorId })
    .then((post) => post)
    .catch((err) => {
      if (err.name === "SequelizeForeignKeyConstraintError") {
        throw new Error("Author id does not exist");
      }
    });
}
