import React from 'react';
import { Link } from 'react-router-dom';

interface IMarkerProps {
  lat: number;
  lng: number;
  children: JSX.Element[] | JSX.Element,
  busStopNumber?: number;
  city?: string;
}

const LinkMarker = ( props: IMarkerProps ) => (
  <div style={ { position: 'relative', transform: 'translate(-50%, -50%)' } }>
    <Link to={ `/busStop/${props.city}/${ props.busStopNumber }` }>{ props.children }</Link>
  </div>
);

export default LinkMarker;
