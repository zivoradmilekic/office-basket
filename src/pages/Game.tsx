import React from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

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
  IonActionSheet,
  IonText
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

  const _handleFinishGame = () => {
    let currentPlayers: any = {...players};
    const points: number[] = [3, 2, 1];

    Object.values(game)
      .sort((a, b) => _sortPlayers(a, b))
      .splice(0, 3)
      .map((player:any, index) => {
        currentPlayers[player.name].score += points[index];
      });

    setPlayers(currentPlayers);
    window.history.back();
  }

  const _sortPlayers = (curr:any, prev:any) => {
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
    if (misses >= sets[level]) {
      setShowActionSheet(true);
    }
  }, [misses, level]);

  const gameSection = !!Object.keys(game).length && (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Players</IonCardSubtitle>
        <IonCardTitle>Game</IonCardTitle>
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

  const levelsSection = (
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
      <IonRow>
        <IonCol className="ion-text-center">
          <IonButton color="success" onClick={() => _handleFinishGame()}>
            Finish game
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );

  const controlsSection = (
    <IonGrid>
      <IonRow>
        <IonCol style={{ textAlign: "center" }}>
          <IonText>{misses}</IonText>
          <IonButton
            color="danger"
            expand="block"
            onClick={() => setMisses(misses + 1)}
          >
            Miss
          </IonButton>
        </IonCol>
        <IonCol style={{ textAlign: "center" }}>
          <IonText>{hits}</IonText>
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
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Game</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true}>
        {gameSection}
        {levelsSection}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          {controlsSection}
        </IonToolbar>
      </IonFooter>
      <IonActionSheet
        isOpen={showActionSheet}
        header="Choose a player"
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
