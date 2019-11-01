const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const express = require('express');
const auth = require('json-server-auth')
const jwt = require('jsonwebtoken')
const server = express(); //jsonServer.create();
const router = jsonServer.router('db.json');

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const AWS = require('aws-sdk');
const uuid = require('node-uuid');

var config = require('./config');
let upload = require('./multer.config.js');

const s3 = new AWS.S3({ accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region });

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.post('/image-upload', upload.single('upload'), (req, res) => {

  var key = uuid() + req.file.originalname;

  s3.upload({
    Bucket: config.bucket,
    Body: req.file.buffer,
    Key: key
  }, async (err, data) => {
    if (err) {
      res.status(500).json({ uploaded: false, error: { message: err } });
    }
    const url = await s3.getSignedUrl("getObject", {
      Bucket: config.bucket,
      Key: key
    });
    res.json({ fileName: key, uploaded: true, url: url })
  });
});

async function getPresignedUploadUrl(bucket, directory) {
  const key = `${directory}/${uuid.v4()}`;
  const url = await s3
    .getSignedUrl('putObject', {
      Bucket: bucket,
      Key: key,
      ContentType: 'image/*',
      Expires: 300,
    })
    .promise();
  return url;
}

//server.db = router.db
//server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(port);