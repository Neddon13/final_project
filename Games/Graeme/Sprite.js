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
            "idle-down":    [ [1,0] ],
            "idle-right":   [ [1,2] ],
            "idle-left":    [ [1,1] ],
            "idle-up":      [ [1,3] ],
            "walk-down":    [ [0,0], [1,0], [2, 0], [1,0] ],
            "walk-right":   [ [0,2], [1,2], [2, 2], [1,2] ],
            "walk-left":    [ [0,1], [1,1], [2, 1], [1,1] ],
            "walk-up":      [ [0,3], [1,3], [2, 3], [1,3] ],
        }
        this.currentAnimation = "idle-down" //config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;

        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x + utils.withGrid(10.5) - cameraPerson.x ;
        const y = this.gameObject.y + utils.withGrid(6) - cameraPerson.y ;

        this.isShadowLoaded && ctx.drawImage(this.shadow,
            x,
            y + 3
        )

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            utils.withGrid(frameX), utils.withGrid(frameY),     // x and y co-ord of start of image on spritesheet
            utils.withGrid(1), utils.withGrid(1),               // width and height of image to cut
            x - 1,                                              // x co-ord of top left of where sprite should be drawn
            y - 10,                                             // y co-ord of top left of where sprite should be drawn
            utils.withGrid(1), utils.withGrid(1)                // width and height of the image being shown
        )

        this.updateAnimationProgress();
    }
}