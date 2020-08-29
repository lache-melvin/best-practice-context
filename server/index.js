const path = require("path");
const express = require("express");
const createError = require("http-errors");

require("dotenv").config({ path: path.join(__dirname, ".env") });
const { getPosts, getPostById, addPost } = require("./controllers");
const makeExpressRoute = require("./makeExpressRoute");
const authRoutes = require("./routes/auth");

const server = express();
const apiRoot = "/api/v1";
const port = process.env.PORT || 3000;

module.exports = server;

server.use(express.static(path.join(__dirname, "public")));

// This is just temporary until authenticare supports controllers
server.use("/api/v1", authRoutes);

server.get(`${apiRoot}/posts`, makeExpressRoute(getPosts));
server.get(`${apiRoot}/posts/:id`, makeExpressRoute(getPostById));
server.post(`${apiRoot}/posts`, makeExpressRoute(addPost));

// catch 404 and forward to error handler
server.use((req, res, next) => {
  next(createError(404));
});

// error handler
server.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  if (err.status === 404) {
    return res.sendFile(path.join(__dirname, "public/404.html"));
  }

  // otherwise
  res.sendStatus(err.status || 500);
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
