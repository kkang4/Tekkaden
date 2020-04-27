class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        this.isFiring = false;
    }

    update(){
        // move up
        if(keyUP.isDown){
            this.y -= 2;
        }

        // move down
        if(keyDOWN.isDown){
            this.y += 2;
        }
        
    }

}