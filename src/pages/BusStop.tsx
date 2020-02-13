import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AlertLevel } from '../Shared/AlertLevel';
import Alert from '../components/Alert';
import Container from '../components/Container';
import DelaysCardsList from '../components/DelaysCard/DelaysCardsList';
import { getDelay } from '../Shared/DataService';

// useReducer here
const BusStop = ( props: RouteComponentProps<{ city: string, busStopId: string }> ) => {
    
    const { busStopId, city } = props.match.params;
    
    const [delays, setDelays] = useState( [] );
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState( false );
    
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
          { delays.length === 0 && !loading ?
            <Alert level={ AlertLevel.Warning } message='Aktualnie żaden pojazd nie zmierza na ten przystanek...'/>
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
