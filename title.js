
class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload(){
        this.load.path = "./assets/";
        // this.load.image('snail', 'snail.png');
        // this.load.image('rolypoly', 'roly-poly.png');
        // this.load.image('fairy', 'fairy.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#FFC0CB');

        this.title = this.add.text(100, 500, "Roly Poly: To the End")
        this.title.setScale(8)
        this.tweens.add({
            targets: this.title,
            alpha:0,
            duration: 500,
            repeat: -1,
        });

        // this.snail = this.add.image(100, 100, 'snail');
        // this.fairy = this.add.image(200, 100, 'fairy');
        // this.rolypoly = this.add.image(300, 100, 'rolypoly');

        const playText = this.add.text(800, 800, 'PLAY', { fontSize: '60px', fill: '#fff' });
        //playText.setDepth(1);
        playText.setInteractive();
        playText.on('pointerover', () => {
            playText.setStyle({ fill: '#ff0' });
        });
        playText.on('pointerout', () => {
            playText.setStyle({ fill: '#fff' });
        });
        playText.on('pointerdown', () => {
            this.scene.start('level1');
        });

        // const space = this.add.image(200, 0, 'space');
        // //space.scale(.5);
        // space.setOrigin(0);
        // space.setDepth(0);

        // this.imageObject.background = this.back;
    }
}