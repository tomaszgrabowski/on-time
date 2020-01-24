import React, { useContext, useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { appName, baseUrl } from '../config';
import Logo from '../logo.png';
import { DataContext } from '../Shared/DataContext';
import { IGpsData } from '../Shared/IGpsData';
import { IStop } from '../Shared/IStops';

const LoadingPage = ( props: RouteComponentProps ) => {
  const [progressValue, setProgressValue] = useState( 0 );
  const dataContext = useContext( DataContext );
  
  useEffect( () => {
    const gpsData = fetch( `${ baseUrl }/gpsPositions` )
      .then( raw => raw.json()
        .then( data => {
          const { Vehicles }: { Vehicles: IGpsData[] } = data;
          dataContext.setGpsData( Vehicles );
          setProgressValue( progressValue + 50 );
        } ) );
    const stops = fetch( `${ baseUrl }/stops` )
      .then( raw => raw.json()
        .then( ( data: IStop[] ) => {
          dataContext.setStopData( data );
          setProgressValue( progressValue + 50 );
        } ) );
    
    Promise.all( [gpsData, stops] ).then( () => props.history.push( '/info' ) );
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
      </section>
    </Container>
  );
};

export default geolocated()( LoadingPage );
