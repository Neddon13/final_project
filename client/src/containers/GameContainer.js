const GameContainer = ({selectedGame}) => {

    return (
        <>
        <div id="iframe-container">
            <iframe id="game-iframe" src={selectedGame.src} title={selectedGame.name} height={selectedGame.height} width={selectedGame.width} ></iframe>
        </div>
        </>
    )
}

export default GameContainer