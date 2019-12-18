import React from 'react';

import Game from '../modals/Game';
import Header from "../components/Header";
import ListHeader from "../components/ListHeader";
import Player from "../components/Player";
import StartGame from "../components/StartGame";

import useLocalStorage from '../hooks/useLocalStorage';

import {
  IonContent,
  IonPage,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonModal
} from '@ionic/react';

const Home: React.FC = () => {
  const [players, setPlayers] = useLocalStorage('players', {});
  const [showModal, setShowModal] = React.useState(false);

  const _handleAddPlayer = () => {
    const name: any = prompt(`Enter player name`);
    if (!name || name.length === 0) return false;

    let newPlayers: any = {
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

  const _sortPlayers = (curr: any, prev: any) => {
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
      <ListHeader onAddPlayer={_handleAddPlayer} />
      <IonList inset={true} lines={"full"}>
        {Object.values(players)
          .sort((a, b) => _sortPlayers(a, b))
          .map((player: any, index) => (
            <Player key={index} index={index} player={player} />
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

  const playButtonSection = !!Object.keys(players).length && <StartGame onShowModal={setShowModal} />

  return (
    <IonPage>
      <Header onSetPlayers={setPlayers} />
      <IonContent>
        {playersSection}
        {playButtonSection}
        <IonModal
          isOpen={showModal}
          onDidDismiss={() => setShowModal(false)}
        >
          <Game
            players={players}
            onFinish={(p: any) => _handleFinishGame(p)}
            onDismiss={() => setShowModal(false)}
          />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
