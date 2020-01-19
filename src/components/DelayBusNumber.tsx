import React from 'react';
import { DelayType } from '../Shared/DelayType';
import DelayTypeBadge from './DelayTypeBadge';

interface IProps {
  delay: number;
  routeNumber: number;
}

const DelayBusNumber = ( props: IProps ) => {
  const delayType: DelayType = props.delay < 0 ? DelayType.Haste : props.delay > 0 ? DelayType.Delay : DelayType.OnTime;
  return (
    <div>
      <span><h3>{ props.routeNumber }</h3></span>
      <DelayTypeBadge type={ delayType }/>
    </div>
  );
};

export default DelayBusNumber;
