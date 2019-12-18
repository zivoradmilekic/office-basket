import React from 'react';

import {
  IonToolbar,
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButtons,
  IonIcon
} from '@ionic/react';

import { addCircleOutline } from "ionicons/icons";

interface ListHeaderProps {
  onAddPlayer: any
}

const ListHeader: React.FC<ListHeaderProps> = (props) => {
  const { onAddPlayer } = props;

  return (
    <IonCardHeader>
      <IonToolbar>
        <IonCardSubtitle>Players</IonCardSubtitle>
        <IonCardTitle>Scoreboard</IonCardTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => onAddPlayer()}>
            <IonIcon slot="icon-only" icon={addCircleOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonCardHeader>
  )
}

export default ListHeader;