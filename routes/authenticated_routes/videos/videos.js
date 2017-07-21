let router = require('express').Router();
let bodyParser = require('body-parser');

router.post('/create-new-video', bodyParser.json(), require('./create-new-video.js'));

router.get('/', function(req, res) {
    res.send("videos");
});

module.exports = router;