class TitleScreen {
    constructor({progress}) {
        this.progress = progress;
    }

    getOptions(resolve) {
        const saveFile = this.progress.getSave();
        return [
            {
                label: "New Game",
                description: "Start a new game",
                handler: () => {
                    this.close();
                    resolve();
                }
            },
            saveFile ? {
                label: "Continue Game",
                description: "Continue from last save point",
                handler: () => {
                    this.close();
                    resolve(saveFile);
                }
            } : null
        ].filter(v => v)
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("TitleScreen");
        this.element.innerHTML = (`
            <img class="TitleScreenLogo" src="/Graeme/images/maptileset/logo.png" alt="logo"/>
        `)
    }

    close() {
        this.keyboardMenu.end();
        this.element.remove();
    }

    init(container) {
        return new Promise(resolve => {
            this.createElement();
            container.appendChild(this.element);
            this.keyboardMenu = new KeyboardMenu();
            this.keyboardMenu.init(this.element);
            this.keyboardMenu.setOptions(this.getOptions(resolve))
        })
    }
}