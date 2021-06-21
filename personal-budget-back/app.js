/*
Bordón, José Miguel
Personal Budget API Rest
*/

var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const jwt = require('jsonwebtoken')
var usersRouter = require('./routes/usersRouter')
const operationsRouter = require('./routes/operationsRouter')
const cors = require('cors')

var app = express()

app.set('secretKey', 'josebordon')

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//First level routing
app.use('/users', usersRouter)
//You need a valid Jason Web Token to interact with operation routes.
app.use('/operations', validateUser, operationsRouter)

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (
    err,
    decoded,
  ) {
    if (err) {
      res.json({ message: err.message })
    } else {
      console.log(decoded)
      req.body.tokenData = decoded
      next()
    }
  })
}
app.validateUser = validateUser

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = err
  console.log(err)

  // render the error page
  res.status(err.status || 500)
  res.json({ error: true, code: err.code, msg: err.message })
})

module.exports = app
