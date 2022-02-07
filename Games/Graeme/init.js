(function () {
    
    // Create new Overworld and initialise it to the element with class "game-container"
    const overworld = new Overworld({
        element: document.querySelector(".game-container"),
    })
    overworld.init();

}) ();