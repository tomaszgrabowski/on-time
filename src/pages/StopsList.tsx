import * as geolib from 'geolib';
import React, { useContext } from 'react';
import { geolocated, GeolocatedProps } from 'react-geolocated';
import { Link, RouteComponentProps } from 'react-router-dom';
import Container from '../components/Container';
import { DataContext } from '../Shared/DataContext';
import { ICoords } from '../Shared/ICoords';

const StopsList = ( props: RouteComponentProps<{ vehicleId: string }> & GeolocatedProps ) => {
  const data = useContext( DataContext );
  const isNearStop = ( point: ICoords ): boolean =>
    geolib.isPointWithinRadius(
      point,
      {
        latitude: props.coords?.latitude || 0,
        longitude: props.coords?.longitude || 0
      },
      500
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
        } ) ).map( stop => <Link to={ `/busStop/${ stop.stopId }` } key={ stop.stopId }
                                 className="list-group-item">{ stop.stopName } { stop.subName }</Link> ) }
        <Link to={ `/mapPage/0/0 `} className="list-group-item list-group-item-dark"><b>Wskaż na mapie</b></Link>
      </div>
    </Container>
  );
};

export default geolocated()( StopsList );
