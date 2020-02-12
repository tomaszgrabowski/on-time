import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import DelaysCardsList from '../components/DelaysCard/DelaysCardsList';
import { DataContext } from '../Shared/DataContext';
import { getDelay } from '../Shared/DataService';

// useReducer here
const BusStop = ( props: RouteComponentProps<{ city: string, busStopId: string }> ) => {
  const busStopId = props.match.params.busStopId;
  const city = props.match.params.city;
  
  const [delays, setDelays] = useState( [] );
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( false );
  const dataContext = useContext( DataContext );
  const currentStop = dataContext.stopData.find( stop => stop.stopId.toString() === busStopId );
  if ( currentStop ) {
    dataContext.setCurrentStopData( currentStop );
  }
  
  useEffect( () => {
    getDelay( city, busStopId )
        .then( data => {
          const { delay } = data;
          setDelays( delay );
          setLoading( false );
        }, reason => setError( true ) );
  }, [] );
  
  return (
      <Container>
        { delays.length === 0 ?
            <span>
              <div className="alert alert-info" role="alert">
                Aktualnie żaden pojazd nie zmierza na ten przystanek...
              </div>
            </span>
            :
            <DelaysCardsList loading={ loading } error={ error } delays={ delays } busStopNumber={ props.match.params.busStopId }
                             city={ city }/> }
        <button className='btn btn-link btn-block' onClick={ () => props.history.goBack() }>
          Powrót
        </button>
      </Container>
  );
};

export default BusStop;
