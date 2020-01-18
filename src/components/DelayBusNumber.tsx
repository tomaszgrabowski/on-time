import React from 'react';

interface IProps {
  delay: number;
  routeNumber: number;
}

const DelayBusNumber = ( props: IProps ) => {
  const badgeClass = props.delay < 0 ? 'badge-danger' : props.delay > 0 ? 'badge-warning' : 'badge-success';
  return (
    <span className={ `badge ${ badgeClass }` }><h3>{ props.routeNumber }</h3></span>
  );
};

export default DelayBusNumber;
