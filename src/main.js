let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0}
        }
    },
    scene:  [ MainMenu, Play, Setting, TankSelection, Tutorial ],
};

let game = new Phaser.Game(config);

// define game settings
game.setting = {

}

// reserve some keyboard variables
let keyONE, keyTWO, keyTHREE;
let keyUP, keyDOWN, keyF;