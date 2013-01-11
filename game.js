(function(w) {

	// The Game Class
	var TicTacToe = function() {
		// Private
		var _currentPlayer,
			_players,
			_setCurrentPlayer = function () {

				_currentPlayer = !_currentPlayer ? 1 : _currentPlayer === 1 ? 0 : 1;

				var player = _players[_currentPlayer];
				tictactoe.player = player;
				console.log("%s's Turn:\n", player.name);
				if (player.name === 'Computer') {
					// pass the player computer as an argument
					player.aiSelect();
				} else {
					console.log("Please select a block...\n");
				}

			},
			_checkWin = function(player) {
				if (player.isWin()) {
					console.log(player.name + " WON!!! \nRestarting game...\n");
					tictactoe.start();
				}
				else {
					_setCurrentPlayer();
				}
			};

		// Public
		
		this.player = null;
		this.board = [];

		this.start = function() {

			_players = [];
			_currentPlayer = 0;
			this.board = [
				[0,0,0],
				[0,0,0],
				[0,0,0]
			];

			_players.push(new Player("Player1"));
			console.log("Player1 added.\n");
			_players.push(new Player("Computer"));
			console.log("Computer added.\n");

			// Add select listeners
			for (var i = _players.length - 1; i >= 0; i--) {
				_players[i].on('select', _checkWin);
			}

			// Initialize player
			_setCurrentPlayer();

		},
		tictactoe = this; // point tictactoe to this for private methods
	};

	// The player class
	var Player = function(name) {
		// Private prop
		var events = {
				'select' : {
					cbs : []
				},
				'won' : {
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
			if (tictactoe.board[x][y] !== 1) {
				tictactoe.board[x][y] = 1;
				this.board[x][y] = 1;
				console.log("%s  selected [%d][%d] block", this.name, x, y);
				emitEvent('select');
			} else {
				console.log("Warning: Block Taken!\n Please select another block");
			}
		};
		this.aiSelect = function() {

			var x = _getRandomNumber(2),
				y = _getRandomNumber(2);

			if (tictactoe.board[x][y] !== 1) {
				tictactoe.board[x][y] = 1;
				this.board[x][y] = 1;
				console.log("%s  selected [%d][%d] block", this.name, x, y);
				emitEvent('select');
			} else {
				setTimeout(this.aiSelect(), 2000);
			}
		};
		this.isWin = function() {
			if (this.board[0][0] === 1 && this.board[0][1] === 1 && this.board[0][2] === 1) {
				return true;
			}
			if (this.board[1][0] === 1 && this.board[1][1] === 1 && this.board[1][2] === 1) {
				return true;
			}
			if (this.board[2][0] === 1 && this.board[2][1] === 1 && this.board[2][2] === 1) {
				return true;
			}
			if (this.board[0][0] === 1 && this.board[1][0] === 1 && this.board[2][0] === 1) {
				return true;
			}
			if (this.board[1][0] === 1 && this.board[1][1] === 1 && this.board[2][1] === 1) {
				return true;
			}
			if (this.board[0][2] === 1 && this.board[1][2] === 1 && this.board[2][2] === 1) {
				return true;
			}
			if (this.board[0][0] === 1 && this.board[1][1] === 1 && this.board[2][2] === 1) {
				return true;
			}
			if (this.board[0][2] === 1 && this.board[1][1] === 1 && this.board[2][0] === 1) {
				return true;
			}
			return false;
		};
	};

	w.onload = function(e) {
		if (document.readyState === "complete") {
			init();
		}
	};

	function init() {
		console.log("-!- Game is starting \n-!- Prepare yourself!");
		tictactoe = new TicTacToe();
		tictactoe.start();
	}

	function _getRandomNumber(range) {
		if (!range) {
			return Math.round(Math.random());
		}
		return Math.round(Math.random() * range);
	}

})(window);