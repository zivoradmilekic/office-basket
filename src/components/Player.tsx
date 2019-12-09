import React from 'react';

import {
  IonItem,
  IonLabel,
  IonNote,
  IonBadge
} from '@ionic/react';

interface PlayerProps {
  index: any,
  player: any
}

const Player: React.FC<PlayerProps> = (props) => {
  const { index, player } = props;
  let score = null;
  if (!!player.score) {
    score = (<IonBadge color="primary" style={{ marginLeft: "0.5rem" }}>
      {player.score}
    </IonBadge>)
  } else if (!!player.hits) {
    score = player.hits.map((hit: any, i: number) => (
      <IonBadge key={i} color="primary" style={{ marginLeft: "0.5rem" }}>
        {hit}
      </IonBadge>
    ));
  }
  console.log(player);
  return (
    <IonItem>
      <IonLabel>
        <IonNote style={{ marginRight: "0.5rem" }}>
          {index + 1}
        </IonNote>
        {player.name}
      </IonLabel>
      <IonNote slot="end">
        {score}
      </IonNote>
    </IonItem>
  )
}

export default Player;