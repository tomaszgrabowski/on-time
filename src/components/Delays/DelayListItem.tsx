import React from 'react';
import { Link } from 'react-router-dom';
import { IDelay } from '../../Shared/IDelay';
import DelayArrivalTimeInfo from './DelayArrivalTimeInfo';
import DelayRowHeader from './DelayRowHeader';
import DelayTimeInfo from './DelayTimeInfo';

interface IProps {
  delay: IDelay;
  busStopNumber: string;
}

const DelayListItem = ( props: IProps ) => {
  return (
    <li className='list-group-item' key={ props.delay.id }>
      <Link to={ `/MapPage/${ props.busStopNumber }/${ props.delay.vehicleId }` }>
        <div className='row'>
          <div className='col-6 text-center'>
            <DelayRowHeader
              routeId={ props.delay.routeId }
              data={ props.delay.headsign }
              delay={ props.delay.delayInSeconds }
              routeNumber={ props.delay.routeId }/>
          </div>
          <div className='col-6'>
            <div>
              <DelayArrivalTimeInfo iconType='list' data={ props.delay.theoreticalTime }/>
              <DelayTimeInfo iconType='history' data={ props.delay.delayInSeconds }/>
              <DelayArrivalTimeInfo iconType='clock' data={ props.delay.estimatedTime }/>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default DelayListItem;
