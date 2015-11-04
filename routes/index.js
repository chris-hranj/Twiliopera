var config = require('../config');
var path = require('path');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mg = require('../midigen');

//require the Twilio module and create a REST client
var twilioClient = require('twilio')(config.accountSid, config.authToken);

var digits;
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// Handle an AJAX POST request to place an outbound call
var instrument;
router.post('/call', function(req, res) {
    // Place an outbound call to the user, using the TwiML instructions
    // from the /outbound route
    instrument = req.body.instrument;

    twilioClient.makeCall({
        to: "+1" + req.body.phoneNumber,
        from: config.twilioNumber,
        applicationSid: config.applicationSid
    }, function(err, message) {
        if (err) {
        	console.log(err);
            res.status(500).send(err);
        } else {
            res.send({
                message: 'You will receive a phone call shortly, Beethoven.'
            });
        }
    });
});

// Return TwiML instuctions for the outbound call
router.post('/outbound', function(req, res) {
    res.set({
        'Content-Type':'text/xml'
    });
    res.sendFile(path.resolve(__dirname + '/../views/outbound.xml'));
});

//response ends so that Twilio does not receive a response and crash 
router.post('/song', function(req, res) {
    digits = req.body.Digits; //IT WORKS
    mg(req.body.Digits, instrument, function(err){
        if (err) console.log(err);
    })
    res.end();
});

router.get('/song', function(req, res) {

    res.render('play', {Digits: digits}); 
});

module.exports = router;
