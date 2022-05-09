import { IonContent, IonHeader, IonPage, IonTitle, IonCard, IonCardContent, IonCardTitle, IonToolbar, IonCol, IonRow, IonButton, IonImg, IonGrid, IonItem, IonText, IonThumbnail, IonLabel } from '@ionic/react';
import './Home.css';
import { gameResult } from '../App'; 
import { useHistory } from 'react-router-dom'; 


interface HomeProps {
  gameResults: gameResult[];
  pastPlayers: string[]; 
}

const calculateHighestScoringWord = (gameResults : gameResult[]) => {
    const ranked = [
      ...gameResults
    ].sort((a,b) => a.highestScoreValue < b.highestScoreValue ? 1 : -1);

    return { 
      word: ranked[0].highestScoreWord
      , value: ranked[0].highestScoreValue
    }
}; 

const calculateLeaderBoard = (p: string[], r: gameResult[]) => {
    
  const lb = p.map(x => {
    
    const gamesThisPlayerHasPlayedIn = r.filter(y => y.players.some(z => z.name == x));
    const gamesThisPlayerHasWon = gamesThisPlayerHasPlayedIn.filter(y => y.winner == x);


    return {
      name: x
      , wins: gamesThisPlayerHasWon.length
      , losses: gamesThisPlayerHasPlayedIn.length - gamesThisPlayerHasWon.length
      , winningPercentage: (gamesThisPlayerHasWon.length / gamesThisPlayerHasPlayedIn.length).toFixed(2)
    };
  })
   
  

    console.log("in leaderboard", lb); 

    return lb; 
}; 






const Home: React.FC<HomeProps> = ({
  gameResults
  , pastPlayers}) => {

  const history = useHistory();
  
  const hw = calculateHighestScoringWord(gameResults);

  const lb = calculateLeaderBoard(pastPlayers, gameResults); 
  return (
    <IonPage>
     
      <IonContent fullscreen>
      <IonHeader collapse="condense">
      <IonToolbar>
          
          <IonTitle size="large" id="home">Home</IonTitle>
        </IonToolbar>
       </IonHeader>
        <IonCard>
          <IonCardContent>
      <IonImg src="assets/scrabbleLogo.jpeg"></IonImg>
      </IonCardContent>
      </IonCard>
        <h2>hello</h2>

      
    
       <IonButton id="play"
           
            onClick={() => history.push("/score")}
            >
            Play
       </IonButton>

      <IonCard>
        <IonCardContent>    
       <IonCardTitle>Stats</IonCardTitle>
       <h3>
            Total Games Played: {gameResults.length}
            
       </h3>
       <h3>
            Highest Scoring Word: {hw.word}
       </h3>

       <h3>
            Highest Scoring Value: {hw.value}
       </h3>
       </IonCardContent>  
       </IonCard> 

      <IonCard>
      <IonCardContent>
      <IonCardTitle>Leaderboard</IonCardTitle>
      <br />
      <IonGrid>

        <IonCol>Name</IonCol>
        <IonCol push=".5">Wins</IonCol>
        <IonCol push="1">Losses</IonCol>
        <IonCol push="1">Win Percentage</IonCol>
      </IonGrid>
       <IonGrid>
          {calculateLeaderBoard(pastPlayers, gameResults)
          .sort((a, b) => b.winningPercentage.localeCompare(a.winningPercentage))
          .map(x => (
            
            <IonRow>
              
              <IonCol>
                {x.name} 
              </IonCol>
              <IonCol>
                {x.wins} 
              </IonCol>
              <IonCol>
                {x.losses} 
              </IonCol>
              <IonCol>
                {x.winningPercentage} 
              </IonCol>
              
            </IonRow>
          ))}
          

        </IonGrid>
        </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage> 
  );
  
};

export default Home;
