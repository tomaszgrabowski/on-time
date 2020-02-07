import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import DelayTimeInfo from '../../components/Delays/DelayTimeInfo';
import { IDelay } from '../../Shared/IDelay';
import './DelayCard.css';

interface IProps {
    delay: IDelay;
    busStopNumber: string;
}

const DelayCard = ( props: IProps ) => {
    const iconType: IconProp = props.delay.routeId < 100 ? 'train' : 'bus';
    return (
        <div className="col-sm-6 col-lg-4">
            <div className="card">
                <h5 className="card-header bg-warning">
                    <FontAwesomeIcon size='1x' icon={ iconType }/>
                    { props.delay.routeId }
                    <div className='float-right'>{ props.delay.estimatedTime }</div>
                </h5>
                <div className="card-body">
                    <p className="card-text">
                        <p>
                            Odjazd wg. planu: { props.delay.theoreticalTime }
                        </p>
                        <p>
                            Realne opóźnienie: <DelayTimeInfo data={ props.delay.delayInSeconds }/>
                        </p>
                    </p>
                    <Link className="btn btn-primary btn-block"
                          to={ `/MapPage/${ props.busStopNumber }/${ props.delay.vehicleId }` }>
                        Zobacz pozycję pojazdu na mapie
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DelayCard;
