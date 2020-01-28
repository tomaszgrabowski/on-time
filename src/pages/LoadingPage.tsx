import React, { useContext, useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { appName } from '../config';
import Logo from '../logo.png';
import { DataContext } from '../Shared/DataContext';
import { IGpsData } from '../Shared/IGpsData';
import { IStop } from '../Shared/IStops';

const LoadingPage = ( props: RouteComponentProps ) => {
  const [progressValue, setProgressValue] = useState( 0 );
  const [error, setError] = useState( false );
  const dataContext = useContext( DataContext );
  
  useEffect( () => {
    const gpsData = fetch( `/gpsPositions` )
      .then( raw => raw.json()
        .then( data => {
          const { Vehicles }: { Vehicles: IGpsData[] } = data;
          dataContext.setGpsData( Vehicles );
          setProgressValue( progressValue + 50 );
        } ) );
    const stops = fetch( `/stops` )
      .then( raw => raw.json()
        .then( ( data: IStop[] ) => {
          dataContext.setStopData( data );
          setProgressValue( progressValue + 50 );
        } ) );
    
    Promise.all( [gpsData, stops] )
      .then( () => props.history.push( '/info' ) )
      .catch( () => setError( true ) );
  }, [] );
  
  return (
    <Container className='text-center'>
      <img src={ Logo } alt={ appName }/>
      <section>
        <p>
          Trwa ładowanie danych...
        </p>
        <div className="progress">
          <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow={ progressValue }
               style={ { width: `${ progressValue }%` } }
               aria-valuemin={ 0 } aria-valuemax={ 100 }>&nbsp;</div>
        </div>
        <br/>
        { error && <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Nieoczekiwany błąd!</h4>
          <p>Mamy aktualnie problem z pozyskaniem danych od ZTM Gdańsk. Prosimy spróbuj ponownie za kilka minut...</p>
        </div> }
      </section>
    </Container>
  );
};

export default geolocated()( LoadingPage );
