var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/challenge', function(req, res, next) {
  res.send('Challenge route');
});

module.exports = router;
