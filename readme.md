# mk.js - Fighting Game by MR Developers

This is a modern HTML5/JavaScript fighting game developed and maintained by [MR Developers](https://mr-developers.github.io/website).
It has three game modes:
* `Basic` - with one active and one inactive player.
* `Multiplayer` - with two active players on one computer.
* `Network` - with two active players, playing over the network using 6-digit code matchmaking.

Each mode can be easily chosen by picking a `gameType` when specifying the game options.

The `multiplayer` mode can be tested [here](http://mk.mgechev.com/).

The `Network` mode with `Web RTC Data Channel Demo` [here](http://ptpgamedemo.appspot.com).

For the network game you need to install the server:

    cd server
    npm install
    node server.js

The server will be started on port `55555`. Open your browser and go to `http://localhost:55555`. 

If playing on mobile devices, the game will automatically display a fully responsive canvas layout and virtual touchscreen overlay controls.

# Configuration

In this section I'll describe in short how you can configure mk.js.

* `arena` - object which contains different properties for the arena.
    * `arena` - type of the arena. The different arenas are listed at: `mk.arenas.types`
    * `container` - parent container of the canvas which is the actual arena.
* `fighters` - array of two objects which are the two players.
    * `name` - player's name. It's case insensitive string without any special characters and white space.
* ` callbacks` - callbacks which will be invoked when some events happens.
    * `attack`- callback which will be invoked on successful attack
    * `game-end` - callback which will be invoked on game end
    * `player-connected` - callback which will be invoked in `network` game when the second player is connected.
* `game-type` - specifies the game controller which will be used. Possible values are: `network`, `basic` and `multiplayer`.
* `gameName` - used in `network` game.
* `isHost` - used in `network` game, tells the game controller whether the current user have created the game.
* `reset` - a method which reset the game. It clean some references and call the reset methods of lower level components. Calling it will lead to removal of the game canvas.

# License

This software is distributed under the terms of the MIT license. Developed and maintained by [MR Developers](https://mr-developers.github.io/website). See the [LICENSE](LICENSE) file for more information.
