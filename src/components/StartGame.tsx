import React from 'react';

import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText
} from '@ionic/react';

interface StartGameProps {
  onShowModal: any,
}

const StartGame: React.FC<StartGameProps> = (props) => {
  const { onShowModal } = props;

  return (
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
          <IonButton onClick={() => onShowModal(true)}>
            Play new game
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default StartGame;