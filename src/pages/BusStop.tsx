import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import DelaysCardsList from '../components/DelaysCard/DelaysCardsList';
import Container from '../components/Container';
import { DataContext } from '../Shared/DataContext';
import { getDelay } from '../Shared/DataService';

const BusStop = ( props: RouteComponentProps<{ busStopId: string }> ) => {
    const [delays, setDelays] = useState( [] );
    const dataContext = useContext( DataContext );
    const currentStop = dataContext.stopData.find( stop => stop.stopId.toString() === props.match.params.busStopId );
    if ( currentStop ) {
        dataContext.setCurrentStopData( currentStop );
    }
    
    useEffect( () => {
        getDelay( props.match.params.busStopId )
          .then( data => {
              const { delay } = data;
              setDelays( delay );
          } );
    }, [] );
    
    return (
      <Container>
          { delays && <DelaysCardsList delays={ delays } busStopNumber={ props.match.params.busStopId }/> }
      </Container>
    );
};

export default BusStop;
