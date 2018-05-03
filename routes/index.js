var express = require('express');
var router = express.Router();

const access=process.env.FB_ACCESS_TOKEN;

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

router.post('/webhook', function(req, res) {
  var messaging_events = req.body.entry[0].messaging;
  for (var i = 0; i < messaging_events.length; i++) {
  event = req.body.entry[0].messaging[i];
  var senderID = event.sender.id;
  if (event.message && event.message.text) {
  var messageText = event.message.text;
  console.log("senderID" + senderID + "messageText" + messageText);
  sendTextMessage(senderID, messageText);
  }
  }
  res.sendStatus(200);
  });
  function sendTextMessage(senderID, messageText) {
  var messageData = {
  recipient: {
  id: senderID
  },
  message: {
  text: messageText
  }
  };
  callSendAPI(messageData);
  }
  function callSendAPI(messageData) {
  request({
  uri: 'https://graph.facebook.com/v2.6/me/messages',
  qs: {
  access_token: access
  },
  method: 'POST',
  json: messageData
  }, function(error, response, body) {
  if (!error && response.statusCode == 200) {
  var recipientId = body.recipient_id;
  var messageId = body.message_id;
  console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
  } else {
  console.error("Unable to send message.");
  console.error(response);
  console.error(error);
  }
  });
}


module.exports = router;
