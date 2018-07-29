var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
  req.session.num = req.session.num || 0;
  const num = ++req.session.num;
  res.render('demo', { title: 'Express',num : num });
});


module.exports = router;
