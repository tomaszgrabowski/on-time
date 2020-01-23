import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import DelaysList from '../components/DelaysList';
import { baseUrl } from '../config';

const BusStop = ( props: RouteComponentProps<{ busStopId: string }> ) => {
  const url = `${baseUrl}/delays/${ props.match.params.busStopId }`;
  const [delays, setDelays] = useState( [] );
  
  useEffect( () => {
    fetch( url )
      .then( rawData => rawData.json()
        .then( data => {
          const { delay } = data;
          setDelays( delay );
        } ) );
  }, [] );
  
  return (
    <Container>
      { delays && <DelaysList delays={ delays } busStopNumber={ props.match.params.busStopId }/> }
    </Container>
  );
};

export default BusStop;
