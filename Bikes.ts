enum Colours {
    TRANSPARENT = 0,
    WHITE = 1,
    RED = 2,
    PINK = 3,
    ORANGE = 4,
    YELLOW = 5,
    TEAL = 6,
    GREEN = 7,
    BLUE = 8,
    LIGHTBLUE = 9,
    PURPLE = 10,
    LIGHTPURPLE = 11,
    DARKPURLE = 12,
    TAN = 13,
    BROWN = 14,
    BLACK = 15
}

enum Directions {
    UP = 0,
    DOWN = 180,
    LEFT = 270,
    RIGHT = 90
}

class Bike extends BaseSprite {
    public speed = 50;
    public trailColour: Colours;
    private spawnPos: number[];
    private spawnDirection: Directions;
    public scoringSystem: info.PlayerInfo;
    
    constructor(spriteImage: Image, spriteKind: any, colour: number,
            spawnPos: number[], spawnDirection: Directions, scoringSystem: info.PlayerInfo) {
        super(spriteImage, spriteKind);
        this.trailColour = colour;
        this.spawnPos = spawnPos;
        this.spawnDirection = spawnDirection;
        this.scoringSystem = scoringSystem;
    }

    public reset() {
        this.sprite.setPosition(this.spawnPos[0], this.spawnPos[1]);
        transformSprites.rotateSprite(this.sprite, this.spawnDirection);
        let dir = transformSprites.getRotation(this.sprite);
        this.sprite.vx = Math.sin(dir * Math.PI / 180) * this.speed;
        this.sprite.vy = Math.cos(dir * Math.PI / 180) * this.speed;
    }
}

