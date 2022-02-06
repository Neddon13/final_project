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

    startMap(mapConfig) {
        this.map = new OverworldMap(mapConfig);
        this.map.overworld = this;
        this.map.mountObjects();
    }

    init() {
        this.startMap(window.OverworldMaps.Demo);

        this.bindActionInput();
        this.bindHeroPosition();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();

        this.map.startCutscene([
            // { type: "changeMap", map: "Farmhouse"}
            // { type: "textMessage", text: "Welcome to CodecLAND, feel free to explore and talk to people!" },
            // { who: "hero", type: "stand", direction: "left", time: 100},
            // { who: "hero", type: "stand", direction: "up", time: 100},
            // { who: "hero", type: "stand", direction: "right", time: 100},
            // { who: "hero", type: "stand", direction: "down", time: 100},
        ])
    }
}