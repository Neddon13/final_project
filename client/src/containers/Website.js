import PageHeader from '../components/PageHeader';
import GameContainer from './GameContainer';
import PageReel from '../components/PageReel';
import PageFooter from '../components/PageFooter';
import {useState} from 'react';

const Website = () => {

    const [selectedGame, setSelectedGame] = useState({});

    return (
        <>
        <PageHeader/>
    
        <PageReel selectedGame={selectedGame} setSelectedGame={setSelectedGame}/>
    
        <GameContainer selectedGame={selectedGame}/>
    
        <PageFooter/>
    
        </>
    )
}

export default Website;


