import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GoogleMapReact from 'google-map-react';
import React, { useContext, useEffect, useState } from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
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
  }, [] );
  
  
  // useEffect( () => {
  //   fetch( gpsPositions )
  //     .then( raw => raw.json()
  //       .then( data => {
  //         const { Vehicles }: { Vehicles: IGpsData[] } = data;
  //         const vehicle = Vehicles.find( vehicle => vehicle.VehicleId.toString() === vehicleId );
  //         if ( vehicle ) {
  //           setGpsData( vehicle );
  //         }
  //       } ) );
  // }, [] );
  
  // useEffect( () => {
  //   fetch( stops )
  //     .then( raw => raw.json()
  //       .then( ( data: IStop[] ) => {
  //
  //         if ( longitude && latitude ) {
  //           const x: any = data.filter( ( stop: IStop ) =>
  //             geolib.isPointWithinRadius( {
  //                 longitude: stop.stopLon,
  //                 latitude: stop.stopLat
  //               },
  //               { longitude: longitude, latitude: latitude }
  //               , 2000 ) );
  //           setStopData( x );
  //         }
  //       } ) );
  // }, [props.coords] );
  
  return (
    <Container>
      <div style={ { height: '100vh', width: '100%' } }>
        { latitude && longitude && <GoogleMapReact
          bootstrapURLKeys={ { key: process.env.REACT_APP_MAPS_KEY || '' } }
          defaultCenter={ { lat: latitude, lng: longitude } }
          defaultZoom={ 15 }>
          
          {/*{ stopData?.map( stop => (*/ }
          {/*  <LinkMarker*/ }
          {/*    key={ stop.stopId }*/ }
          {/*    lat={ stop.stopLat }*/ }
          {/*    lng={ stop.stopLon }*/ }
          {/*    busStopNumber={ stop.stopId }*/ }
          {/*  >*/ }
          {/*    <FontAwesomeIcon size='3x' icon='map-pin' color='Gray'/>*/ }
          {/*  </LinkMarker>*/ }
          {/*) ) }*/ }
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
