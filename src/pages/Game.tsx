import React from 'react';

import useLocalStorage from '../useLocalStorage';

import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonFooter,
  IonList,
  IonLabel,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonNote,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBadge,
  IonActionSheet
} from '@ionic/react';

const Game: React.FC = () => {
  const [players, setPlayers] = useLocalStorage('players', {});
  const [level, setLevel] = React.useState(0);
  const [misses, setMisses] = React.useState(0);
  const [hits, setHits] = React.useState(0);
  const [showActionSheet, setShowActionSheet] = React.useState(false);

  const [game, setGame] = React.useState(players);

  const sets = [10, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const _handleScore = (name:any) => {
    let newGame:any = {
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

  const _sortPlayers = (curr:any, prev:any) => {
    let currHits = curr.hits;
    let prevHits = prev.hits;
    if (!currHits || !prevHits) return 0;

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
    console.log("Misses", misses);
    if (misses >= sets[level]) {
      setShowActionSheet(true);
    }
  }, [misses, level]);

  const gameDisplay = !!Object.keys(game).length && (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Scoreboard</IonCardSubtitle>
        <IonCardTitle>Players</IonCardTitle>
      </IonCardHeader>
      <IonList inset={true} lines={"full"}>
        {Object.values(game)
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
                {!!player.hits && player.hits.map((hit:any, i:number) => (
                  <IonBadge key={i} color="primary" style={{ marginLeft: "0.5rem" }}>
                    {hit}
                  </IonBadge>
                ))}
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
          <IonTitle>Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true}>
        {gameDisplay}
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol className="ion-text-center">
              <IonTitle>{sets[level]} misses allowed</IonTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonButton color="warning" onClick={() => setLevel(level + 1)}>
                Level up ({level + 1})
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol style={{ textAlign: "center" }}>
                <IonNote>{misses}</IonNote>
                <IonButton
                  color="danger"
                  expand="block"
                  onClick={() => setMisses(misses + 1)}
                >
                  Miss
                </IonButton>
              </IonCol>
              <IonCol style={{ textAlign: "center" }}>
                <IonNote>{hits}</IonNote>
                <IonButton
                  color="success"
                  expand="block"
                  onClick={() => setHits(hits + 1)}
                >
                  Hit
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
      <IonActionSheet
        isOpen={showActionSheet}
        backdropDismiss={false}
        onDidDismiss={() => setShowActionSheet(false)}
        buttons={Object.values(players).map((player:any) => {
          return {
            text: player.name,
            handler: () => _handleScore(player.name)
          }
        })}
      >
      </IonActionSheet>
    </IonPage>
  );
}

export default Game;
