var express = require('express');
var router = express.Router();

var users = [];

router.get('/',function (req,res,next) {
  req.session.user = req.session.user || "";

  res.render("chat");
});

router.get('/login',function (req,res,next) {
  res.render('login');
});

router.get('/reg',function (req,res,next) {
  res.render('reg');
});


module.exports = router;
