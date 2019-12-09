import React from 'react';

import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/react';

import { flame } from "ionicons/icons";

interface HeaderProps {
  onSetPlayers: any
}

const Header: React.FC<HeaderProps> = (props) => {
  const { onSetPlayers } = props;

  return (
    <IonHeader>
      <IonToolbar color="dark">
        <IonTitle>Office Basket</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => onSetPlayers({})}>
            <IonIcon slot="icon-only" icon={flame} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header;