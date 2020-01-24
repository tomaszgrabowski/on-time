import React from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { appName } from '../config';
import Logo from '../logo.png';

const InfoPage = ( props: RouteComponentProps<{ vehicleId: string }> & GeolocatedProps ) => {
  const enabled = props.coords || false;
  
  const agreeBadge = enabled ? <span className="badge badge-success">Ok</span> :
    <span className="badge badge-danger">Brak zgody na lokalizację</span>;
  if ( enabled ) {
    window.setTimeout( () =>
      props.history.push( '/stopsList' ), 3000 );
  }
  return (
    <Container className='text-center'>
      <img src={ Logo } alt={ appName }/>
      <section>
        <h2>
          Szanowny użytkowniku!
        </h2>
        { !enabled && <p>
          Do poprawnego działania naszej aplikacji niezbedne jest wyrażenie zgody na zlokalizowanie urządzenia.
          Musimy to zrobić, aby jak najtrafniej określić które przystanki komunikacji miejskiej leżą w najbliższej
          okolicy.
          Żadne dane nie zostaną zapisane lub przesłane dalej bez twojej wyraźnej zgody.
          Prosimy o kliknięcie przycisku "Ok" lub wyłączenie naszej aplikacji.
        </p> }
        { enabled && <p>
          Sprawdzamy czy możliwa jest lokalizacja urządzenia...
        </p> }
        <br/><br/>
        { agreeBadge }
      </section>
    </Container>
  );
};

export default geolocated()( InfoPage );
