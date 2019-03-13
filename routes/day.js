var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/day', function(req, res, next) {
  res.send('day route');
});

module.exports = router;
