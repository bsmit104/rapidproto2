
class End extends Phaser.Scene {
    constructor() {
        super('end');
    }
    preload(){
        this.load.path = "./assets/";
        // this.load.image('snail', 'snail.png');
        // this.load.image('rolypoly', 'roly-poly.png');
        // this.load.image('fairy', 'fairy.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#FFC0CB');

        this.title = this.add.text(100, 200, "you win!")
        this.title.setScale(3)
        this.tweens.add({
            targets: this.title,
            alpha:0,
            duration: 500,
            repeat: -1,
        });
    }
}