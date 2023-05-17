namespace SpriteKind {
    export const Trail: any = SpriteKind.create();
}

class GameManager{
    private red: PlayerBike;
    private blue: ComputerBike;
    private trailSprite: TrailSprite;
    private bikes: Bike[];
    
    constructor() {
        this.setupSprites();
        this.update();
        this.overlaps();
        this.resetRound();
    }

    private setupSprites(){
        this.trailSprite = new TrailSprite()
        this.red = new PlayerBike(assets.image`red`,
            Colours.RED,
            [40, 60],
            Directions.RIGHT,
            controller.player1,
            info.player1);
        this.blue = new ComputerBike(assets.image`blue`,
            Colours.BLUE,
            this.trailSprite,
            [120, 60],
            Directions.LEFT,
            info.player2);
        this.bikes = [this.red, this.blue];
    }

    private resetRound() {
        for (let bike of this.bikes) {
            bike.reset();
        }
        this.trailSprite.reset();
    }

    private overlaps() {
        let blueScoreSystem = this.blue.scoringSystem;
        let redScoreSystem = this.red.scoringSystem;
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Trail,
            function playerCrash(bike: Sprite, trail: Sprite) {
                blueScoreSystem.changeScoreBy(1);
                this.resetRound();
            }
        )
        
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Trail,
            function computerCrash(bike: Sprite, trail: Sprite) {
                redScoreSystem.changeScoreBy(1);
                this.resetRound();
            }
        )
        
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Trail,
            function bothCollide(bike: Sprite, otherBike: Sprite) {
                this.resetRound();
            }
        )
    }

    private draw() {
        for (let bike of this.bikes) {
            this.trailSprite.sprite.image.setPixel(bike.sprite.x + 10, 
                bike.sprite.y + 10, 
                bike.trailColour);
        }
    }

    private update() {
        game.onUpdate(function tick(){
            this.red.getInput();
            this.draw();
        })
    }
}