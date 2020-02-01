import React, { useContext, useEffect, useState } from 'react';
import { geolocated } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { appName } from '../config';
import Logo from '../logo.png';
import { DataContext } from '../Shared/DataContext';
import { getStops } from '../Shared/DataService';
import { getStopsFromLocalCache } from '../Shared/LocalStorageService';

const LoadingPage = ( props: RouteComponentProps ) => {
    const [progressValue, setProgressValue] = useState( 0 );
    const [error, setError] = useState( false );
    const dataContext = useContext( DataContext );
    const { tooOld, stops } = getStopsFromLocalCache();
    
    useEffect( () => {
        const promises: Promise<any>[] = [];
        
        if ( !tooOld ) {
            dataContext.setStopData( stops );
            setProgressValue( progressValue + 50 );
        } else {
            const stops = getStops
              .then( data => {
                    dataContext.setStopData( data.stops );
                    localStorage.setItem( 'stops', JSON.stringify( data ) );
                    setProgressValue( progressValue + 50 );
                }
              );
            promises.push( stops );
        }
        
        Promise.all( promises )
          .then( () => props.history.push( '/stopsList' ) )
          .catch( ( err ) => setError( true ) );
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
                <p>Mamy aktualnie problem z pozyskaniem danych od ZTM Gdańsk. Prosimy spróbuj ponownie za kilka
                  minut...</p>
              </div> }
          </section>
      </Container>
    );
};

export default geolocated()( LoadingPage );
