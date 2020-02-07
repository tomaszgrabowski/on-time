import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './DelayRowHeader.css';
import { DelayType } from '../../Shared/DelayType';
import DelayTypeBadge from './DelayTypeBadge';

interface IProps {
  routeId: number;
  data: string | number;
  delay: number;
  routeNumber: number;
}

const DelayRowHeader = ( props: IProps ) => {
  const iconType: IconProp = props.routeId < 100 ? 'train' : 'bus';
  const delayType: DelayType = props.delay < 0 ? DelayType.Haste : props.delay > 0 ? DelayType.Delay : DelayType.OnTime;
  return (
    <div className='delay-row-header'>
      <FontAwesomeIcon size='2x' icon={ iconType }/>
      <div><h3>{ props.routeNumber }</h3></div>
      <DelayTypeBadge type={ delayType }/>
      <div className='row delay-row-header__route-data'>
        <div>
          <FontAwesomeIcon size='xs' icon='arrow-right' className='delay-time-info-icon'/>
        </div>
        <div className='delay-row-header__text'>
          { props.data }
        </div>
      </div>
    </div>
  );
};

export default DelayRowHeader;
