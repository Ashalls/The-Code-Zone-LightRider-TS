 class PlayerBike extends Bike {
    private controller: controller.Controller;
     
    constructor(spriteImage: Image, colour: number,
            spawnPos: number[], spawnDirection: Directions,
            controller: controller.Controller, scoreSystem: info.PlayerInfo) {
        super(spriteImage, SpriteKind.Player, colour, spawnPos, spawnDirection, scoreSystem);
        this.controller = controller;
    }

    private turn(vx: number, vy: number, newDir: Directions) {
        this.sprite.setVelocity(vx, vy);
        transformSprites.rotateSprite(this.sprite, newDir);
    }

    public getInput() {
        let dir = transformSprites.getRotation(this.sprite); 
        if (this.controller.up.isPressed() && dir != Directions.DOWN) {
            this.turn(0, -this.speed, Directions.UP)
        }
        else if (this.controller.down.isPressed() && dir != Directions.UP) {
            this.turn(0, this.speed, Directions.DOWN)
        }
        else if (this.controller.left.isPressed() && dir != Directions.RIGHT) {
            this.turn(-this.speed, 0, Directions.LEFT)
        }
        else if (this.controller.right.isPressed() && dir != Directions.LEFT) {
            this.turn(this.speed, 0, Directions.RIGHT)
        }
    }
}