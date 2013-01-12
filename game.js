/** Copyright (c) 2013 Elizar Pepino
* @author Elizar Pepino
* @website http://penzur.com | http://elizarpepino.com
* @version 0.0.1
* @description  This is a basic tic tac toe game based on javascript
*               nothing fancy. I built this while I was trying to teach my cousin
*               some basic javascript.
*/
(function(w) {

    /** The Game Class
    * @params:
    */
    var TicTacToe = function() {
        /** Private variables
        */
        var _currentPlayer,
        _tictactoe = this,
        _players,

        /** Fires after _checkWin() if player.isWin() returns false
        * @property private
        * @params:
        */
        _setCurrentPlayer = function() {
            
            tictactoe.player = _players[0];
            _currentPlayer = !_currentPlayer ? 1 : _currentPlayer === 1 ? 0 : 1;
            var player = _players[_currentPlayer];
            player.select();
        
        },

        /** Fires when a user emmits a "select" event then checks to see if player wins.
        * @property private
        * @params:
        * <Player> player - An instance of a Player class
        */
        _checkWin = function(player) {
            if (player.isWin()) {
                console.log(player.getName() + " WON!!! Restarting game...");
                tictactoe.start();
            }
            else {
                _setCurrentPlayer();
            }
        };

        /** Public variables
        */
        this.player = null;
        this.board = [];
        
        /** Start/restart Game
        * @property public
        * @params:
        */
        this.start = function() {
            // set/re-set everything
            _players = [];
            _currentPlayer = 0;
            this.board = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ];
            console.log("-!- Game is starting\n-!- Prepare yourself!");
            
            // Add new players
            _players.push(new Player({name: "Elizar", type: "player"}));
            console.log("-!- Player Elizar joined the Game.");
            _players.push(new Player({name: "Computer", type:"ai"}));
            console.log("-!- Player Computer joined the game.");

            // Add listeners to players' "select" event
            for (var i = _players.length - 1; i >= 0; i--) {
                _players[i].on('select', _checkWin);
            }

            // Set the first player to select, defaults to Computer
            _setCurrentPlayer();
        
        };
    };

    /** The Player class
    * @params:
    * <Object> p - An object for setting player's attributes
    *              Accepted datas are:
    *              name - <String> Player's name defaults to "Player"
    *              type - <String> Player type, should be either of the following:
    *                              "ai", "player" (defaults to "ai")
    */
    var Player = function(p) {

        /** Private variables
        */
        var _events = {
            'select': {
                callbacks: []
            }
        },
        _p = p || {},
        _type = _p.type || "ai",
        _name = _p.name || "Player",
        _player = this, // Will be use as an accessor to this prototype inside private methods.
        _board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        
        /** Works as EventEmitter and passes the player that's emmiting the event to the call_back function
        * @property private
        * @params: <String> type - The type of event that will be emmited
        */
        _emitEvent = function(type) {
            var delegates = _events[type].callbacks;
            for (var i = delegates.length - 1; i >= 0; i--) {
                delegates[i](_player);
            }
        },

        /** Method that checks if block is free or already selected
        * @property private
        * @params:
        * <Number> x - The horizontal position of the block
        *          y - The vertical position of the block
        * @returns:
        * <Boolean> true - If block is free,
        *           false - If block is already taken
        */
        _isBlockFree = function(x, y) {
            if (tictactoe.board[x][y] !== 1) {
                return true;
            }
            return false;
        },

        /** Method that activates a block on both the Game and Player's board
        * @property private
        * @params:
        * <Number> x - The horizontal position of the block
        *          y - The vertical position of the block
        */
        _activateBlock = function(x, y) {
            tictactoe.board[x][y] = 1;
            _board[x][y] = 1;
            console.log("-!- %s  selected [%d][%d] block", _name, x, y);
            _emitEvent('select');
        },
        
        /** Method for selecting a block on the board for non-ai player only
        * @property private
        * @params:
        * <Number> x - Horizontal position of the block
        * <Number> y - The vertical position of the block
        */
        _playerSelect = function(x, y) {
            if (_isBlockFree(x, y)) {
                _activateBlock(x, y);
            } else {
                console.log("-!- Warning: Block Taken! Please select another block");
            }
        },

        /** Method for selecting a block on the board for AI player only
        * @property private
        */
        _aiSelect = function() {
            var x = _getRandomNumber(2),
                y = _getRandomNumber(2);
            
            if (_isBlockFree(x, y)) {
                _activateBlock(x, y);
            } else {
                _aiSelect();
            }
        };


        /** Tell player that it's his/her turn
        * @property public
        */
        this.select = function() {

            console.log("-!- It's %s's turn!", _name);
            if (_type === "ai") {
                console.log("-!- %s is selecting a block...", _name);
                setTimeout(_aiSelect,2000);
            }
        };
        /** A public interface to let the user select a block
        * @property public
        * @note This is a temporary implementation and will be removed when implementing GUI
        */
        this.selectBlock = function(x, y) {
            _playerSelect(x, y);
        };

        /** Method for adding event listeners
        * @property public
        * @params:
        * <String> type - Event type i.e: 'select'
        * <Function> cb - A callback function
        */
        this.on = function(type, cb) {
            _events[type].callbacks.push(cb);
        };

        this.getName = function() {
            return _name;
        };

        this.isWin = function() {
            if (_board[0][0] === 1 && _board[0][1] === 1 && _board[0][2] === 1) {
                return true;
            }
            if (_board[1][0] === 1 && _board[1][1] === 1 && _board[1][2] === 1) {
                return true;
            }
            if (_board[2][0] === 1 && _board[2][1] === 1 && _board[2][2] === 1) {
                return true;
            }
            if (_board[0][0] === 1 && _board[1][0] === 1 && _board[2][0] === 1) {
                return true;
            }
            if (_board[1][0] === 1 && _board[1][1] === 1 && _board[2][1] === 1) {
                return true;
            }
            if (_board[0][2] === 1 && _board[1][2] === 1 && _board[2][2] === 1) {
                return true;
            }
            if (_board[0][0] === 1 && _board[1][1] === 1 && _board[2][2] === 1) {
                return true;
            }
            if (_board[0][2] === 1 && _board[1][1] === 1 && _board[2][0] === 1) {
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
