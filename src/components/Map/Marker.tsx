import React from 'react';

interface IMarkerProps {
  lat: string;
  lng: string;
  children: JSX.Element[] | JSX.Element
}

const Marker = ( props: IMarkerProps ) => (
  <div style={ { position: 'relative', transform: 'translate(-50%, -50%)' } }>
    { props.children }
  </div>
);

export default Marker;
