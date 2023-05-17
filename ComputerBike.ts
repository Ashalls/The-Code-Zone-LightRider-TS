class ComputerBike extends Bike {
    private scanDistance = 10;
    private trailSprite: TrailSprite;
    
    constructor(spriteImage: Image, colour: number, trailSprite: TrailSprite,
            spawnPos: number[], spawnDirection: Directions, scoreSystem: info.PlayerInfo) {
        super(spriteImage, SpriteKind.Enemy, colour, spawnPos, spawnDirection, scoreSystem);
        this.trailSprite = trailSprite;
        this.update();
    }

    private check() {
        let x_dir = this.sprite.vx / this.speed;
        let y_dir = this.sprite.vy / this.speed;
        for (let i = 0; i < this.scanDistance; i++){
            let x = (i * x_dir) + this.sprite.x + 10;
            let y = (i * y_dir) + this.sprite.y + 10;
            if (this.trailSprite.sprite.image.getPixel(x, y) != 0) {
                return true;
            }
        }
        return false;
    }

    private turn() {
        if (this.sprite.vx != 0) {
            if (randint(1, 2) == 1) {
                this.sprite.setVelocity(0, this.speed);
                transformSprites.rotateSprite(this.sprite, Directions.DOWN);
            }
            else {
                this.sprite.setVelocity(0, -this.speed);
                transformSprites.rotateSprite(this.sprite, Directions.UP);
            }
        }
        else {
            if (randint(1, 2) == 1) {
                this.sprite.setVelocity(this.speed, 0);
                transformSprites.rotateSprite(this.sprite, Directions.RIGHT);
            }
            else {
                this.sprite.setVelocity(-this.speed, 0);
                transformSprites.rotateSprite(this.sprite, Directions.LEFT);
            }
        }
    }

    private update() {
        game.onUpdateInterval(50, function behaviour() {
            if (randint(1, 50) == 1) {
                this.turn();
            }
            if (this.check()) {
                this.turn();
            }
        })
    }
}

