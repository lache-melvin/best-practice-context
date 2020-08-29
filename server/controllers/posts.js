const express = require("express");
const { getTokenDecoder } = require("authenticare/server");

const { getPosts, getPostById, addPost } = require("../db/posts");

const router = express.Router();

module.exports = router;

// GET /api/v1/posts
router.get("/", (req, res) => {
  getPosts()
    .then((posts) => {
      res.json(posts);
      return null;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.sendStatus(500);
    });
});

// GET /api/v1/posts/3
router.get("/:id", (req, res) => {
  getPostById(Number(req.params.id))
    .then((post) => {
      if (!post) {
        return res.status(404).json({
          errors: [{ title: "Post id not found" }],
        });
      }
      res.json(post);
      return null;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.sendStatus(500);
    });
});

// ENTRY /api/v1/posts
router.post("/", getTokenDecoder(), (req, res) => {
  const { name, link, description } = req.body;
  const newPost = { name, link, description };

  // TODO: This is a hack to create consistency between runtime
  // behaviour and the unit test runs. This needs investigation.
  const { id, dataValues } = req.user;
  const authorId = id || dataValues.id;

  addPost(newPost, authorId)
    .then((post) => {
      res.json(post);
      return null;
    })
    .catch((err) => {
      // TODO: Add proper logging infrastructure
      // console.error(err) // to keep the test run clean
      const unknownAuthorId = "Author id does not exist";
      if (err.message === unknownAuthorId) {
        return res.status(400).json({
          errors: [
            {
              title: unknownAuthorId,
            },
          ],
        });
      }
      res.sendStatus(500);
    });
});
