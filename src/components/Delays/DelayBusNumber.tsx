import React from 'react';
import { DelayType } from '../../Shared/DelayType';
import DelayTypeBadge from './DelayTypeBadge';

interface IProps {
  delay: number;
}

const DelayBusNumber = ( props: IProps ) => {
  const delayType: DelayType = props.delay < 0 ? DelayType.Haste : props.delay > 0 ? DelayType.Delay : DelayType.OnTime;
  return (
    <div>
      <DelayTypeBadge type={ delayType }/>
    </div>
  );
};

export default DelayBusNumber;
