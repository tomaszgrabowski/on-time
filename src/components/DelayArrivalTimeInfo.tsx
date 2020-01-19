import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IProps {
  iconType: IconProp;
  data: string | number;
}

const DelayArrivalTimeInfo = ( props: IProps ) => {
  return (
    <div className='col-sm-12'>
      <FontAwesomeIcon icon={ props.iconType } size='xs' className='delay-time-info-icon'/>{ props.data }
    </div>
  );
};

export default DelayArrivalTimeInfo;
