var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//  session
var session = require("express-session")({
  secret:'password',
  cookie:{maxAge:80000}
});
// socket.io 的 session
var iosession = require("express-socket.io-session")(session);

var app = express();

// app ~ server ~ io(socket.io)
var server =require("http").Server(app);
var io = require('socket.io')(server);
server.listen("3000");


// socket.io 的 session
io.use(iosession);

io.on("connection",function (socket) {

  socket.on("say",data => {
    const num = ++ socket.handshake.session.num;
    socket.handshake.session.save();
    io.emit("newsay",data +"----" +new Date()+"---------"+num);
  });
  socket.on("req",function (data,cb) {
    console.log("jie shou dao qing qiu");
    cb(data);
  });

  console.log("有人敲门了");
  socket.emit("welcome","huan ying ni");
  socket.on("question",data=>console.log(data));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// session 中间件
app.use(session);
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demo',require('./routes/demo'));

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

// module.exports = app;
