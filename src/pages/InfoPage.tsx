import React from 'react';
import Container from '../components/Container';
import { appName } from '../config';
import Logo from '../logo.png';

const InfoPage = () => {
  return (
    <Container className='text-center'>
      <img src={ Logo } alt={ appName }/>
      <h2>
        Szanowny użytkowniku!
      </h2>
      <p>
        Do poprawnego działania naszej aplikacji niezbedne jest wyrażenie zgody na zlokalizowanie urządzenia.
        Musimy to zrobić, aby jak najtrafniej określić które przystanki komunikacji miejskiej leżą w najbliższej okolicy.
        Żadne dane nie zostaną zapisane lub przesłane dalej bez twojej wyraźnej zgody.
        Prosimy o kliknięcie przycisku "Ok" lub wyłączenie naszej aplikacji.
      </p>
      <br/><br/>
      <button className='btn btn-primary btn-lg btn-block'>Ok</button>
    </Container>
  );
};

export default InfoPage;
