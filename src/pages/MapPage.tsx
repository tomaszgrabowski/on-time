import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';

interface IProps {
  vehicleId: string
}

const MapPage = ( props: RouteComponentProps<{ vehicleId: string }> ) => {
  
  const url = `http://ckan2.multimediagdansk.pl/gpsPositions`;
  const [vehicles, setVechilces] = useState( [] );
  
  useEffect( () => {
    fetch( url )
      .then( raw => raw.json()
        .then( data => {
          const { Vehicles } = data;
          setVechilces( Vehicles );
        } ) );
  } );
  return (
    <Container>
      { props.match.params.vehicleId }
    </Container>
  );
};

export default MapPage;
