import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as geolib from 'geolib';
import GoogleMapReact from 'google-map-react';
import React, { useContext, useEffect, useState } from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import LinkMarker from '../components/LinkMarker';
import Marker from '../components/Marker';
import { DataContext } from '../Shared/DataContext';
import { IGpsData } from '../Shared/IGpsData';
import { IStop } from '../Shared/IStops';


const MapPage = ( props: RouteComponentProps<{ vehicleId: string, busStopId: string }> & GeolocatedProps ) => {
  const vehicleId = props.match.params.vehicleId;
  const stopId = props.match.params.busStopId;
  const longitude = props.coords?.longitude;
  const latitude = props.coords?.latitude;
  
  const [vehicleData, setVehicleData] = useState<IGpsData | undefined>( undefined );
  const [currentStopData, setCurrentStopData] = useState<IStop | undefined>( undefined );
  const [stops, setStops] = useState<IStop[] | undefined>( undefined );
  
  const dataContext = useContext( DataContext );
  
  useEffect( () => {
    const vehicle = dataContext.gpsData.find( vehicle => vehicle.VehicleId.toString() === vehicleId );
    if ( vehicle ) {
      setVehicleData( vehicle );
    }
    
    const currentStop = dataContext.stopData.find( stop => stop.stopId.toString() === stopId );
    if ( currentStop ) {
      setCurrentStopData( currentStop );
    }
    
    const stops = dataContext.stopData;
    if ( stops && props.match.params.busStopId === '0' ) {
      if ( longitude && latitude ) {
        const x: any = stops.filter( ( stop: IStop ) =>
          geolib.isPointWithinRadius( {
              longitude: stop.stopLon,
              latitude: stop.stopLat
            },
            { longitude: longitude, latitude: latitude }
            , 2000 ) );
        setStops( x );
        console.log(x);
      }
    }
  }, [props.coords] );
  
  return (
    <Container>
      <div style={ { height: '90vh', width: '100%' } }>
        { latitude && longitude && <GoogleMapReact
          bootstrapURLKeys={ { key: process.env.REACT_APP_MAPS_KEY || '' } }
          defaultCenter={ { lat: latitude, lng: longitude } }
          defaultZoom={ 15 }>
          
          { stops && stops.map( stop => (
            <LinkMarker
              key={ stop.stopId }
              lat={ stop.stopLat }
              lng={ stop.stopLon }
              busStopNumber={ stop.stopId }
            >
              <FontAwesomeIcon size='3x' icon='map-pin' color='Gray'/>
            </LinkMarker>) ) }
          { longitude && latitude && <Marker lat={ latitude } lng={ longitude }>
            <FontAwesomeIcon size='3x' icon='male' color='Gray'/>
          </Marker> }
          { currentStopData && <Marker lat={ currentStopData?.stopLat } lng={ currentStopData?.stopLon }>
            <FontAwesomeIcon size='3x' icon='map-pin' color='Gray'/>
          </Marker> }
          { vehicleData && <Marker
            lat={ vehicleData?.Lat }
            lng={ vehicleData?.Lon }>
            <FontAwesomeIcon size='3x' icon='bus' color='DeepPink'/>
          </Marker> }
        </GoogleMapReact> }
      </div>
    </Container>
  );
};

export default geolocated()( MapPage );
