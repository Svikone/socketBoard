const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
require('dotenv').config()
require('./sockets/socket.js')(io);
const jwt = require('jsonwebtoken');

io.use((socket, next) => {
  const json_token = socket.handshake.query.token;
  if (json_token) {
    jwt.verify(json_token, process.env.SECRETKEY, (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;

      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json ({
	extended: true,
	limit: "50mb"
}));
app.use('/api/user', require('./routes/user'));
app.use('/api/board', require('./routes/board'));

const port = process.env.PORT || 9000;
async function start() {
  try {
    const url = process.env.DB_URL;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      console.log('Database is worked');
    } catch (e) {
      console.log('Database disconnect');
      process.exit(1);
    }

    server.listen(port, () => {
      console.log(`server started ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();