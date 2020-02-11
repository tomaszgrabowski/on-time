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
  city: string
}

const DelayCard = ( props: IProps ) => {
  const iconType: IconProp = props.delay.routeId < 100 ? 'train' : 'bus';
  return (
      <div className="col-sm-6 col-lg-4">
        
        <div className="card">
          <h5 className="card-header bg-warning">
            <div className="row">
              <div className='col-3 col-sm-3 col-md-3'><FontAwesomeIcon size='1x' icon={ iconType }/></div>
              <div className='col-5 col-sm-4 col-md-5 text-center'>{ props.delay.routeId }</div>
              <div className='col-4 col-sm-5 col-md-4 tex-center'>{ props.delay.estimatedTime }</div>
            </div>
          </h5>
          <div className="card-body">
            <div className="card-text text-center">
              <p>Kierunek: { props.delay.headsign }</p>
              <p>
                Odjazd wg. rozkładu: { props.delay.theoreticalTime }&nbsp;
                <span className="badge badge-warning"><DelayTimeInfo
                    data={ props.delay.delayInSeconds }/></span>
              </p>
            </div>
          </div>
          { props.city === 'gdansk' ? <div className="card-footer bg-transparent">
            <Link to={ `/MapPage/${ props.city }/${ props.busStopNumber }/${ props.delay.vehicleId }` }>
              <button className='btn btn-link btn-block'>
                Pozycja pojazdu...
              </button>
            </Link>
          </div> : null }
        </div>
      
      </div>
  );
};

export default DelayCard;
