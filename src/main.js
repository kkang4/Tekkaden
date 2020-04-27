// Mingun Cho
// mcho23@ucsc.edu
// 1654724
// 
// Rocket Patrol Mods
// - Allow the player to control the Rocket after it's fired (10)
// - Display the time remaining (in seconds) on the screen (15)
// - Implement mouse control for player movement and mouse click to fire (25) <-- Only during single player and third player (Player 3) mode
// - Implement a simultaneous two-player mode (50)
//
// Extra Modifications:
// - More menu screens for instructions based on mode that players have chosen. (single, two-player, three-player)
// - Allowing players to go back to main menu by pressing ↓
// - Displaying every player's score
// - Determining which player is winner at the end (only for two-player and three-player)
// - Different color for each player's rocket (Player 1 - pink, Player 2 - light blue, Player 3 - light green)
// - Can't hear sfx_rocket again after a rocket has been fired (When players press Fire button when rocket is firing)

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene:  [ Menu, OPMenu, TPMenu, ThMenu, Play ],
};

let game = new Phaser.Game(config);

// define game settings
game.setting = {
    playerNum: 1,
    spaceshipSpeed: 3,
    gameTimer: 60000
}

// reserve some keyboard variables
let keyONE, keyTWO, keyTHREE;
let keyUP, keyDOWN, keyLEFT, keyRIGHT;
let keyW, keyA, keyD;