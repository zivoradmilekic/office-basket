import React from 'react';

import useLocalStorage from '../useLocalStorage';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonBadge,
  IonButtons,
  IonIcon
} from '@ionic/react';

const Home: React.FC = () => {
  const [players, setPlayers] = useLocalStorage('players', {});

  const _handleAddPlayer = () => {
    const name:any = prompt(`Enter player name`);
    if (!name || name.length === 0) return false;

    let newPlayers:any = {
      ...players
    };

    newPlayers[name] = {
      name,
      score: 0
    };

    setPlayers(newPlayers);
  };

  const _sortPlayers = (curr:any, prev:any) => {
    let currScore = curr.score;
    let prevScore = prev.score;
    if (!currScore || !prevScore) return 0;

    if (currScore < prevScore) return 1;
    if (currScore > prevScore) return -1;

    return 0;
  };

  const playersDisplay = !!Object.keys(players).length && (
    <IonCard>
      <IonCardHeader>
        <IonToolbar>
          <IonCardSubtitle>Scoreboard</IonCardSubtitle>
          <IonCardTitle>Players</IonCardTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => _handleAddPlayer()}>
              <IonIcon slot="icon-only" name="search" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonCardHeader>
      <IonList inset={true} lines={"full"}>
        {Object.values(players)
          .sort((a, b) => _sortPlayers(a, b))
          .map((player:any, index) => (
            <IonItem key={index}>
              <IonLabel>
                <IonNote style={{ marginRight: "0.5rem" }}>
                  {index + 1}
                </IonNote>
                {player.name}
              </IonLabel>
              <IonNote slot="end">
                {!!player.score && (
                  <IonBadge color="primary" style={{ marginLeft: "0.5rem" }}>
                    {player.score}
                  </IonBadge>
                )}
              </IonNote>
            </IonItem>
          ))}
      </IonList>
    </IonCard>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Office Basket</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setPlayers({})}>
              <IonIcon slot="icon-only" name="search" />
            </IonButton>
            <IonButton onClick={() => _handleAddPlayer()}>
              <IonIcon slot="icon-only" name="search" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {playersDisplay}
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonText>
                Have a fun! Take a break of your hard work!
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton routerLink="/game">
                Play new game
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
