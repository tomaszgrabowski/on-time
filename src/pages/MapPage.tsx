import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { IGpsData } from '../Shared/IGpsData';
import { IStop } from '../Shared/IStops';

interface IMarkerProps {
  lat: number;
  lng: number;
  children: JSX.Element[] | JSX.Element
}

const AnyReactComponent = ( props: IMarkerProps ) => (
  <div style={ { position: 'relative', transform: 'translate(-50%, -50%)' } }>
    { props.children }
  </div>
);

const MapPage = ( props: RouteComponentProps<{ vehicleId: string, busStopId: string }> ) => {
  const vehicleId = props.match.params.vehicleId;
  const busStopId = props.match.params.busStopId;
  const gpsPositions = `http://ckan2.multimediagdansk.pl/gpsPositions`;
  const stops = `https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/d3e96eb6-25ad-4d6c-8651-b1eb39155945/download/stopsingdansk.json`;
  const [gpsData, setGpsData] = useState<IGpsData | undefined>( undefined );
  const [stopData, setStopData] = useState<IStop[] | undefined>( [] );
  
  useEffect( () => {
    fetch( gpsPositions )
      .then( raw => raw.json()
        .then( data => {
          const { Vehicles }: { Vehicles: IGpsData[] } = data;
          const vehicle = Vehicles.find( vehicle => vehicle.VehicleId.toString() === vehicleId );
          if ( vehicle ) {
            setGpsData( vehicle );
          }
        } ) );
    fetch( stops )
      .then( raw => raw.json()
        .then( data => {
          const { stops }: { stops: IStop[] } = data;
          console.log( stops );
          setStopData( stops );
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
          defaultZoom={ 15 }>
          
          { stopData?.map( stop => (
            <AnyReactComponent
              lat={ stop.stopLat }
              lng={ stop.stopLon }>
              <FontAwesomeIcon size='3x' icon='map-marker'/>
            </AnyReactComponent>
          ) ) }
          <AnyReactComponent
            lat={ gpsData?.Lat }
            lng={ gpsData?.Lon }>
            <FontAwesomeIcon size='3x' icon='bus' color='red'/>
          </AnyReactComponent>
          
        </GoogleMapReact> }
      </div>
    </Container>
  );
};

export default MapPage;
