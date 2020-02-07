import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { IDelay } from '../../Shared/IDelay';
import './DelayCard.css';
import DelayTimeInfo from './DelayTimeInfo';

interface IProps {
    delay: IDelay;
    busStopNumber: string;
}

const DelayCard = ( props: IProps ) => {
    const iconType: IconProp = props.delay.routeId < 100 ? 'train' : 'bus';
    return (
        <div className="col-sm-6 col-lg-4">
            <Link to={ `/MapPage/${ props.busStopNumber }/${ props.delay.vehicleId }` }>
                <div className="card">
                    <h5 className="card-header bg-warning">
                        <FontAwesomeIcon size='1x' icon={ iconType }/>
                        { props.delay.routeId }
                        <div className='float-right'>{ props.delay.estimatedTime }</div>
                    </h5>
                    <div className="card-body">
                        <div className="card-text">
                            <p>
                                Odjazd wg. planu: { props.delay.theoreticalTime }
                            </p>
                            <p>
                                Opóźnienie: <DelayTimeInfo data={ props.delay.delayInSeconds }/>
                            </p>
                        </div>
                    </div>
                    <div className="card-footer bg-transparent">
                        <button className='btn btn-link btn-block'>
                            Pozycja pojazdu...
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default DelayCard;
