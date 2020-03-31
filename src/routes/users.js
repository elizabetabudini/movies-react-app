var express = require('express');
var router = express.Router();
const request = require('request');
const https = require('https');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
