const path = require("path");
const express = require("express");
const createError = require("http-errors");
const { getTokenDecoder: auth } = require("authenticare/server");

require("dotenv").config({ path: path.join(__dirname, ".env") });
const { getEntries, getEntryById, postEntry } = require("./controllers");
const makeExpressRoute = require("./makeExpressRoute");
const authRoutes = require("./routes/auth");

const server = express();
const apiRoot = "/api/v1";
const port = process.env.PORT || 3000;

module.exports = server;

server.use(express.static(path.join(__dirname, "public")));

// This is just temporary until authenticare supports controllers
server.use("/api/v1", authRoutes);

server.get(`${apiRoot}/entries`, makeExpressRoute(getEntries));
server.get(`${apiRoot}/entries/:id`, makeExpressRoute(getEntryById));
server.post(`${apiRoot}/entries`, auth(), makeExpressRoute(postEntry));

// catch 404 and forward to error handler
server.use((req, res, next) => {
  next(createError(404));
});

// error handler (needs the `next` arg)
// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  if (err.status === 404) {
    return res.status(404).sendFile(path.join(__dirname, "public/404.html"));
  }

  // otherwise
  res.sendStatus(err.status || 500);
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
