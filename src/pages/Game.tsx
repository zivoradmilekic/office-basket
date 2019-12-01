import React from 'react';

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
  IonBadge
} from '@ionic/react';

const Game: React.FC = () => {
  const [level, setLevel] = React.useState(0);
  const [misses, setMisses] = React.useState(0);
  const [hits, setHits] = React.useState(0);

  const [players, setPlayers] = React.useState({
    // a: {
    //   name: "a",
    //   hits: [5, 3, 2, 1]
    // },
    // q: {
    //   name: "q",
    //   hits: [5, 1, 2, 1]
    // },
    // s: {
    //   name: "s",
    //   hits: [5, 11, 2, 1]
    // },
    // e: {
    //   name: "e",
    //   hits: [6, 5, 2, 1]
    // },
    // t: {
    //   name: "t",
    //   hits: [5, 333, 2, 5]
    // }
  });

  const sets = [10, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const _handleScore = () => {
    const name:any = prompt(`Game over! Enter player name`);
    let newPlayers:any = {
      ...players
    };

    let oldHits = !!newPlayers[name] ? newPlayers[name].hits : [];

    newPlayers[name] = {
      name,
      hits: [...oldHits, hits]
    };

    setPlayers(newPlayers);
    setMisses(0);
    setHits(0);
  };

  const _sortPlayers = (curr:any, prev:any) => {
    let currHits = curr.hits;
    let prevHits = prev.hits;
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
      _handleScore();
    }
  }, [misses, level]);

  const playersDisplay = !!Object.keys(players).length && (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Scoreboard</IonCardSubtitle>
        <IonCardTitle>Players</IonCardTitle>
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
                {player.hits.map((hit:any, i:number) => (
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
        {playersDisplay}
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
      </IonFooter>
    </IonPage>
  );
}

export default Game;
