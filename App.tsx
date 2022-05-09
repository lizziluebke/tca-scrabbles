import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect } from 'react'; 
import  Home  from './pages/Home';
import { Score } from './pages/Score'; 
import { Play } from './pages/Play'; 
import localforage from 'localforage'; 


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

interface player {
  name: string;
  order: number;
}

export interface gameResult {
  start: string;      
  end: string;        
  highestScoreWord: string;
  highestScoreValue: number;      
  players: player[]
  winner: string   

 
}

export interface currentGame {
  start: string; 
  player: string[]; 
  word: string[]; 
}

const game1: gameResult = {
  start: "2022-02-14T11:55:00"
  , end: "2022-02-14T13:00:00"
  , highestScoreWord: "Question"
  , highestScoreValue: 40
  , players: [{ name: "Me", order: 1 }, { name: "Luke", order: 2 }, { name: "Kirsten", order: 3 }]
  , winner: "carly"
}

const game2: gameResult = {
  start: "2022-03-14T12:05:00"
  , end: "2022-03-14T14:35:00"
  , highestScoreWord: "Occupation"
  , highestScoreValue: 38
  , players: [{ name: "Me", order: 1 }, { name: "Carly", order: 2 }]
  , winner: "Luke"
};

const gameResults: gameResult[] = [
  game1
  , game2
];

const getUniquePlayers = (games: gameResult[]) => (
  [...new Set(games.flatMap(x => x.players.map(y => y.name)))]);


const App: React.FC = () => {

  const loadGameResults = async () => {
    try {
      const r = await localforage.getItem<gameResult[]>("gameResults"); 
      setResults(r ?? []); 
    }

    catch (err) {
      console.log(err); 
      setResults([]); 
    }
  }; 


  useEffect(
    () => {
      loadGameResults(); 
    }
    , []
  ); 
  
  // App state as useState() until it gets unmanagable 
  const [results, setResults] = useState<gameResult[]>(gameResults); 

  const [currentGame, setCurrentGame] = useState<currentGame>({
    start: ""
    , player: []
    , word: []
  }); 


  const addGameResult = async (singleGameResult: gameResult) => {
      
    const updatedResult = [
      ...results
         , singleGameResult
     ]; 

     await localforage.setItem('gameResults', updatedResult); 


     setResults(updatedResult);
  };
  
  
  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/Home">
          <Home 
              gameResults={results}
              pastPlayers = {getUniquePlayers(results)}
          />
        </Route>
        <Route exact path="/Score">
          <Score
            pastPlayers = {getUniquePlayers(results)}
            setCurrentGame={setCurrentGame}
            
          />
        </Route>
        <Route exact path="/Play">
          <Play 
            currentGame={currentGame}
            addGameResult={addGameResult}
            
          />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
