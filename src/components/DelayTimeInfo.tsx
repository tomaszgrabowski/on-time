import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IProps {
  iconType: IconProp;
  data: string | number;
  postfix?: string;
}

const DelayTimeInfo = ( props: IProps ) => {
  return (
    <div className='row'>
      <FontAwesomeIcon icon={ props.iconType } size='xs' className='delay-time-info-icon'/>{ props.data } {props.postfix}
    </div>
  );
};

export default DelayTimeInfo;
