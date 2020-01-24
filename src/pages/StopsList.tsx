import * as geolib from 'geolib';
import React, { useContext, useState } from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { DataContext } from '../Shared/DataContext';
import { ICoords } from '../Shared/ICoords';

const StopsList = ( props: RouteComponentProps<{ vehicleId: string }> & GeolocatedProps ) => {
  const data = useContext( DataContext );
  const [userLocation, setUserLocation] = useState( {
    latitude: props.coords?.latitude,
    longitude: props.coords?.longitude
  } );
  const isNearStop = ( point: ICoords ): boolean =>
    geolib.isPointWithinRadius(
      point,
      {
        latitude: props.coords?.latitude || 0,
        longitude: props.coords?.longitude || 0
      },
      1500
    );
  
  return (
    <Container>
      <br/>
      <br/>
      <h3 className='text-center'>Najbliższe przystanki</h3>
      <div className="list-group">
        { data.stopData.filter( stop => isNearStop( {
          longitude: stop.stopLon,
          latitude: stop.stopLat
        } ) ).map( stop => <a href={`/busStop/${stop.stopId}`} key={stop.stopId} className="list-group-item">{ stop.stopName } { stop.subName }</a> ) }
        <a className="list-group-item list-group-item-dark"><b>Wskaż na mapie</b></a>
      </div>
    </Container>
  );
};

export default geolocated()(StopsList);
