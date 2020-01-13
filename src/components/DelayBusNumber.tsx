import React from 'react';

interface IProps {
  isDelayed: boolean;
  routeNumber: number;
}
const DelayBusNumber = (props: IProps) => {
  const badgeClass = props.isDelayed ? 'badge-warning' : 'badge-success';
  return (
      <span className={`badge ${badgeClass}`}><h3>{ props.routeNumber }</h3></span>
  );
};

export default DelayBusNumber;
