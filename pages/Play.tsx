import { IonContent, IonHeader, IonPage, IonTitle, IonCard, IonToolbar, IonButton, IonInput, IonItem, IonLabel} from '@ionic/react';
import { currentGame, gameResult } from '../App';
import { useHistory } from 'react-router-dom';
import { useState } from 'react'; 

interface PlayProps {
    addGameResult: (r: gameResult) => void;
    currentGame: currentGame;
}

export const Play: React.FC<PlayProps> = ({
  addGameResult
  , currentGame
}) => {

  const history = useHistory();

  

  const [longestWord, setLongestWord] = useState(""); 
  const [highScore, setHighScore] = useState(0); 

  const endGame = (winningPlayer: string) => {

    console.log(currentGame); 

    // Add the new game result to the app data.
    addGameResult({
        start: currentGame.start
        , end: new Date().toISOString()
        , winner: winningPlayer
        , players: currentGame.player.map(x => ({
            name: x
            , order: 0
           
        }))
        , highestScoreWord: longestWord
        , highestScoreValue: highScore
    });

    // Navigate Home.
    history.push("/");
  };

  return (
    <IonPage>
      
     
      <IonContent fullscreen>
        <IonHeader >
          <IonToolbar>
            <IonTitle size="large" id="playGame">Results</IonTitle>
          </IonToolbar>

          
        </IonHeader>
        

          { currentGame.player.map(x => (
            <IonButton
              id="player"
              key={x}
              onClick={() => endGame(x)}
              >
              {x} Won
            </IonButton>
          ))}

        
      <IonCard>
        <IonItem>
            <IonLabel position="floating">
              Enter Longest Word
            </IonLabel>
           
            
            <IonInput 
              value={longestWord}
              onIonChange={(e) => setLongestWord((e.target as any).value)}
            >
            </IonInput>
            
            </IonItem>

            <IonItem>
            <IonLabel position="floating">
              Enter High Score
            </IonLabel>
           
            
            <IonInput 
              value={highScore}
              onIonChange={(e) => setHighScore((e.target as any).value)}
            >
            </IonInput>
            
            </IonItem>
            </IonCard>
            <IonButton
              id="quit"
              onClick={() => history.push("/")}  
            >
              Quit
          </IonButton>

          { currentGame.word.map(y => (
            <p>
              {y}
            </p>
          ))}

            <h3>
              {longestWord}
            </h3>
            <h3>hello</h3>
            <h3>
              {highScore}
            </h3>
      </IonContent>
    </IonPage>
  );
};

export default Play;