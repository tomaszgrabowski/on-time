import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { IGpsData } from '../Shared/IGpsData';

interface IMarkerProps {
  lat: number;
  lng: number;
  text: string;
}

const Marker = (props: IMarkerProps) => {
  return (
    // <FontAwesomeIcon size='2x' icon='train' />
    <div>{props.text}</div>
  );
};

const MapPage = ( props: RouteComponentProps<{ vehicleId: string }> ) => {
  const vehicleId = props.match.params.vehicleId;
  const url = `http://ckan2.multimediagdansk.pl/gpsPositions`;
  const [gpsData, setGpsData] = useState<IGpsData | undefined>( undefined );
  
  useEffect( () => {
    fetch( url )
      .then( raw => raw.json()
        .then( data => {
          const { Vehicles }: { Vehicles: IGpsData[] } = data;
          const x = Vehicles.find( vehicle => vehicle.VehicleId.toString() === vehicleId );
          if ( x ) {
            setGpsData( x );
            console.log( x );
          }
        } ) );
  }, [] );
  return (
    <Container>
      <div style={ { height: '100vh', width: '100%' } }>
        { gpsData && <GoogleMapReact
          bootstrapURLKeys={ { key: 'AIzaSyADaUas3fkIvSfHUqJfR9w1vOu_eVPgEdM' } }
          defaultCenter={ {
            lat: gpsData.Lat,
            lng: gpsData.Lon
          } }
          defaultZoom={ 16 }>
          <Marker
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact> }
      </div>
    </Container>
  );
};

export default MapPage;
