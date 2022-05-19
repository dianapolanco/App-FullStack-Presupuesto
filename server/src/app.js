var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session')
const store = new session.MemoryStore();
var logger = require('morgan');
const cors = require('cors');


var appRouter = require('./routes/appRouter');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: "some secret",
  cookie: {secure: false},
  saveUninitialized: false,
  resave: false,
  store: store
}))

app.use(cors())


app.use('/api/data', appRouter);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
