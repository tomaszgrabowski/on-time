import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { appName, baseUrl } from '../config';
import Logo from '../logo.png';
import { DataContext } from '../Shared/DataContext';
import { IGpsData } from '../Shared/IGpsData';
import { IStop } from '../Shared/IStops';

const LoadingPage = ( props: RouteComponentProps ) => {
  const dataContext = useContext( DataContext );
  
  useEffect( () => {
    const gpsData = fetch( `${ baseUrl }/gpsPositions` )
      .then( raw => raw.json()
        .then( data => {
          const { Vehicles }: { Vehicles: IGpsData[] } = data;
          dataContext.setGpsData( Vehicles );
        } ) );
    const stops = fetch( `${ baseUrl }/stops` )
      .then( raw => raw.json()
        .then( ( data: IStop[] ) => {
          dataContext.setStopData( data );
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
        <p>
          <span className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </span>
        </p>
      </section>
    </Container>
  );
};

export default LoadingPage;
