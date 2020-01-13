import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IProps {
  iconType: IconProp;
  data: number;
}

const DelayTimeInfo = ( props: IProps ) => {
  const delay = ( seconds: number ): string => {
    if ( seconds < 60 && seconds > -60 ) {
      return `${ seconds } sek`;
    }
    return `${ Math.floor( seconds / 60 ) } min`;
  };
  const mathSign = ( seconds: number ): string => {
    if ( Math.sign( seconds ) === 1 ) {
      return '+';
    }
    return '-';
  };
  return (
    <div className='row'>
      <FontAwesomeIcon icon={ props.iconType } size='xs'
                       className='delay-time-info-icon'/> { mathSign( props.data ) } { delay( Math.abs( props.data ) ) }
    </div>
  );
};

export default DelayTimeInfo;
