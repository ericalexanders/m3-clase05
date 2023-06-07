const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require("express-session");
const cors = require("cors")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products')

const app = express();
app.use(cors())

const unDia = 1000 * 60 * 60 * 24;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  secret: "1q2w3e4r",
  saveUninitialized: true,
  cookie: { maxAge: unDia },
  resave: false
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function middleware(req, res, next) {
  const header = req.headers
  console.log("Header: ", header)
  if (header.authorization === 'Bearer Eric') {
    next()
  } else {
    throw createError.Unauthorized("No tiene permisos")
  }
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
