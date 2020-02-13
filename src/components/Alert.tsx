import React from 'react';
import { AlertLevel } from '../Shared/AlertLevel';

interface IProps {
    level: AlertLevel
    message: string
}

const Alert = ( props: IProps ) => {
    return (
      <div className={ `alert text-center ${ props.level }` } role="alert">
          <h4 className="alert-heading">Uwaga!</h4>
          <p>{ props.message }</p>
      </div>
    );
};

export default Alert;
