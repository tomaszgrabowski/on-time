import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './DelayRowHeader.css';

interface IProps {
  iconType: IconProp;
  data: string | number;
}

const DelayRowHeader = ( props: IProps ) => {
  return (
    <div className='delay-row-header'>
      <FontAwesomeIcon size='2x' icon='bus'/>
      <div className='row'>
        <FontAwesomeIcon size='xs' icon={ props.iconType } className='delay-time-info-icon'/>
        { props.data }
      </div>
    </div>
  );
};

export default DelayRowHeader;
