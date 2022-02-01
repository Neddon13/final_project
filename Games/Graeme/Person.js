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
        this.updatePosition();

        // Update the sprite to be the correct animation frame
        this.updateSprite(state);

        // If unit is player controlled, has no current movement progress remaining and an arrow key is pressed, move the unit and change the required counter.
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change * 2;
            this.movingProgressRemaining -= 1;
        }
    }

    updateSprite(state) {
        if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !state.arrow) {
            this.sprite.setAnimation("idle-"+this.direction);
            return;
        }

        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
        }
    }
}