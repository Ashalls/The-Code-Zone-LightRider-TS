class TrailSprite extends BaseSprite {
    constructor() {
        super(image.create(180, 140), SpriteKind.Trail);
        this.sprite.image.fill(Colours.ORANGE);
    }

    public reset() {
        this.sprite.image.fillRect(10, 10, 160, 120, 0);
    }
}
