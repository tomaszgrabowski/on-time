import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICommonStop } from './../../backend/Common.interfaces';
import * as geolib from 'geolib';
import GoogleMapReact from 'google-map-react';
import React, { useContext, useEffect, useState } from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import LinkMarker from '../components/Map/LinkMarker';
import Marker from '../components/Map/Marker';
import { DataContext } from '../Shared/DataContext';
import { getGpsData, getStops } from '../Shared/DataService';
import { IGpsData } from '../Shared/IGpsData';
import { IStop } from '../Shared/IStops';
import { getLocalCache } from '../Shared/LocalStorageService';


const MapPage = ( props: RouteComponentProps<{ city: string, vehicleId: string, busStopId: string }> & GeolocatedProps ) => {
  const vehicleId = props.match.params.vehicleId;
  const stopId = props.match.params.busStopId;
  const city = props.match.params.city;
  
  const longitude = props.coords?.longitude;
  const latitude = props.coords?.latitude;
  
  const [vehicleData, setVehicleData] = useState<IGpsData | undefined>( undefined );
  const [currentStopData, setCurrentStopData] = useState<IStop | undefined>( undefined );
  const [stops, setStops] = useState<IStop[] | undefined>( undefined );
  
  const dataContext = useContext( DataContext );
  
  useEffect( () => {
    getStops(city).then( data => {
      const currentStop = getLocalCache().stops.find( ( stop: IStop ) => stop.stopId.toString() === stopId );
      if ( currentStop ) {
        setCurrentStopData( currentStop );
      }
    } );
    getGpsData(city).then( data => {
      const vehicle = data.Vehicles.find( ( vehicle: any ) => vehicle.VehicleId.toString() === vehicleId );
      if ( vehicle ) {
        setVehicleData( vehicle );
      }
    } );
    
    
    const stops = dataContext.stopData;
    if ( stops && props.match.params.busStopId === '0' ) {
      if ( longitude && latitude ) {
        const x: any = stops.filter( ( stop: ICommonStop ) =>
            geolib.isPointWithinRadius( {
                  longitude: stop.stopLon,
                  latitude: stop.stopLat
                },
                { longitude: longitude, latitude: latitude }
                , 1000 ) );
        setStops( x );
      }
    }
  }, [props.coords] );
  
  return (
      <Container>
        <div style={ { height: '80vh', width: '100%' } }>
          { latitude && longitude ? <span>
                        <GoogleMapReact
                            bootstrapURLKeys={ { key: process.env.REACT_APP_MAPS_KEY || '' } }
                            defaultCenter={ { lat: latitude, lng: longitude } }
                            defaultZoom={ 15 }>
                        
                        { stops && stops.map( stop => (
                            <LinkMarker
                                key={ stop.stopId }
                                lat={ stop.stopLat }
                                lng={ stop.stopLon }
                                busStopNumber={ stop.stopId }
                                city={city}
                            >
                              <FontAwesomeIcon size='3x' icon='map-pin' color='Gray'/>
                            </LinkMarker>) ) }
                          { longitude && latitude && <Marker lat={ latitude } lng={ longitude }>
                            <FontAwesomeIcon size='3x' icon='male' color='Gray'/>
                          </Marker> }
                          { currentStopData &&
                          <Marker lat={ currentStopData?.stopLat } lng={ currentStopData?.stopLon }>
                            <FontAwesomeIcon size='3x' icon='map-pin' color='Gray'/>
                          </Marker> }
                          { vehicleData && <Marker
                            lat={ vehicleData?.Lat }
                            lng={ vehicleData?.Lon }>
                            <FontAwesomeIcon size='3x' icon='bus' color='DeepPink'/>
                          </Marker> }
                    </GoogleMapReact>
                    <button className='btn btn-link btn-block' onClick={ () => props.history.goBack() }>
                        Powrót
                    </button>
                </span> :
              <div className='text-center'>
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div> }
        </div>
      </Container>
  );
};

export default geolocated()( MapPage );
