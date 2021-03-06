import snakeicon from '../images/snakeicon.png';
import flappybirdicon from '../images/flappybirdicon.jpeg';
import logo from '../images/logo.png';
import susie from '../images/susie.png';
import snakeadvert from '../images/snakeadvert.jpeg';
import FBadvert from '../images/FBadvert.jpeg';
import owadvert from '../images/owadvert.jpeg';
import saadvert from '../images/saadvert.jpeg';

const PageReel = ({selectedGame, setSelectedGame}) => {

    const setGameToFlappyBird = () => {
        setSelectedGame({
            name: "Flappy Bird",
            src: "http://localhost:8080/flappy-bird",
            height: 730,
            width: 500,
            controls: [
                "Jump : Space-bar"
            ]
        })
        setTimeout(()=> {
            document.getElementById("game-iframe").scrollIntoView(true)
            document.getElementById("game-iframe").focus();
        }, 20)
    }

    const setGameToSnake = () => {
        setSelectedGame({
            name: "Snake",
            src: "http://localhost:8080/snake",
            height: 460, 
            width: 406,
            controls: [
                "Up : W",
                "Down : S",
                "Left : A",
                "Right : D"
            ] 
        })
        setTimeout(()=> {
            document.getElementById("game-iframe").scrollIntoView(true)
            document.getElementById("game-iframe").focus();
        }, 20)
    }

    const setGameToSusiesAdventure = () => {
        setSelectedGame({
            name: "Susie's Adventure",
            src: "http://localhost:8080/susies-adventure",
            height: 380, 
            width: 620, 
            controls: [
                "Up : W",
                "Down : S",
                "Left : A",
                "Right : D",
                "Shoot : Space-bar"
            ] 
        })
        setTimeout(()=> {
            document.getElementById("game-iframe").scrollIntoView(true)
            document.getElementById("game-iframe").focus();
        }, 20)
    }

    const setGameToCodeclandAdventure = () => {
        setSelectedGame({
            name: "CodecLAND Adventure",
            src: "http://localhost:8080/codecland-adventure",
            height: 412, 
            width: 702, 
            controls: [
                "Up : W",
                "Down : S",
                "Left : A",
                "Right : D",
                "Talk : Enter"
            ] 
        })
        setTimeout(()=> {
            document.getElementById("game-iframe").scrollIntoView(true)
            document.getElementById("game-iframe").focus();
        }, 20)
    }


    return (

        <div id="reel-container">
            <div id="slides">
                <div id="myCarousel" className="carousel slide" data-ride="carousel">

                <div className="carousel-inner">
                    <div className="item active">
                    <img src={FBadvert} alt="Flappy Bird"></img>
                </div>

                <div className="item">
                    <img src={snakeadvert} alt="Snake"></img>
                </div>

                <div className="item">
                    <img src={owadvert} alt="CodecLand Adventure"></img>
                </div>

                <div className="item">
                    <img src={saadvert} alt="Susies Adventure"></img>
                </div>
                </div>

            </div> 

            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
            </a>
            </div>

           

            <div id="icons">
                <div id="game-icon1">
                <img src={flappybirdicon} onClick={setGameToFlappyBird}></img>
                </div>
                <div id="game-icon2">
                <img src={snakeicon} onClick={setGameToSnake}></img>
                </div>
                <div id="game-icon3">
                <img src={logo} onClick={setGameToCodeclandAdventure}></img>
                </div>
                <div id="game-icon4">
                <img src={susie} onClick={setGameToSusiesAdventure}></img>
                </div>
            </div>
        </div>
    )
}

export default PageReel;