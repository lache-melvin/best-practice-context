const path = require('path')
const express = require('express')
const createError = require('http-errors')

const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')

const server = express()

module.exports = server

server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1', authRoutes)
server.use('/api/v1/posts', postRoutes)

// catch 404 and forward to error handler
server.use((req, res, next) => {
  next(createError(404))
})

// error handler
server.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  if (err.status === 404) {
    return res.sendFile(path.join(__dirname, 'public/404.html'))
  }

  // otherwise
  res.sendStatus(err.status || 500)
})
