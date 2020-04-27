class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
    }

    create(){
        // menu display
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
            fixedWith: 0
        }
        
        // display menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 100;
        
        this.add.text(centerX, centerY - textSpacer, 'ROCKET  PATROL', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'pink';
        this.add.text(centerX, centerY - textSpacer/3, 'Press 1 for singleplayer mode', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'lightblue';
        this.add.text(centerX, centerY + textSpacer/3, 'Press 2 for two-player mode', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = 'lightgreen';
        this.add.text(centerX, centerY + textSpacer, 'Press 3 for three-player mode', menuConfig).setOrigin(0.5);
        
        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        keyTHREE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            // singleplayer mode
            this.sound.play('sfx_select');
            this.scene.start("OPMenuScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyTWO)){
            // two-player mode
            this.sound.play('sfx_select');
            this.scene.start("TPMenuScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyTHREE)){
            // three-player mode
            this.sound.play('sfx_select');
            this.scene.start("ThMenuScene");
        }
    }
}