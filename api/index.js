require("@babel/register")({
  presets: ["@babel/preset-env"]
});
require('dotenv').config();

const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const express = require('express');
const auth = require('json-server-auth')
const serverError = require('./src/response')

const server = express();

const router = jsonServer.router('db.json');

const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

let upload = require('./multer.config.js');
const { uploadImage } = require('./src/controllers/image-upload');
const { login, register, profile, linkedinLogin } = require('./src/controllers/users-actions');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "*")
  next();
});

server.post('/login', login);

server.post('/users', register);

server.post('/image-upload', upload.single('upload'), uploadImage);

server.get('/profile', auth, profile);

server.post('/linkedin', linkedinLogin);

server.db = router.db

server.use((err, req, res, next) => serverError(res, err))
server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(port);