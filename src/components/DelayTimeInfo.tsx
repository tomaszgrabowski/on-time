import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface IProps {
  iconType: IconProp;
  data: string | number;
}

const DelayTimeInfo = ( props: IProps ) => {
  return (
    <div className='row'>
      <FontAwesomeIcon icon={ props.iconType } size='xs'/>{ props.data }
    </div>
  );
};

export default DelayTimeInfo;
