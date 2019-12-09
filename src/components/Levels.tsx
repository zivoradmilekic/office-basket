import React from 'react';

import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonTitle
} from '@ionic/react';

interface LevelsProps {
  sets: any,
  level: any
  onSetLevel: any
  onFinishGame: any
}

const Levels: React.FC<LevelsProps> = (props) => {
  const { level, sets, onSetLevel, onFinishGame } = props;

  return (
    <IonGrid className="ion-padding">
      <IonRow>
        <IonCol className="ion-text-center">
          <IonTitle>{level >= 3 ? 1 : sets[level]} misses allowed</IonTitle>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-center">
          <IonButton color="warning" onClick={() => onSetLevel(level + 1)}>
            Level up ({level + 1})
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-center">
          <IonButton color="success" onClick={() => onFinishGame()}>
            Finish game
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default Levels;