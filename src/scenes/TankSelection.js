class TankSelection extends Phaser.Scene{
    constructor(){
        super("tankSelectionScene");
    }

    preload(){
 
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
        
        this.add.text(centerX, centerY - textSpacer, 'TANKSELECTION', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer/3, '1: PLAY', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer/3, '2: GO BACK TO MAIN MENU', menuConfig).setOrigin(0.5);
        
        // define keys
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyONE)){
            // play
            this.scene.start("playScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyTWO)){
            // go back to main menu
            this.scene.start("mainMenuScene");
        }
    }
}