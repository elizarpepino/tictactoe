(function(w) {

	// The Game Class
	var TicTacToe = function() {
		// Private prop
		var _currentPlayer,
			_setCurrentPlayer = function () {
				_currentPlayer = (_currentPlayer === 0)? 1 : 0;
			},
			_computerSelect = function() {
				// This is AI mode baby!
			},
			_checkWin = function(player) {
				if (player.isWin()) {
					console.log(player.name + " WON!!! \nRestarting game...\n");
				}
			};

		// Public prop
		this.players = [];
		this.start = function() {
			this.players.push(new Player("Player1"));
			console.log("Player1 added.\n");
			this.players.push(new Player("Computer"));
			console.log("Computer added.\n");

			// Add select listeners
			for (var i = this.players.length - 1; i >= 0; i--) {
				this.players[i].on('select', _checkWin);
			}

			// Randomly select first player to play.
			_currentPlayer = Math.round(Math.random());

		};
	};

	// The player class
	var Player = function(name) {
		// Private prop
		var events = {
				'select' : {
					cbs : []
				}
			},
			emitEvent = function(type) {
				var cbs = events[type].cbs;
				for (var i = cbs.length - 1; i >= 0; i--) {
					cbs[i](player);
				}
			},
			// Set player variable equals to self/this
			player = this;

		// Player's name defaults to Player
		this.name = name || "Player";
		// Player's main board
		this.board = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];
		// Add event listeners
		this.on = function(type, cb) {
			events[type].cbs.push(cb);
		};
		this.select = function(x, y) {
			if (this.board[x][y] !== 1) {
				this.board[x][y] = 1;
				emitEvent('select');
			}
		};
		this.aiSelect = function(x, y) {
			if (this.board[x][y] !== 1) {
				this.board[x][y] = 1;
				emitEvent('select');
			} else {
				this.aiSelect(x, y);
			}
		};
		this.isWin = function() {
			if (this.board[0][0] === 1 && this.board[0][1] === 1 && this.board[0][2] === 1) {
				console.log(1);
				return true;
			}
			if (this.board[1][0] === 1 && this.board[1][1] === 1 && this.board[1][2] === 1) {
				console.log(2);
				return true;
			}
			if (this.board[2][0] === 1 && this.board[2][1] === 1 && this.board[2][2] === 1) {
				console.log(3);
				return true;
			}
			if (this.board[0][0] === 1 && this.board[1][0] === 1 && this.board[2][0] === 1) {
				console.log(4);
				return true;
			}
			if (this.board[1][0] === 1 && this.board[1][1] === 1 && this.board[2][1] === 1) {
				console.log(5);
				return true;
			}
			if (this.board[0][2] === 1 && this.board[1][2] === 1 && this.board[2][2] === 1) {
				console.log(6);
				return true;
			}
			if (this.board[0][0] === 1 && this.board[1][1] === 1 && this.board[2][2] === 1) {
				console.log(7);
				return true;
			}
			if (this.board[0][2] === 1 && this.board[1][1] === 1 && this.board[2][0] === 1) {
				console.log(8);
				return true;
			}
			console.log("not win!");
			return false;
		};
	};

	function init() {
		console.log("-!- Game is starting \n-!- Prepare yourself!");
		w.tictactoe = new TicTacToe();
	}

	w.onload = function(e) {
		if (document.readyState === "complete") {
			init();
		}
	};

})(window);