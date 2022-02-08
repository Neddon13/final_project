import './App.css';
import PageHeader from './components/PageHeader';
import GameContainer from './containers/GameContainer';
import PageReel from './components/PageReel';
import PageFooter from './components/PageFooter';


function App() {
  return (
    <>
    <PageHeader/>
    
    <PageReel/>

    <GameContainer/>

    <PageFooter/>

    </>
  );
}

export default App;
