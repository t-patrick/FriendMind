
const express = require('express');

const router = express.Router() 

const upload = require('./image-config');

const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const test = require('./model/testingfile')

router.get('/image', async (req, res) => {
  // const friend = await test.getFriend(req.query.id);
  const url = path.join(__dirname, '/imagestore/', 'user1img.jpg')
  console.log(url)
  res.sendFile(url);
});

router.get('/hello', async (req,res) => {
  res.status(200).send({hello: 'hello'});
})


router.post('/sendimage', upload.single('image'), (req, res) => {
  console.log('got to here')

  res.status(201).send({"message": "hello"})
});


module.exports = router;