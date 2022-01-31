class Sprite {

    constructor(config) {

        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.shadow = new Image();
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x ;
        const y = this.gameObject.y ;

        this.isShadowLoaded && ctx.drawImage(this.shadow,
            x,
            y + 3
        )

        this.isLoaded && ctx.drawImage(this.image,
            0, 0,                                       // x and y co-ord of start of image on spritesheet
            utils.withGrid(1), utils.withGrid(1),       // width and height of image to cut
            x - 1,                                      // x co-ord of top left of where sprite should be drawn
            y - 10,                                     // y co-ord of top left of where sprite should be drawn
            utils.withGrid(1), utils.withGrid(1)        // width and height of the image being shown
        )
    }
}