import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IDelay } from '../Shared/IDelay';
import DelayTimeInfo from './DelayTimeInfo';

interface IProps {
  delay: IDelay
}

const DelayListItem = ( props: IProps ) => {
  return (
    <li className='list-group-item' key={ props.delay.id }>
      <div className='row'>
        <div className='col-4 text-center vertical-center-column'>
          <FontAwesomeIcon size='2x' icon='bus'/>
          <div className='row'>
            <FontAwesomeIcon size='xs' icon='arrow-right'/>{ props.delay.headsign }
          </div>
        
        </div>
        <div className='col-4 text-center'>
          <h3>{ props.delay.routeId }</h3>
        </div>
        <div className='col-4 text-center'>
          <DelayTimeInfo iconType='list' data={ props.delay.theoreticalTime }/>
          <DelayTimeInfo iconType='history' data={ props.delay.delayInSeconds }/>
          <DelayTimeInfo iconType='clock' data={ props.delay.estimatedTime }/>
        </div>
      </div>
    </li>
  );
};

export default DelayListItem;
