import React from 'react';

import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/react';

interface ControlsProps {
  misses: any,
  hits: any,
  onSetMisses: any
  onSetHits: any
}

const Controls: React.FC<ControlsProps> = (props) => {
  const { misses, hits, onSetHits, onSetMisses } = props;

  return (
    <IonGrid>
      <IonRow>
        <IonCol style={{ textAlign: "center" }}>
          <IonText>{misses}</IonText>
          <IonButton
            color="danger"
            expand="block"
            onClick={() => onSetMisses(misses + 1)}
          >
            Miss
          </IonButton>
        </IonCol>
        <IonCol style={{ textAlign: "center" }}>
          <IonText>{hits}</IonText>
          <IonButton
            color="success"
            expand="block"
            onClick={() => onSetHits(hits + 1)}
          >
            Hit
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default Controls;