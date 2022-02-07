class GameObject {

    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/images/characters/male/hero.png",
        });

        this.behaviourLoop = config.behaviourLoop || [];
        this.behaviourLoopIndex = 0;

        this.talking = config.talking || [];
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        setTimeout(() => {
            this.doBehaviourEvent(map);
        }, 10)

    }

    update() {

    }

    async doBehaviourEvent(map) {

        // Don't do anything if there's a cutscene playing or if there is no behaviour loop for this object.
        if (map.isCutscenePlaying || this.behaviourLoop.length === 0 || this.isStanding) {
            return;
        }

        // Setting up our event with relevant info
        let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
        eventConfig.who = this.id;

        // Create an event instance
        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init();

        // Setting the next event to begin
        this.behaviourLoopIndex += 1;
        if (this.behaviourLoopIndex === this.behaviourLoop.length) {
            this.behaviourLoopIndex = 0;
        }

        // Loop through the above
        this.doBehaviourEvent(map);
    }
}