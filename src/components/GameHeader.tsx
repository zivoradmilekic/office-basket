import React from 'react';

import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/react';

import { closeCircleOutline } from "ionicons/icons";

interface GameHeaderProps {
  onDismiss: any
}

const GameHeader: React.FC<GameHeaderProps> = (props) => {
  const { onDismiss } = props;

  return (
    <IonHeader>
      <IonToolbar color="dark">
        <IonTitle>Game</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => onDismiss()}>
            <IonIcon slot="icon-only" icon={closeCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default GameHeader;