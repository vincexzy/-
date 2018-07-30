var express = require('express');
var router = express.Router();
var fs = require("fs");

var users = {};
var txt = {};
router.get('/',function (req,res,next) {
  res.locals.user = req.session.user || "";
  console.log(req.session.user);
  console.log(users);
  res.render("chat");
});

router.get('/login',function (req,res,next) {
  console.log("get login");
  res.locals.msg ="";
  res.render('login');

});
router.post('/login',function (req,res,next) {
  const{
    loginname,
    password
  } = req.body;
  if (loginname && password && password === users[loginname].password) {
    req.session.user = users[loginname];
    console.log(req.session.user);
    res.locals.msg = "ok";
    res.render('login');
  }else {
    res.locals.msg = "no";
    res.render('login');
  }
});


router.get('/reg',function (req,res,next) {
  req.session.firstnum=res.locals.firstnum = Math.round(Math.random()*10);
  req.session.secondnum=res.locals.secondnum = Math.round(Math.random()*10);
  res.locals.msg = "";
  res.render('reg');
});
router.post('/reg',function (req,res,next) {
  const {
    loginname,
    password,
    confirm,
    vnum,
  } = req.body;
  // console.log(loginname,password,confirm);

  if(!users[loginname] && loginname&&password&&confirm&&password===confirm ){
    users[loginname] = {
      loginname,
      password
    };
    res.locals.msg = "ok";
    res.locals.firstnum = Math.round(Math.random()*10);
    res.locals.secondnum = Math.round(Math.random()*10);
    res.render('reg');
  }else{
    res.locals.msg = "no";
    res.locals.firstnum = Math.round(Math.random()*10);
    res.locals.secondnum = Math.round(Math.random()*10);
    res.render('reg');
  }
});

router.get('/logout',function (req,res) {
  req.session.user = undefined;
  res.redirect('back');
});


// router.post('/up',function (req,res,next) {
//   const word = req.body.word;
//   const
//   const obj = {}
//   txt.push()
// });

module.exports = router;
