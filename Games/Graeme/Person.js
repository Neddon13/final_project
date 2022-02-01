class Person extends GameObject {
    constructor(config) {

        // Send config to parent for initialising
        super(config);

        // Number of pixels left in current movement - this should stop object from stopping between grid points
        this.movingProgressRemaining = 0;

        // Flag to determine whether keypresses should move them
        this.isPlayerControlled = config.isPlayerControlled || false;

        // Array of possible movements with corresponding key for referencing
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            if (this.isPlayerControlled && state.arrow) {
                this.startBehaviour(state, {
                    type: "walk",
                    direction: state.arrow,
                })
            }
            this.updateSprite();
        } 
    }

    startBehaviour(state, behaviour) {
        this.direction = behaviour.direction;
        if (behaviour.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change * 2;
        this.movingProgressRemaining -= 1;
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction); 
    }
}