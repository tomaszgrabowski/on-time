import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './DelayRowHeader.css';

interface IProps {
  routeId: number;
  data: string | number;
}

const DelayRowHeader = ( props: IProps ) => {
  const iconType: IconProp = props.routeId < 100 ? 'train' : 'bus';
  return (
    <div className='delay-row-header'>
      <FontAwesomeIcon size='2x' icon={ iconType }/>
      <div className='row'>
        <div className='col-1'>
          <FontAwesomeIcon size='xs' icon='arrow-right' className='delay-time-info-icon'/>
        </div>
        <div className='col-9'>
          <span className='elipsys'>{ props.data }</span>
        </div>
      </div>
    </div>
  );
};

export default DelayRowHeader;
