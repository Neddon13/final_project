import snakeicon from '../images/snakeicon.png';
import flappybirdicon from '../images/flappybirdicon.jpeg';
import icon3 from '../images/icon3.png';
import icon4 from '../images/icon4.jpeg';

const PageReel = () => {
    return (

        <div id="reel-container">
            <div id="slides"></div>





            <div id="icons">
                <div id="game-icon1">
                <img src={flappybirdicon}></img>
                </div>
                <div id="game-icon2">
                <img src={snakeicon}></img>
                </div>
                <div id="game-icon3">
                <img src={icon3}></img>
                </div>
                <div id="game-icon4">
                <img src={icon4}></img>
                </div>
            </div>

        </div>
    )
}

export default PageReel;