import React from 'react';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonText
} from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Office Basket</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol style={{ textAlign: "center" }}>
              <IonText>
                Have a fun! Take a break of your hard work!
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol style={{ textAlign: "center" }}>
              <IonButton routerLink="/game">
                Play new game
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
