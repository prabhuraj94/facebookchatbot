var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/webhook/', function(req, res) {
if (req.query['hub.verify_token'] === "facebookdemoechatbot") {
res.send(req.query['hub.challenge'])
}
res.send('Error, no entry')
});

module.exports = router;
