class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
        //this.map = null;
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image('snail', 'snail.png');
        this.load.image('roly', 'roly_poly.png');
        // map made with Tiled in JSON format
        // tiles in spritesheet 
        // this.load.image('player', 'dashstill.png');
    }

    create() {

        //player = this.add.rectangle(100, 100, 20, 20, 0xFF8C00);
        // player = this.physics.add.image(100, 400, 'roly');
        
        this.cameras.main.setBackgroundColor('#0xFF8C00');

        this.add.rectangle(200, 20000, 50, 50)
        this.physics.world.gravity.y = 500;
        // load the map 

        // create the player sprite    
        player = this.physics.add.sprite(200, 200, 'roly');
        player.setBounce(0.2); // our player will bounce from items
        player.setScale(4);
        player.setDepth(2);
        player.setCollideWorldBounds(true); // don't go out of the map   

        this.snail = this.physics.add.image(
            1000,
            800,
            'snail'
        )
        this.snail.setDepth(1)
        this.snail.setScale(4)

        const duration = 2000; // Duration in milliseconds
        const numFlashes = 4; // Number of times the sprite will flash
        // Define the tween animation
        this.tweens.add({
            targets: player,
            alpha: 0, // Make the sprite transparent
            ease: 'Linear',
            duration: duration / (2 * numFlashes), // Divide the duration evenly across the number of flashes
            repeat: numFlashes - 1, // Number of additional flashes (subtracting the initial state)
            yoyo: true, // Make the tween reverse back to its initial state
            onComplete: () => {
                // Reset the sprite's alpha to 1 (fully opaque) after the tween is complete
                player.alpha = 1;
            }
        });



        cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        this.physics.add.collider(player, this.snail, tohit, null, this);
        // Collision callback function
        function tohit() {
            // Trigger the scene change here
            // For example:
            this.scene.start('level1');
        }

        if (!this.physics.world.bounds.contains(player.x, player.y)) {
            // Scene change logic
            this.scene.start('level1');
        }
        // // Set the new position of the pause image
        // this.pause.setPosition(newX + 50, newY);
        // this.physics.add.collider(player, this.snail, nextsce, null, this);
        //     // Collision callback function
        //     function nextsce() {
        //         // Trigger the scene change here
        //         // For example:
        //         this.scene.start('level1');
        //     }
        if (cursors.left.isDown)
        {
            player.body.setVelocityX(-500);
            //player.anims.play('walk', true); // walk left
            player.flipX = true; // flip the sprite to the left
        }
        else if (cursors.down.isDown) {
            //player.body.setVelocityY(-500); 
            player.body.allowGravity = false;
        }
        else if (cursors.space.isDown) {
            //player.body.setVelocityY(-500); 
            player.body.allowGravity = true;
        }
        else if (cursors.right.isDown)
        {
            player.body.setVelocityX(500);
            //player.anims.play('walk', true);
            player.flipX = false; // use the original sprite looking to the right
        } else {
            player.body.setVelocityX(0);
            //player.anims.play('idle', true);
        }
        // jump 
        if (cursors.up.isDown && player.body.onFloor())
        {
            player.body.setVelocityY(-800);        
        }

        this.physics.world.setBounds(0, 0, 1920, 1080);
        player.setCollideWorldBounds(true);
        this.snail.setCollideWorldBounds(true);
    }
}