import React from 'react';
import { IDelay } from '../Shared/IDelay';
import DelayBusNumber from './DelayBusNumber';
import DelayRowHeader from './DelayRowHeader';
import DelayArrivalTimeInfo from './DelayArrivalTimeInfo';
import DelayTimeInfo from './DelayTimeInfo';

interface IProps {
  delay: IDelay
}

const DelayListItem = ( props: IProps ) => {
  return (
    <li className='list-group-item' key={ props.delay.id }>
      <div className='row'>
        <div className='col-5 text-center'>
          <DelayRowHeader routeId={props.delay.routeId} data={ props.delay.headsign }/>
        </div>
        <div className='col-4 text-center'>
          <DelayBusNumber isDelayed={ props.delay.delayInSeconds !== 0 } routeNumber={ props.delay.routeId }/>
        </div>
        <div className='col-3 text-center'>
          <DelayArrivalTimeInfo iconType='list' data={ props.delay.theoreticalTime }/>
          <DelayTimeInfo iconType='history' data={ props.delay.delayInSeconds }/>
          <DelayArrivalTimeInfo iconType='clock' data={ props.delay.estimatedTime }/>
        </div>
      </div>
    </li>
  );
};

export default DelayListItem;
