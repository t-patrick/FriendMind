
const express = require('express');

const router = express.Router();

const upload = require('./image-config');

const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const test = require('./model/testingfile');
const { addFriend, addCommPreferences, getFriends, getFriend } = require('./model/FriendController');
const { addFriendNote, getFriendNotes } = require('./model/FriendNoteController');
const { addCommunication, getCommunication, postMeeting, getMeetings, populateReminisce } = require('./model/CommsController');

router.get('/image', async (req, res) => {
  // const friend = await test.getFriend(req.query.id);
  const url = path.join(__dirname, '/imagestore/', 'user1img.jpg')
  console.log(url)
  res.sendFile(url);
});

router.get('/hello', async (req,res) => {
  res.status(200).send({hello: 'hello'});
})

router.post('/friend', addFriend);
router.get('/friend', getFriend)

router.get('/friends', getFriends);

router.post('/friendnote', addFriendNote);
router.get('/friendnote', getFriendNotes);

router.post('/communication', addCommunication);
router.get('/communication', getCommunication);

router.post('/meeting', postMeeting)
router.get('/meetings', getMeetings)

router.get('/reminisce', populateReminisce)


router.post('/sendimage', upload.single('image'), (req, res) => {
  console.log('got to here')
  console.log(req.file);
  res.status(201).send({"message": "hello"})
});


module.exports = router;  