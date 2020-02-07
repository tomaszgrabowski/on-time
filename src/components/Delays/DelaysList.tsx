import React from 'react';
import { IDelay } from '../../Shared/IDelay';
import DelayCard from '../DelaysCard/DelayCard';

interface IProps {
    delays: IDelay[];
    busStopNumber: string;
}

const DelaysList = ( props: IProps ) => {
    return (
        <div className="row">
            { props.delays.map( ( delay: IDelay ) => <DelayCard key={ delay.trip }
                                                                delay={ delay }
                                                                busStopNumber={ props.busStopNumber }/> ) }
        </div>
    );
};

export default DelaysList;
