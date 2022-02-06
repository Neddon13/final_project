class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {

            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)

            const cameraPerson = this.map.gameObjects.hero;

            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })

            this.map.drawLowerImage(this.ctx, cameraPerson);

            Object.values(this.map.gameObjects).sort((a, b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            this.map.drawUpperImage(this.ctx, cameraPerson);
            
            if (!this.map.isPaused) {
                requestAnimationFrame(() => {
                    step();
                })
            }
            
        }
        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            // Is there an interactible object here?
            this.map.checkForActionCutscene();
        })

        new KeyPressListener("Escape", () => {
            if (!this.map.isCutscenePlaying) {
                this.map.startCutscene([
                    {type: "pause"}
                ])
            };
        })
    }

    bindHeroPosition() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "hero") {
                this.map.checkForPositionalCutscene();
            }
        })
    }

    startMap(mapConfig, heroInitialState=null) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();

        if (heroInitialState) {
            this.map.gameObjects.hero.x = heroInitialState.x;
            this.map.gameObjects.hero.y = heroInitialState.y;
            this.map.gameObjects.hero.direction = heroInitialState.direction;
        }

        this.progress.mapId = mapConfig.id;
        this.progress.startingHeroX = this.map.gameObjects.hero.x;
        this.progress.startingHeroY = this.map.gameObjects.hero.y;
        this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
    }

    init() {

        this.progress = new Progress();

        let initialHeroState = null;
        const saveFile = this.progress.getSave();
        if (saveFile) {
            this.progress.load();
            initialHeroState = {
                x: this.progress.startingHeroX,
                y: this.progress.startingHeroY,
                direction: this.progress.startingHeroDirection,
            }
        }

        this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState);

        this.bindActionInput();
        this.bindHeroPosition();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();

        this.map.startCutscene([
            { type: "textMessage", text: "Welcome to CodecLAND, feel free to explore and talk to people!" },
            { who: "hero", type: "stand", direction: "left", time: 100},
            { who: "hero", type: "stand", direction: "up", time: 100},
            { who: "hero", type: "stand", direction: "right", time: 100},
            { who: "hero", type: "stand", direction: "down", time: 100},
        ])
    }
}