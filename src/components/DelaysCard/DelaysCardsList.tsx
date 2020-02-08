import React from 'react';
import DelayCard from '../../components/DelaysCard/DelayCard';
import { IDelay } from '../../Shared/IDelay';

interface IProps {
    delays: IDelay[];
    busStopNumber: string;
}

const DelaysCardsList = ( props: IProps ) => {
    return (
        <div className='row'>
            {props.delays.map((delay: IDelay) => <DelayCard key={ delay.trip }
                                                             delay={ delay }
                                                             busStopNumber={ props.busStopNumber }/> ) }
        </div>
    );
};

export default DelaysCardsList;
