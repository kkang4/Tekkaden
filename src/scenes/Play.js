class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // load images/tile sprite
        this.load.image('player', './assets/player.png');
        this.load.image('player_bullet', './assets/player_bullet.png');
        this.load.image('enemy', './assets/enemy.png');
        this.load.image('enemy_bullet', './assets/enemy_bullet.png');
        this.load.image('rock', './assets/rock.png');
        this.load.image('background', './assets/background.png');
    }

    create(){
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // game over flag
        this.gameOver = false;
             
        // add player
        this.player = new Player(this, 40, 132, 'player'). setOrigin(0, 0);

        // add enemy
        this.enemy = new Enemy(this, 500, 132, 'enemy').setOrigin(0, 0);

        // add obstacles
        this.rock = new Obstacle(this, 500, 200, 'rock').setOrigin(0, 0);

        /// add bullets
        this.bulletGroup = new BulletGroup(this);

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    }

    update(){
        // scroll background
        this.background.tilePositionX += 4;
        
        // update if game isn't over
        if(!this.gameOver){
            this.player.update();
            this.enemy.update();
            this.rock.update();
        }

        if(keyF.isDown){
            this.shoot();
        }
       
        // check collisions (player and rock)
        if(this.checkObstacleCollision(this.player, this.rock)){
            this.rock.reset();
        }
        
    }

    shoot(){
        this.bulletGroup.shootBullet(this.player.x, this.player.y);
    }

    // check collision for player and obstacle
    checkObstacleCollision(player, obstacle){
        // simple AABB checking
        if(player.x < obstacle.x + obstacle.width && 
           player.x + player.width > obstacle.x && 
           player.y < obstacle.y + obstacle.height && 
           player.height + player.y > obstacle.y){
            return true;
        }
        else{
            return false;
        }
    }

}