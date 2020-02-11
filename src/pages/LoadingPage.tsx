import React, { useContext, useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { DataContext } from '../Shared/DataContext';
import { getStops } from '../Shared/DataService';
import { getLocalCache } from '../Shared/LocalStorageService';

const LoadingPage = ( props: RouteComponentProps<{ city: string }> ) => {
  
  const promises: Promise<any>[] = [];
  const [error, setError] = useState( false );
  const dataContext = useContext( DataContext );
  const currentCity = props.match.params.city;
  
  useEffect( () => {
    
    const { tooOld, stops, city } = getLocalCache();
    
    if ( !tooOld && city === currentCity ) {
      dataContext.setStopData( stops );
    } else {
      const _stops = getStops( currentCity )
          .then( data => {
                dataContext.setStopData( data );
                localStorage.setItem( 'stops', JSON.stringify( data ) );
                localStorage.setItem( 'lastUpdate', `"${ new Date().toISOString() }"` );
                localStorage.setItem('city', currentCity);
              }
          );
      promises.push( _stops );
    }
    
    Promise.all( promises )
        .then( () => props.history.push( `/stopsList/${ currentCity }` ) )
        .catch( ( err ) => setError( true ) );
  }, [] );
  
  return (
      <Container className='text-center'>
        <br/>
        <br/>
        <section>
          <div>
            <h3>Pobieranie aktualnych danych...</h3>
            <div className="spinner-border text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <br/>
          { error && <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Nieoczekiwany błąd!</h4>
            <p>Mamy aktualnie problem z pozyskaniem danych od ZTM Gdańsk. Prosimy spróbuj ponownie za kilka
              minut...</p>
          </div> }
        </section>
      </Container>
  );
};

export default geolocated()( LoadingPage );
