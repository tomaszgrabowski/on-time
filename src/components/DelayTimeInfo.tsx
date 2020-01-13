import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IProps {
  iconType: IconProp;
  data: number;
}

const DelayTimeInfo = ( props: IProps ) => {
  const delay = ( seconds: number ): string => {
    if ( seconds < 60 ) {
      return `${ seconds } sek`;
    }
    return `${ Math.floor(seconds / 60) } min`;
  };
  return (
    <div className='row'>
      <FontAwesomeIcon icon={ props.iconType } size='xs' className='delay-time-info-icon'/> + { delay(props.data) }
    </div>
  );
};

export default DelayTimeInfo;
