import ControlsText from "../components/ControlsText"

const GameContainer = ({selectedGame}) => {

    const generateGameControls = (selectedGame) => {
        if(!selectedGame.controls) {
            return <p class="controls-text">Controls will show here</p>
        }
        return selectedGame.controls.map(control => <ControlsText control={control}/>)
    }

    return (
        <>
        <div id="game-and-details">
            <div id="iframe-container">
                <iframe id="game-iframe" src={selectedGame.src || "http://localhost:8080"} title={selectedGame.name} height={selectedGame.height || "500px"} width={selectedGame.width || "500px"} ></iframe>
            </div>
            <div id="details-container">
                <h2>Game Details</h2>
                <h3>Name : {selectedGame.name}</h3>
                {generateGameControls(selectedGame)}
            </div>
        </div>
        </>
    )
}

export default GameContainer