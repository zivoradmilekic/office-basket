import React from 'react';

import GameHeader from "../components/GameHeader";
import Controls from "../components/Controls";
import Levels from "../components/Levels";
import Player from "../components/Player";

import {
  IonContent,
  IonFooter,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonToolbar,
  IonActionSheet
} from '@ionic/react';

interface GameProps {
  players: any
  onFinish: any
  onDismiss: any
}

const Game: React.FC<GameProps> = (props) => {
  const { players, onFinish, onDismiss } = props;

  const [level, setLevel] = React.useState(0);

  const [misses, setMisses] = React.useState(0);
  const [hits, setHits] = React.useState(0);

  const [game, setGame] = React.useState(players);

  const [showActionSheet, setShowActionSheet] = React.useState(false);

  const sets = [10, 5, 3];

  const _handleScore = (name: any) => {
    let newGame: any = {
      ...game
    };

    let oldHits = (!!newGame[name] && !!newGame[name].hits)
      ? newGame[name].hits
      : [];

    newGame[name] = {
      name,
      hits: [...oldHits, hits]
    };

    setGame(newGame);
    setMisses(0);
    setHits(0);
  };

  const _handleFinishGame = () => {
    let currentPlayers: any = { ...players };
    const points: number[] = [3, 2, 1];

    Object.values(game)
      .sort((a, b) => _sortPlayers(a, b))
      .splice(0, 3)
      .map((player: any, index) => {
        return currentPlayers[player.name].score += points[index];
      });

    onFinish(currentPlayers);
  }

  const _sortPlayers = (curr: any, prev: any) => {
    let currHits = curr.hits;
    let prevHits = prev.hits;

    if (!currHits) return 1;
    if (!prevHits) return -1;

    let q = Math.max(
      currHits.length,
      prevHits.length
    );

    for (let i = 0; i < q; i++) {
      if (currHits[i] < prevHits[i]) return 1;
      if (currHits[i] > prevHits[i]) return -1;
    }

    return 0;
  };

  React.useEffect(() => {
    let setsNum = sets[level]
    if (level >= 3) {
      setsNum = 1;
    }
    if (misses >= setsNum) {
      setShowActionSheet(true);
    }
  }, [misses, level]);

  React.useEffect(() => {
    setGame(players)
  }, [players]);

  const gameSection = !!Object.keys(game).length && (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Players</IonCardSubtitle>
        <IonCardTitle>Game</IonCardTitle>
      </IonCardHeader>
      <IonList inset={true} lines={"full"}>
        {Object.values(game)
          .sort((a, b) => _sortPlayers(a, b))
          .map((player: any, index) => (
            <Player key={index} index={index} player={player} />
          ))}
      </IonList>
    </IonCard>
  );

  return (
    <>
      <GameHeader onDismiss={onDismiss} />
      <IonContent scrollEvents={true}>
        {gameSection}
        <Levels sets={sets} level={level} onFinishGame={_handleFinishGame} onSetLevel={setLevel} />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <Controls hits={hits} misses={misses} onSetHits={setHits} onSetMisses={setMisses} />
        </IonToolbar>
      </IonFooter>
      <IonActionSheet
        isOpen={showActionSheet}
        header="Choose a player"
        backdropDismiss={false}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={Object.values(players).map((player: any) => {
          return {
            text: player.name,
            handler: () => _handleScore(player.name)
          }
        })}
      >
      </IonActionSheet>
    </>
  );
}

export default Game;
