import ControlsText from "../components/ControlsText"

const GameContainer = ({selectedGame}) => {

    const generateGameControls = (selectedGame) => {
        if(!selectedGame.controls) {
            return <p>Controls will show here</p>
        }
        return selectedGame.controls.map(control => <ControlsText control={control}/>)
    }

    return (
        <>
        <div id="game-and-details">
            <div id="iframe-container">
                <iframe id="game-iframe" src={selectedGame.src || "http://localhost:8080"} title={selectedGame.name} height={selectedGame.height} width={selectedGame.width} ></iframe>
            </div>
            <div id="details-container">
                <h1>Game Details : </h1>
                <h2>Name : {selectedGame.name}</h2>
                {generateGameControls(selectedGame)}
            </div>
        </div>
        </>
    )
}

export default GameContainer