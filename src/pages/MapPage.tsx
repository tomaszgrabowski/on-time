import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as geolib from 'geolib';
import GoogleMapReact from 'google-map-react';
import React, { useEffect, useState } from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import LinkMarker from '../components/LinkMarker';
import Marker from '../components/Marker';
import { IGpsData } from '../Shared/IGpsData';
import { IStop } from '../Shared/IStops';


const MapPage = ( props: RouteComponentProps<{ vehicleId: string }> & GeolocatedProps ) => {
  const vehicleId = props.match.params.vehicleId;
  const longitude = props.coords?.longitude;
  const latitude = props.coords?.latitude;
  const gpsPositions = `/gpsPositions`;
  const stops = `/stops`;
  
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
  }, [] );
  
  useEffect( () => {
    fetch( stops )
      .then( raw => raw.json()
        .then( ( data: IStop[] ) => {
          
          if ( longitude && latitude ) {
            const x: any = data.filter( ( stop: IStop ) =>
              geolib.isPointWithinRadius( {
                  longitude: stop.stopLon,
                  latitude: stop.stopLat
                },
                { longitude: longitude, latitude: latitude }
                , 2000 ) );
            setStopData( x );
          }
        } ) );
  }, [props.coords] );
  
  return (
    <Container>
      <div style={ { height: '100vh', width: '100%' } }>
        { latitude && longitude && <GoogleMapReact
          bootstrapURLKeys={ { key: process.env.REACT_APP_MAPS_KEY || '' } }
          defaultCenter={ { lat: latitude, lng: longitude } }
          defaultZoom={ 15 }>
          
          { stopData?.map( stop => (
            <LinkMarker
              key={ stop.stopId }
              lat={ stop.stopLat }
              lng={ stop.stopLon }
              busStopNumber={ stop.stopId }
            >
              <FontAwesomeIcon size='3x' icon='map-pin' color='Gray'/>
            </LinkMarker>
          ) ) }
          
          { gpsData && <Marker
            lat={ gpsData?.Lat }
            lng={ gpsData?.Lon }>
            <FontAwesomeIcon size='3x' icon='bus' color='DeepPink'/>
          </Marker> }
        </GoogleMapReact> }
      </div>
    </Container>
  );
};

export default geolocated()( MapPage );
