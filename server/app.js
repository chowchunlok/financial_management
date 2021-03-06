var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var loginRouter = require('./routes/login')
var registerRouter = require('./routes/register')
var usersRouter = require('./routes/user')
var articleRouter = require('./routes/article')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//开发静态资源
app.use(express.static(path.join(__dirname, 'public')))

// routes path
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/user', usersRouter)
app.use('/article', articleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
