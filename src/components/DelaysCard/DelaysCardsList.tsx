import React from 'react';
import WithLoading from '../WithLoading';
import DelayCard from '../DelaysCard/DelayCard';
import { IDelay } from '../../Shared/IDelay';

interface IProps {
  delays: IDelay[];
  busStopNumber: string;
  city: string
}

const DelaysCardsList = ( props: IProps ) => {
  return (
      <div className='row'>
        { props.delays.map( ( delay: IDelay ) => <DelayCard key={ delay.trip }
                                                            delay={ delay }
                                                            busStopNumber={ props.busStopNumber }
                                                            city={ props.city }
        /> ) }
      </div>
  );
};

export default WithLoading(DelaysCardsList);
