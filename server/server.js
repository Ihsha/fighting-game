const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const path = require('path');

const { GameCollection } = require('./games.js');
const games = new GameCollection();

// Serve game client files
app.use(express.static(path.join(__dirname, '../docs')));

const PORT = process.env.PORT || 55555;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Responses = {
  SUCCESS: 0,
  GAME_EXISTS: 1,
  GAME_NOT_EXISTS: 2,
  GAME_FULL: 3
};

const Requests = {
  CREATE_GAME: 'create-game',
  JOIN_GAME: 'join-game'
};

io.on('connection', (socket) => {
  socket.on(Requests.CREATE_GAME, (gameName) => {
    if (games.createGame(gameName)) {
      games.getGame(gameName).addPlayer(socket);
      socket.emit('response', Responses.SUCCESS);
    } else {
      socket.emit('response', Responses.GAME_EXISTS);
    }
  });

  socket.on(Requests.JOIN_GAME, (gameName) => {
    const game = games.getGame(gameName);
    if (!game) {
      socket.emit('response', Responses.GAME_NOT_EXISTS);
    } else {
      if (game.addPlayer(socket)) {
        socket.emit('response', Responses.SUCCESS);
      } else {
        socket.emit('response', Responses.GAME_FULL);
      }
    }
  });
});
