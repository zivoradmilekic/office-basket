import React from 'react';

import Game from '../modals/Game';

import { addCircleOutline, flame } from "ionicons/icons";

import useLocalStorage from '../hooks/useLocalStorage';

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
  IonIcon,
  IonModal
} from '@ionic/react';

const Home: React.FC = () => {
  const [players, setPlayers] = useLocalStorage('players', {});
  const [showModal, setShowModal] = React.useState(false);

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

  const _handleFinishGame = (newPlayers: any) => {
    setShowModal(false);
    setPlayers(newPlayers);
  }

  const _sortPlayers = (curr:any, prev:any) => {
    let currScore = curr.score;
    let prevScore = prev.score;

    if (!currScore) return 1;
    if (!prevScore) return -1;

    if (currScore < prevScore) return 1;
    if (currScore > prevScore) return -1;

    return 0;
  };

  const playersSection = (
    <IonCard>
      <IonCardHeader>
        <IonToolbar>
          <IonCardSubtitle>Players</IonCardSubtitle>
          <IonCardTitle>Scoreboard</IonCardTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => _handleAddPlayer()}>
              <IonIcon slot="icon-only" icon={addCircleOutline} />
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
          {
            !Object.keys(players).length && (
              <IonItem>
                <IonLabel>
                  No players
                </IonLabel>
              </IonItem>
            )
          }
      </IonList>
    </IonCard>
  );

  const playButtonSection = !!Object.keys(players).length && (
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
          <IonButton onClick={() => setShowModal(true)}>
            Play new game
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>Office Basket</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setPlayers({})}>
              <IonIcon slot="icon-only" icon={flame} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {playersSection}
        {playButtonSection}
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        >
          <Game
            players={players}
            onFinish={(p:any) => _handleFinishGame(p)}
            onDismiss={() => setShowModal(false)}
          >
          </Game>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
