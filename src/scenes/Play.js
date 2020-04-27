class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // load images/tile sprite
        this.load.image('rocket1', './assets/rocket1.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('rocket3', './assets/rocket3.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // white rectangle borders
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0 ,0);

        // green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        // score default display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'pink',
            color: "#843605",
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWith: 100
        }

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: "#843605",
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWith: 100
        }

        // score
        this.p1Score = 0;
        this.p2Score = 0;
        this.p3Score = 0;
             
        // add rockets (p1,p2,p3)
        // constructor(scene, x, y, texture, frame)
        this.p1Rocket;
        this.p2Rocket;
        this.p3Rocket;

        // game over flag
        this.gameOver = false;

        // clock display
        this.clock = game.settings.gameTimer/1000;
        this.clockDisplay = this.add.text(450, 54, 'Time:'+ this.clock, menuConfig);
        
        if(game.settings.playerNum == 1){
            this.p1Rocket = new Rocket(this, game.config.width/2, 431, 'rocket1', 0, 1).setScale(0.5, 0.5).setOrigin(0, 0);
            this.p1ScoreDisplay = this.add.text(69, 54, this.p1Score, scoreConfig);
            
            // 45 or 60-second play clock
            menuConfig.fixedWidth = 0;
            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', menuConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, '(↑) to Restart or ← for Menu', menuConfig).setOrigin(0.5);
                this.gameOver = true;
            }, null, this);
        }
        else if(game.settings.playerNum == 2){ // two-player mode
            this.p1Rocket = new Rocket(this, game.config.width/3, 431, 'rocket1', 0, 1).setScale(0.5, 0.5).setOrigin(0, 0);
            this.p2Rocket = new Rocket(this, game.config.width*(2/3), 431, 'rocket2', 0, 2).setScale(0.5, 0.5).setOrigin(0, 0);
            this.p1ScoreDisplay = this.add.text(69, 54, this.p1Score, scoreConfig);
            scoreConfig.backgroundColor = 'lightblue';
            this.p2ScoreDisplay = this.add.text(154, 54, this.p2Score, scoreConfig);

            // 45 or 60-second play clock
            menuConfig.fixedWidth = 0;
            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', menuConfig).setOrigin(0.5);
                // Finding winner(s)
                if((this.p1Score == this.p2Score)){
                    // Everyone is winnner!
                    this.add.text(game.config.width/2, game.config.height/2, 'Everyone is winner!', menuConfig).setOrigin(0.5);
                }
                else if(this.p1Score > this.p2Score){
                    // P1 is winner.
                    scoreConfig.backgroundColor = 'pink';
                    this.add.text(game.config.width/2, game.config.height/2, 'Winner: Player 1', scoreConfig).setOrigin(0.5);
                }
                else{
                    // P2 is winner.
                    this.add.text(game.config.width/2, game.config.height/2, 'Winner: Player 2', scoreConfig).setOrigin(0.5);
                }
                this.add.text(game.config.width/2, game.config.height/2 + 64, '(↑) to Restart or ← for Menu', menuConfig).setOrigin(0.5);
                this.gameOver = true;
            }, null, this);
        }
        else{ // three-player mode
            this.p1Rocket = new Rocket(this, game.config.width/3, 431, 'rocket1', 0, 1).setScale(0.5, 0.5).setOrigin(0, 0);
            this.p2Rocket = new Rocket(this, game.config.width/2, 431, 'rocket2', 0, 2).setScale(0.5, 0.5).setOrigin(0, 0);
            this.p3Rocket = new Rocket(this, game.config.width*(2/3), 431, 'rocket3', 0, 3).setScale(0.5, 0.5).setOrigin(0, 0);
            this.p1ScoreDisplay = this.add.text(69, 54, this.p1Score, scoreConfig);
            scoreConfig.backgroundColor = 'lightblue';
            this.p2ScoreDisplay = this.add.text(154, 54, this.p2Score, scoreConfig);
            scoreConfig.backgroundColor = 'lightgreen';
            this.p3ScoreDisplay = this.add.text(239, 54, this.p3Score, scoreConfig);

            // 45 or 60-second play clock
            menuConfig.fixedWidth = 0;
            this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
                this.add.text(game.config.width/2, game.config.height/2 - 64, 'GAME OVER', menuConfig).setOrigin(0.5);
                if((this.p1Score != this.p2Score) && (this.p1Score != this.p3Score) && (this.p2Score != this.p3Score)){ // all scores are different
                    this.highest = this.p1Score;
                    if(this.highest < this.p2Score){
                        this.highest = this.p2Score;
                    }
                    if(this.highest < this.p3Score){
                        this.highest = this.p3Score;
                    }

                    if(this.highest == this.p1Score){ // Player 1 is winner
                        scoreConfig.backgroundColor = 'pink';
                        this.add.text(game.config.width/2, game.config.height/2, 'Winner: Player 1', scoreConfig).setOrigin(0.5);
                    }
                    else if(this.highest == this.p2Score){ // Player 2 is winner
                        scoreConfig.backgroundColor = 'lightblue';
                        this.add.text(game.config.width/2, game.config.height/2, 'Winner: Player 2', scoreConfig).setOrigin(0.5);
                    }
                    else{ // Player 3 is winner
                        scoreConfig.backgroundColor = 'lightgreen';
                        this.add.text(game.config.width/2, game.config.height/2, 'Winner: Player 3', scoreConfig).setOrigin(0.5);
                    }
                }
                else if((this.p1Score == this.p2Score) && (this.p1Score != this.p3Score)){
                    if(this.p1Score > this.p3Score){ // P1 and P2 are winners
                        this.add.text(game.config.width/2, game.config.height/2, 'Winners: Player 1 and Player 2', menuConfig).setOrigin(0.5);
                    }
                    else{ // P3 is only winner
                        scoreConfig.backgroundColor = 'lightgreen';
                        this.add.text(game.config.width/2, game.config.height/2, 'Winner: Player 3', scoreConfig).setOrigin(0.5);
                    }
                }
                else if((this.p1Score == this.p3Score) && (this.p1Score != this.p2Score)){
                    if(this.p1Score > this.p2Score){ // P1 and P3 are winners
                        this.add.text(game.config.width/2, game.config.height/2, 'Winners: Player 1 and Player 3', menuConfig).setOrigin(0.5);
                    }
                    else{ // P2 is only winner
                        scoreConfig.backgroundColor = 'lightblue';
                        this.add.text(game.config.width/2, game.config.height/2, 'Winner: Player 2', scoreConfig).setOrigin(0.5);
                    }
                }
                else if((this.p2Score == this.p3Score) && (this.p2Score != this.p1Score)){
                    if(this.p2Score > this.p1Score){ // P2 and P3 are winners
                        this.add.text(game.config.width/2, game.config.height/2, 'Winners: Player 2 and Player 3', menuConfig).setOrigin(0.5);
                    }
                    else{ // P1 is only winner
                        scoreConfig.backgroundColor = 'pink';
                        this.add.text(game.config.width/2, game.config.height/2, 'Winner: Player 1', scoreConfig).setOrigin(0.5);
                    }
                }
                else{ // all scores are same
                    this.add.text(game.config.width/2, game.config.height/2, 'Everyone is winner!', menuConfig).setOrigin(0.5);
                }
                this.add.text(game.config.width/2, game.config.height/2 + 64, '(↑) to Restart or ← for Menu', menuConfig).setOrigin(0.5);
                this.gameOver = true;
            }, null, this);
        }

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width +192, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width +96, 196, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0, 0);

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        if(game.settings.playerNum != 2){
            if(game.settings.playerNum == 1){
                // singleplayer
                // mouse control movement
                this.input.on('pointermove', function(pointer){
                    if(pointer.x >= 47 && pointer.x <= 578){
                        if(this.p1Rocket.x >= 47 && this.p1Rocket.x <= 578){
                            this.p1Rocket.x = pointer.x;
                        }
                    }
                }, this);
                
                // mouse click shoots rocket
                this.input.on('pointerdown', function(pointer){
                    if(this.p1Rocket.isFiring != true){
                        this.p1Rocket.sfxRocket.play(); // play sfx
                    }
                    this.p1Rocket.isFiring = true;
                }, this);
            }
            else{
                // three-player mode
                // mouse control movement for only player 3
                this.input.on('pointermove', function(pointer){
                    if(pointer.x >= 47 && pointer.x <= 578){
                        if(this.p3Rocket.x >= 47 && this.p3Rocket.x <= 578){
                            this.p3Rocket.x = pointer.x;
                        }
                    }
                }, this);
                
                // mouse click shoots rocket
                this.input.on('pointerdown', function(pointer){
                    if(this.p3Rocket.isFiring != true){
                        this.p3Rocket.sfxRocket.play(); // play sfx
                    }
                    this.p3Rocket.isFiring = true;
                }, this);
            }
        }
    }


    update(){
        // update clock
        this.clockDisplay.text = 'Time:' + ((game.settings.gameTimer/1000) - Math.round(this.clock.getElapsedSeconds()));

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyUP)){
            this.scene.restart(this.p1Score);
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        
        // scroll starfield
        this.starfield.tilePositionX -= 4;

        if(game.settings.playerNum == 1){
            // update rocket
            if(!this.gameOver){
                this.p1Rocket.update();
            }
            // check collisions
            if(this.checkCollision(this.p1Rocket, this.ship03)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship03);
            }
            if(this.checkCollision(this.p1Rocket, this.ship02)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship02);
            }
            if(this.checkCollision(this.p1Rocket, this.ship01)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship01);
            }
        }
        else if(game.settings.playerNum == 2){
            // update rocket
            if(!this.gameOver){
                this.p1Rocket.update();
                this.p2Rocket.update();
            }
            // check collisions
            if(this.checkCollision(this.p1Rocket, this.ship03)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship03);
            }
            if(this.checkCollision(this.p1Rocket, this.ship02)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship02);
            }
            if(this.checkCollision(this.p1Rocket, this.ship01)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship01);
            }
            if(this.checkCollision(this.p2Rocket, this.ship03)){
                this.p2Rocket.reset();
                this.shipExplode(2, this.ship03);
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)){
                this.p2Rocket.reset();
                this.shipExplode(2, this.ship02);
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)){
                this.p2Rocket.reset();
                this.shipExplode(2, this.ship01);
            }
        }
        else{
            // update rocket
            if(!this.gameOver){
                this.p1Rocket.update();
                this.p2Rocket.update();
                this.p3Rocket.update();
            }
            // check collisions
            if(this.checkCollision(this.p1Rocket, this.ship03)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship03);
            }
            if(this.checkCollision(this.p1Rocket, this.ship02)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship02);
            }
            if(this.checkCollision(this.p1Rocket, this.ship01)){
                this.p1Rocket.reset();
                this.shipExplode(1, this.ship01);
            }
            if(this.checkCollision(this.p2Rocket, this.ship03)){
                this.p2Rocket.reset();
                this.shipExplode(2, this.ship03);
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)){
                this.p2Rocket.reset();
                this.shipExplode(2, this.ship02);
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)){
                this.p2Rocket.reset();
                this.shipExplode(2, this.ship01);
            }
            if(this.checkCollision(this.p3Rocket, this.ship03)){
                this.p3Rocket.reset();
                this.shipExplode(3, this.ship03);
            }
            if(this.checkCollision(this.p3Rocket, this.ship02)){
                this.p3Rocket.reset();
                this.shipExplode(3, this.ship02);
            }
            if(this.checkCollision(this.p3Rocket, this.ship01)){
                this.p3Rocket.reset();
                this.shipExplode(3, this.ship01);
            }
        }


        // update spaceships
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

    }

    checkCollision(rocket, ship){
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && 
           rocket.x + rocket.width > ship.x && 
           rocket.y < ship.y + ship.height && 
           rocket.height + rocket.y > ship.y){
            return true;
        }
        else{
            return false;
        }
    }

    shipExplode(r, ship){ // r = rocket's playernumber
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);

        //play explode animation
        boom.anims.play('explode');

        // callback after animation completes
        boom.on('animationcomplete', () => {
            // reset ship position
            ship.reset();

            // make ship visible again
            ship.alpha = 1;

            // remove explosion sprite
            boom.destroy();
        });

        // score increment and repaint
        if(r == 1){
            this.p1Score += ship.points;
            this.p1ScoreDisplay.text = this.p1Score;
        }
        else if(r == 2){
            this.p2Score += ship.points;
            this.p2ScoreDisplay.text = this.p2Score;
        }
        else{
            this.p3Score += ship.points;
            this.p3ScoreDisplay.text = this.p3Score;
        }

        this.sound.play('sfx_explosion');
    }
}